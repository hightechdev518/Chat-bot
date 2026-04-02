'use server';

import { generateAnswerFromFAQ } from '@/ai/flows/generate-answer-from-faq';
import { shouldFallbackToSupport } from '@/ai/flows/fallback-to-support';
import { faqContentString } from '@/lib/faq';
import { chatConfig } from '@/lib/config';
import type { ChatMessage, Feedback } from '@/lib/types';

export async function handleUserMessage(
  history: ChatMessage[]
): Promise<ChatMessage> {
  const userMessage = history.findLast((m) => m.role === 'user');

  if (!userMessage) {
    return {
      id: Date.now().toString(),
      role: 'bot',
      content: 'An error occurred. Please try sending your message again.',
      timestamp: Date.now(),
    };
  }

  try {
    const generationResult = await generateAnswerFromFAQ({
      message: userMessage.content,
      faqContent: faqContentString,
    });

    const isUncertain = /not sure|don't know|unable to answer|contact support/i.test(generationResult.answer);
    const confidenceScore = isUncertain ? 0.4 : 0.9;

    const fallbackDecision = await shouldFallbackToSupport({
      confidenceScore,
      defaultFallbackText: chatConfig.defaultFallbackText,
      supportURL: chatConfig.supportURL,
    });

    if (fallbackDecision.shouldFallback && fallbackDecision.fallbackMessage) {
      return {
        id: Date.now().toString(),
        role: 'bot',
        content: fallbackDecision.fallbackMessage,
        sources: [],
        feedback: null,
        timestamp: Date.now(),
      };
    }

    return {
      id: Date.now().toString(),
      role: 'bot',
      content: generationResult.answer,
      sources: generationResult.sources,
      feedback: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Error handling user message:', error);
    return {
      id: Date.now().toString(),
      role: 'bot',
      content: 'Something went wrong, please try again.',
      timestamp: Date.now(),
    };
  }
}

export async function handleFeedback(messageId: string, feedback: Feedback) {
  // In a real application, you would store this feedback in a database.
  // For this demo, we'll just log it to the console.
  console.log(`Feedback for message ${messageId}: ${feedback}`);
  return { success: true };
}
