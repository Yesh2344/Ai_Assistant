import { Authenticated, Unauthenticated, useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { FormEvent, useState } from "react";
import { Settings, Send, Loader2, MessageSquare } from "lucide-react";

export default function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">AI Assistant</h2>
        <Authenticated>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <SignOutButton />
          </div>
        </Authenticated>
      </header>

      <main className="flex-1 flex items-stretch p-4">
        <div className="w-full max-w-4xl mx-auto flex gap-4">
          <div className="flex-1">
            <Content />
          </div>
          {showSettings && (
            <div className="w-80 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Theme
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message Sound
                  </label>
                  <div className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="ml-2 text-sm text-gray-600">Enable sound</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const messages = useQuery(api.messages.list) || [];
  const sendMessage = useMutation(api.messages.send);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;
    
    try {
      setIsLoading(true);
      await sendMessage({ content: newMessage });
      setNewMessage("");
    } finally {
      setIsLoading(false);
    }
  }

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4">
          AI Assistant
        </h1>
        <Authenticated>
          <p className="text-xl text-gray-600">
            Your intelligent conversation partner
          </p>
        </Authenticated>
        <Unauthenticated>
          <div className="max-w-md mx-auto">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600 mb-8">Sign in to start your AI conversation</p>
              <SignInForm />
            </div>
          </div>
        </Unauthenticated>
      </div>

      <Authenticated>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col-reverse gap-4 h-[500px] overflow-y-auto p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
            {messages.map((message, index) => (
              <div
                key={message._id}
                className={`flex ${message.isAi ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.isAi
                      ? "bg-white border border-gray-200 shadow-sm"
                      : "bg-blue-600 text-white"
                  } ${
                    index === 0 && !message.isAi && isLoading
                      ? "opacity-70"
                      : "opacity-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send</span>
                </>
              )}
            </button>
          </form>
        </div>
      </Authenticated>
    </div>
  );
}
