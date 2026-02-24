"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  ArtificialIntelligence01Icon,
  Cancel01Icon,
  UserIcon,
  SentIcon,
} from "hugeicons-react";

const chatSequence = [
  {
    role: "ai",
    content:
      "Protocol v1.0 Engaged. How can I optimize your career trajectory today?",
    delay: 500,
  },
];

export function GlobalAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(chatSequence);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        chatRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "expo.out" },
      );
    }
  }, [isOpen]);

  const toggleChat = () => {
    if (isOpen) {
      gsap.to(chatRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "expo.in",
        onComplete: () => setIsOpen(false),
      });
    } else {
      setIsOpen(true);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: inputValue, delay: 0 },
    ];
    setMessages(newMessages);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Understood. Accessing database... (Note: Full AI integration will be completed in Phase 5).",
          delay: 0,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]" ref={containerRef}>
      {/* Pop-over Chat Interface */}
      {isOpen && (
        <div
          ref={chatRef}
          className="absolute bottom-20 right-0 w-[90vw] md:w-96 h-[500px] bg-white dark:bg-[#0a0a0a] border-[3px] border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 bg-black text-white dark:bg-white dark:text-black border-b-[3px] border-black dark:border-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArtificialIntelligence01Icon
                size={20}
                className="animate-pulse"
              />
              <span className="font-black uppercase tracking-tighter text-sm">
                Protocol Assistant
              </span>
            </div>
            <button
              onClick={toggleChat}
              className="hover:opacity-70 transition-opacity"
            >
              <Cancel01Icon size={20} />
            </button>
          </div>

          {/* Chat Bodies */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar bg-[#f8f8f8] dark:bg-[#111]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 max-w-[90%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center shrink-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_black] dark:shadow-[2px_2px_0px_0px_white] ${msg.role === "user" ? "bg-white text-black dark:bg-black dark:text-white" : "bg-black text-white dark:bg-white dark:text-black"}`}
                >
                  {msg.role === "user" ? (
                    <UserIcon size={16} />
                  ) : (
                    <ArtificialIntelligence01Icon size={16} />
                  )}
                </div>
                <div
                  className={`p-3 border-2 border-black dark:border-white text-xs font-bold leading-tight ${msg.role === "user" ? "bg-white dark:bg-black shadow-[3px_3px_0px_0px_black] dark:shadow-[3px_3px_0px_0px_white]" : "bg-black text-white dark:bg-white dark:text-black shadow-[3px_3px_0px_0px_black] dark:shadow-[3px_3px_0px_0px_white]"}`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-[#0a0a0a] border-t-[3px] border-black dark:border-white flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Query protocol..."
              className="flex-1 bg-transparent border-2 border-black/10 dark:border-white/10 px-3 py-2 text-sm font-bold focus:border-black dark:focus:border-white outline-none transition-colors"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_black] dark:shadow-[3px_3px_0px_0px_white] flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <SentIcon size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button (FAB) */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-[3px] border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all active:scale-95 active:shadow-none ${
          isOpen
            ? "bg-red-500 text-white border-black"
            : "bg-white text-black dark:bg-black dark:text-white"
        }`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <Cancel01Icon size={28} />
        ) : (
          <ArtificialIntelligence01Icon size={28} className="animate-pulse" />
        )}
      </button>
    </div>
  );
}
