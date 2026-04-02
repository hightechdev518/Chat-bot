'use server';

/**
 * @fileOverview A flow to cite sources for a given answer using a tool to retrieve relevant sources.
 *
 * - citeSourcesForAnswer - A function that calls the citeSourcesForAnswerFlow to get the answer and its sources.
 * - CiteSourcesForAnswerInput - The input type for the citeSourcesForAnswer function.
 * - CiteSourcesForAnswerOutput - The return type for the citeSourcesForAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CiteSourcesForAnswerInputSchema = z.object({
  question: z.string().describe('The user question.'),
  answer: z.string().describe('The answer to the user question.'),
});
export type CiteSourcesForAnswerInput = z.infer<typeof CiteSourcesForAnswerInputSchema>;

const CiteSourcesForAnswerOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question.'),
  sources: z.array(z.string()).describe('The sources used to answer the question.'),
});
export type CiteSourcesForAnswerOutput = z.infer<typeof CiteSourcesForAnswerOutputSchema>;

export async function citeSourcesForAnswer(input: CiteSourcesForAnswerInput): Promise<CiteSourcesForAnswerOutput> {
  return citeSourcesForAnswerFlow(input);
}

const getRelevantSources = ai.defineTool(
  {
    name: 'getRelevantSources',
    description: 'Retrieves relevant source links from the FAQ knowledge base based on the user question and the generated answer.',
    inputSchema: z.object({
      question: z.string().describe('The user question.'),
      answer: z.string().describe('The generated answer to the user question.'),
    }),
    outputSchema: z.array(z.string()).describe('An array of URLs that serve as sources for the answer.'),
  },
  async input => {
    // TODO: Implement the logic to retrieve relevant sources from the FAQ knowledge base.
    // This is a placeholder implementation.
    return [];
  }
);

const citeSourcesForAnswerPrompt = ai.definePrompt({
  name: 'citeSourcesForAnswerPrompt',
  tools: [getRelevantSources],
  input: {schema: CiteSourcesForAnswerInputSchema},
  output: {schema: CiteSourcesForAnswerOutputSchema},
  prompt: `You are an expert at answering questions using a knowledge base of FAQs and documentation.

  Based on the question and answer provided, use the getRelevantSources tool to find the source URLs that support the answer.

  Question: {{{question}}}
  Answer: {{{answer}}}
  `,
});

const citeSourcesForAnswerFlow = ai.defineFlow(
  {
    name: 'citeSourcesForAnswerFlow',
    inputSchema: CiteSourcesForAnswerInputSchema,
    outputSchema: CiteSourcesForAnswerOutputSchema,
  },
  async input => {
    const {output} = await citeSourcesForAnswerPrompt(input);
    return output!;
  }
);
