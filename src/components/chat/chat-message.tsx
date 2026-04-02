"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType, Feedback } from "@/lib/types";
import { Bot, User, ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";
import { handleFeedback } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

interface ChatMessageProps {
  message: ChatMessageType;
  onUpdateMessage: (messageId: string, update: Partial<ChatMessageType>) => void;
}

const getInitials = (name: string) => name.charAt(0).toUpperCase();

export function ChatMessage({ message, onUpdateMessage }: ChatMessageProps) {
  const isBot = message.role === "bot";
  const { toast } = useToast();

  const onFeedback = async (feedback: Feedback) => {
    if (message.feedback) return; // Prevent multiple feedback submissions

    onUpdateMessage(message.id, { feedback });
    await handleFeedback(message.id, feedback);
    toast({
      title: "Feedback submitted",
      description: "Thank you for helping us improve!",
    });
  };

  return (
    <div className={cn("flex items-start gap-3", isBot ? "" : "justify-end")}>
      {isBot && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[80%] space-y-2",
          isBot ? "items-start" : "items-end"
        )}
      >
        <div
          className={cn(
            "p-3 rounded-2xl",
            isBot
              ? "bg-muted rounded-tl-none"
              : "bg-primary text-primary-foreground rounded-br-none"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>

        {isBot && message.sources && message.sources.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-semibold">SOURCES</p>
            <div className="flex flex-wrap gap-2">
              {message.sources.map((source, index) => (
                <a
                  key={index}
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-primary hover:underline bg-primary/10 px-2 py-1 rounded-md"
                >
                  {new URL(source).hostname}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        )}

        {isBot && message.id !== "welcome" && (
           <div className="flex items-center gap-2 pt-1">
             <Button
               variant="ghost"
               size="icon"
               className={cn("w-7 h-7", message.feedback === "good" && "bg-green-100 text-green-600 dark:bg-green-900/50")}
               onClick={() => onFeedback("good")}
               disabled={!!message.feedback}
             >
               <ThumbsUp className="w-4 h-4" />
             </Button>
             <Button
               variant="ghost"
               size="icon"
               className={cn("w-7 h-7", message.feedback === "bad" && "bg-red-100 text-red-600 dark:bg-red-900/50")}
               onClick={() => onFeedback("bad")}
               disabled={!!message.feedback}
             >
               <ThumbsDown className="w-4 h-4" />
             </Button>
           </div>
        )}
      </div>

      {!isBot && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <User className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
