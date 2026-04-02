type FAQ = {
  question: string;
  answer: string;
  source: string;
};

export const faqContent: FAQ[] = [
  {
    question: "What is SaaS ChatBuddy?",
    answer: "SaaS ChatBuddy is an AI-powered chatbot designed to be integrated into any SaaS website to provide instant customer support by answering questions based on your existing FAQ and documentation.",
    source: "https://example.com/docs/what-is-saas-chatbuddy"
  },
  {
    question: "How do I install the chatbot widget?",
    answer: "You can install the chatbot widget by adding the React component to your application. The setup is simple and documented in our README file. You essentially just need to import the ChatWidget component and render it in your main application layout.",
    source: "https://example.com/docs/installation"
  },
  {
    question: "What are the pricing plans?",
    answer: "We offer several pricing plans: Starter (Free), Pro ($49/month), and Enterprise (custom pricing). The Starter plan includes up to 500 conversations per month. The Pro plan offers unlimited conversations and advanced features.",
    source: "https://example.com/pricing"
  },
  {
    question: "Can I customize the chatbot's appearance?",
    answer: "Yes, the chatbot widget is highly customizable. You can change the colors, bot name, and welcome message to match your brand's identity. All configuration options are available in the config file.",
    source: "https://example.com/docs/customization"
  },
  {
    question: "How does the AI work?",
    answer: "Our chatbot uses a powerful Large Language Model (LLM) that is fine-tuned with your provided FAQ content. This allows it to understand and answer user questions accurately based on your knowledge base.",
    source: "https://example.com/docs/ai-technology"
  },
  {
      question: "Is my data secure?",
      answer: "Yes, we prioritize data security. All conversations are handled securely, and we are compliant with industry-standard data protection regulations. We do not store your conversation data beyond the session.",
      source: "https://example.com/docs/security"
  }
];

export const faqContentString = faqContent.map(item => `Q: ${item.question}\nA: ${item.answer}\nSource: ${item.source}`).join('\n\n');

/**
 * Offline / fallback answer when the AI flow is unavailable (e.g. missing API key).
 * Scores FAQ entries by simple word overlap with the user message.
 */
export function getLocalFaqMatchAnswer(userMessage: string): {
  answer: string;
  sources: string[];
} {
  const words = userMessage
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 2);

  if (words.length === 0) {
    return {
      answer:
        "Thanks for your message. I can help with pricing, installation, security, and more—try asking about a specific topic from our FAQ.",
      sources: [],
    };
  }

  let bestScore = 0;
  let best: FAQ | null = null;

  for (const item of faqContent) {
    const hay = `${item.question} ${item.answer}`.toLowerCase();
    const score = words.reduce((s, w) => s + (hay.includes(w) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  if (best && bestScore > 0) {
    return { answer: best.answer, sources: [best.source] };
  }

  return {
    answer:
      "I couldn’t find a close match in the FAQ for that. Please try rephrasing, or contact support for more help.",
    sources: [],
  };
}
