'use server';
/**
 * @fileOverview Generates an answer to a user question based on the provided FAQ content.
 *
 * - generateAnswerFromFAQ - A function that generates an answer from FAQ content.
 * - GenerateAnswerFromFAQInput - The input type for the generateAnswerFromFAQ function.
 * - GenerateAnswerFromFAQOutput - The return type for the generateAnswerFromFAQ function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnswerFromFAQInputSchema = z.object({
  message: z.string().describe('The user message to be answered.'),
  faqContent: z.string().describe('The FAQ content to be used to answer the question.'),
});
export type GenerateAnswerFromFAQInput = z.infer<typeof GenerateAnswerFromFAQInputSchema>;

const GenerateAnswerFromFAQOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question based on the FAQ content.'),
  sources: z.array(z.string()).describe('The sources used to generate the answer.'),
});
export type GenerateAnswerFromFAQOutput = z.infer<typeof GenerateAnswerFromFAQOutputSchema>;

export async function generateAnswerFromFAQ(input: GenerateAnswerFromFAQInput): Promise<GenerateAnswerFromFAQOutput> {
  return generateAnswerFromFAQFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnswerFromFAQPrompt',
  input: {schema: GenerateAnswerFromFAQInputSchema},
  output: {schema: GenerateAnswerFromFAQOutputSchema},
  prompt: `You are a chatbot answering questions based on the provided FAQ content. Use the FAQ content to answer the user's question. If the FAQ content does not contain the answer, respond that you are not sure and to contact support. Include the sources used to generate the answer.

FAQ Content:
{{faqContent}}

User Question: {{message}}`,
});

const generateAnswerFromFAQFlow = ai.defineFlow(
  {
    name: 'generateAnswerFromFAQFlow',
    inputSchema: GenerateAnswerFromFAQInputSchema,
    outputSchema: GenerateAnswerFromFAQOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
