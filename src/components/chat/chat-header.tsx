import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import { chatConfig } from "@/lib/config";

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-card rounded-t-2xl sm:rounded-t-xl">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-full">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-lg font-semibold font-headline">{chatConfig.botName}</h2>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close chat">
        <X className="w-5 h-5 text-muted-foreground" />
      </Button>
    </div>
  );
}
