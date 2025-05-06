import { v } from "convex/values";
import { mutation, query, internalAction, internalMutation } from "./_generated/server";
import { api, internal } from "./_generated/api";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.CONVEX_OPENAI_BASE_URL,
  apiKey: process.env.CONVEX_OPENAI_API_KEY,
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("messages")
      .order("desc")
      .take(50);
  },
});

export const send = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }
    
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();
    if (!user) {
      throw new Error("User not found");
    }

    const message = await ctx.db.insert("messages", {
      content: args.content,
      userId: user._id,
      isAi: false,
    });

    await ctx.scheduler.runAfter(0, internal.messages.generateResponse, {});
    return message;
  },
});

export const generateResponse = internalAction({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.runQuery(api.messages.list);
    const lastMessage = messages[0];
    
    if (!lastMessage || lastMessage.isAi) {
      return;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        { 
          role: "system", 
          content: "You are a helpful AI assistant. Be concise and direct in your responses."
        },
        { 
          role: "user", 
          content: lastMessage.content 
        }
      ],
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    await ctx.runMutation(internal.messages.saveAiResponse, { content });
  },
});

export const saveAiResponse = internalMutation({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    // Get the most recent user message to link the response
    const lastMessage = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("isAi"), false))
      .order("desc")
      .first();
    
    if (!lastMessage) {
      throw new Error("No user message found");
    }

    return await ctx.db.insert("messages", {
      content: args.content,
      userId: lastMessage.userId,
      isAi: true,
    });
  },
});
