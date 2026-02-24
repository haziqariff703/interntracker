"use client";

import React, { useState, useEffect } from "react";
import { ArtificialIntelligence01Icon, UserIcon } from "hugeicons-react";

const chatSequence = [
  {
    role: "user",
    content: "Analyze my recent application to TechNova for the Frontend Role.",
    delay: 500,
  },
  {
    role: "ai",
    content:
      "Initializing Protocol... Analyzing resume against TechNova requirements.",
    delay: 1500,
    isAction: true,
  },
  {
    role: "ai",
    content:
      "Analysis Complete. You have an 85% skill match (React, TypeScript). However, the role heavily emphasizes AWS. \n\nStrategic Advice: Highlight your Vercel/Render deployment experience during the technical screen to compensate.",
    delay: 3500,
  },
];

export function AiChatPreview() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    let currentDelay = 0;

    chatSequence.forEach((msg, index) => {
      currentDelay = msg.delay;

      // Show typing indicator before AI messages
      if (msg.role === "ai") {
        const typeTimeout = setTimeout(() => {
          setIsTyping(true);
        }, currentDelay - 800);
        timeouts.push(typeTimeout);
      }

      const msgTimeout = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(index + 1);
      }, currentDelay);

      timeouts.push(msgTimeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-full min-h-75 md:min-h-87.5 bg-[#f4f4f4] dark:bg-[#111] p-4 md:p-6 flex flex-col gap-4 overflow-y-auto overflow-x-hidden no-scrollbar text-sm md:text-base">
      {chatSequence.slice(0, visibleMessages).map((msg, i) => (
        <div
          key={i}
          className={`flex gap-3 max-w-[85%] animate-in slide-in-from-bottom-2 fade-in duration-300 ${
            msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
          }`}
        >
          <div
            className={`w-8 h-8 md:w-10 md:h-10 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center shrink-0 ${
              msg.role === "user"
                ? "bg-white text-black dark:bg-black dark:text-white"
                : "bg-black text-white dark:bg-white dark:text-black"
            }`}
          >
            {msg.role === "user" ? (
              <UserIcon size={20} />
            ) : (
              <ArtificialIntelligence01Icon size={20} />
            )}
          </div>

          <div
            className={`p-3 md:p-4 border-2 border-black dark:border-white ${
              msg.isAction
                ? "bg-transparent border-dashed text-black/60 dark:text-white/60 font-mono text-xs uppercase"
                : msg.role === "user"
                  ? "bg-white dark:bg-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                  : "bg-black text-white dark:bg-white dark:text-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] whitespace-pre-wrap"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex gap-3 max-w-[85%] self-start animate-in fade-in duration-200">
          <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0">
            <ArtificialIntelligence01Icon size={20} className="animate-pulse" />
          </div>
          <div className="p-3 md:p-4 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black flex items-center gap-1">
            <div
              className="w-2 h-2 bg-white dark:bg-black rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-white dark:bg-black rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-white dark:bg-black rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
