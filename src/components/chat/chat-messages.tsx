"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage as ChatMessageType } from "@/lib/types";
import { ChatMessage } from "./chat-message";
import { AnimatePresence, motion } from "framer-motion";

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  onUpdateMessage: (messageId: string, update: Partial<ChatMessageType>) => void;
}

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-center gap-1.5 p-3"
  >
    <div className="p-2 bg-muted rounded-full">
      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:0s]"></div>
    </div>
    <div className="p-2 bg-muted rounded-full">
      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.2s]"></div>
    </div>
    <div className="p-2 bg-muted rounded-full">
      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.4s]"></div>
    </div>
  </motion.div>
);


export function ChatMessages({
  messages,
  isLoading,
  onUpdateMessage
}: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-grow h-0" viewportRef={scrollAreaRef}>
      <div className="p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message, i) => (
             <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.2 },
                layout: {
                  type: "spring",
                  bounce: 0.4,
                  duration: i * 0.05 + 0.4,
                },
              }}
            >
              <ChatMessage
                message={message}
                onUpdateMessage={onUpdateMessage}
              />
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <TypingIndicator />
            </div>
          )}
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
}
