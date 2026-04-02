import { ChatWidget } from "@/components/chat/chat-widget";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="text-primary w-8 h-8"/>
            <h1 className="text-2xl font-bold font-headline text-primary">
              SaaS ChatBuddy
            </h1>
          </div>
          <Button>Get Started</Button>
        </nav>
      </header>
      <main className="flex-grow flex items-center">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/60">
              Your Personal AI Assistant
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              SaaS ChatBuddy provides instant, intelligent support to your users.
              Powered by your own documentation, it delivers accurate answers 24/7.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Request a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} SaaS ChatBuddy. All rights reserved.</p>
      </footer>
      <ChatWidget />
    </div>
  );
}
