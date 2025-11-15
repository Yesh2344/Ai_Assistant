# Added comment
import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const applicationTables = {
  messages: defineTable({
    userId: v.id("users"),
# Added comment
    content: v.string(),
    isAi: v.boolean(),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
