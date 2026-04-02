# SaaS ChatBuddy

SaaS ChatBuddy is a full-stack AI chatbot for any SaaS website. It's built with Next.js, Genkit, and ShadCN UI to provide a seamless and intelligent user support experience.

The chatbot appears as a floating widget, allows for real-time conversations, and provides answers based on a configurable knowledge base.

## Features

- **Floating Chat Widget**: A responsive and modern chat widget that sits on your website.
- **Dynamic AI Responses**: Uses Genkit and Google's Gemini model to generate answers from your custom knowledge base.
- **FAQ-based Knowledge**: Easily provide context to the AI by updating a simple `faq.ts` file.
- **Source Citation**: The bot can cite its sources, linking users to relevant documentation.
- **Fallback Mechanism**: Politely redirects users to support when it's not confident in its answer.
- **Feedback Collection**: Users can rate bot responses with a simple thumbs up/down.
- **Easy Configuration**: Customize the bot's name, welcome message, and more in a central config file.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **AI**: [Genkit](https://firebase.google.com/docs/genkit) with Google AI
- **UI**: [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: CSS variables for easy themeing.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your Google AI API key:
    ```
    GOOGLE_API_KEY=your_google_api_key
    ```
    You can obtain a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

To run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the result.

## Configuration

You can easily customize the chatbot's behavior and appearance.

### Bot Configuration

To change the bot's name, welcome message, support URL, or fallback text, edit the `src/lib/config.ts` file:

```typescript
// src/lib/config.ts
export const chatConfig = {
  botName: 'SaaS ChatBuddy',
  supportURL: 'https://example.com/support',
  defaultFallbackText: "I’m not sure how to help with that...",
  welcomeMessage: "Hi there! How can I help you today?",
};
```

### Knowledge Base (FAQ)

To update the chatbot's knowledge base, edit the `src/lib/faq.ts` file. Add, remove, or modify the question-answer pairs in the `faqContent` array.

```typescript
// src/lib/faq.ts
export const faqContent = [
  {
    question: "What is your pricing?",
    answer: "We have a free plan and a pro plan at $49/month.",
    source: "https://example.com/pricing"
  },
  // ... more FAQs
];
```

## Testing the Chatbot

You can test the chatbot by interacting with the widget on the homepage. To test the backend logic directly, you can call the `handleUserMessage` server action from a client component.
