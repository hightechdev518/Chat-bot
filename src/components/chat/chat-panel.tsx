"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { handleUserMessage } from "@/app/actions";
import type { ChatMessage } from "@/lib/types";
import { chatConfig } from "@/lib/config";

interface ChatPanelProps {
  onClose: () => void;
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      content: chatConfig.welcomeMessage,
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSendMessage = async (content: string) => {
    if (isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: Date.now(),
    };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setIsLoading(true);

    const botResponse = await handleUserMessage(newHistory);
    setMessages((prev) => [...prev, botResponse]);
    setIsLoading(false);
  };

  const updateMessage = (
    messageId: string,
    update: Partial<ChatMessage>
  ) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, ...update } : msg
      )
    );
  };

  return (
    <Card className="h-full w-full flex flex-col shadow-2xl rounded-t-2xl sm:rounded-2xl">
      <ChatHeader onClose={onClose} />
      <ChatMessages messages={messages} isLoading={isLoading} onUpdateMessage={updateMessage} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </Card>
  );
}
