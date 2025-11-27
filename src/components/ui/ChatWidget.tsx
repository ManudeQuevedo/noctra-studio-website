"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Terminal } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, append, isLoading } = useChat({ id: "noctra-chat" }) as any;
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input?.trim()) return;
    await append({ role: "user", content: input });
    setInput("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-[9000] flex flex-col items-end font-mono">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 w-full h-full md:inset-auto md:w-[400px] md:h-[600px] md:bottom-6 md:right-6 md:rounded-xl bg-[#050505] border border-neutral-800 shadow-2xl flex flex-col overflow-hidden text-sm z-[9000]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-neutral-400 text-xs tracking-wider">
                  NOCTRA_SYSTEM_RELAY
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors p-2">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-neutral-600">
                  <Terminal className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-xs tracking-widest uppercase opacity-50">
                    System Online
                  </p>
                  <p className="text-xs opacity-30 mt-1">Awaiting input...</p>
                </div>
              )}
              {messages.map((m: any) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}>
                  <div
                    className={`max-w-[85%] rounded-lg p-3 text-sm ${
                      m.role === "user"
                        ? "bg-white text-black"
                        : "bg-neutral-900 border border-neutral-800 text-neutral-300"
                    }`}>
                    {m.role === "user" ? (
                      m.content
                    ) : (
                      <div className="prose prose-invert prose-p:leading-relaxed prose-pre:p-0 text-sm max-w-none text-neutral-400">
                        <ReactMarkdown
                          components={{
                            strong: ({ node, ...props }) => (
                              <span
                                className="font-bold text-white"
                                {...props}
                              />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul
                                className="list-disc pl-4 space-y-1 mt-2 mb-4"
                                {...props}
                              />
                            ),
                            li: ({ node, ...props }) => (
                              <li
                                className="marker:text-neutral-600"
                                {...props}
                              />
                            ),
                            p: ({ node, ...props }) => (
                              <p className="mb-4 last:mb-0" {...props} />
                            ),
                          }}>
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="text-neutral-600 text-xs animate-pulse pl-5">
                    Processing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-neutral-800 bg-black flex gap-2">
              <input
                className="flex-1 bg-transparent text-white placeholder-neutral-700 focus:outline-none text-sm font-mono"
                value={input || ""}
                onChange={handleInputChange}
                placeholder="Enter command..."
              />
              <button
                type="submit"
                disabled={isLoading || !(input || "").trim()}
                className="text-neutral-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-neutral-200 transition-colors z-[9000]">
        {isOpen ? <X size={20} /> : <Terminal size={20} />}
      </motion.button>
    </div>
  );
}
