"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { ChatPanel } from "./chat-panel";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="icon"
                className="w-16 h-16 rounded-full shadow-lg bg-primary hover:bg-primary/90"
                onClick={() => setIsOpen(true)}
                aria-label="Open chat"
              >
                <MessageCircle className="w-8 h-8 text-primary-foreground" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed bottom-0 right-0 z-50 w-full h-full",
              "sm:bottom-4 sm:right-4 sm:h-[calc(100vh-2rem)] sm:max-h-[700px] sm:w-[400px]"
            )}
          >
            <ChatPanel onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
