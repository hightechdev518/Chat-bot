'use server';

/**
 * @fileOverview This flow determines whether to fallback to a default support message based on confidence score.
 *
 * - shouldFallbackToSupport - A function that determines if the chatbot should fallback to the support message.
 * - ShouldFallbackToSupportInput - The input type for the shouldFallbackToSupport function.
 * - ShouldFallbackToSupportOutput - The return type for the shouldFallbackToSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ShouldFallbackToSupportInputSchema = z.object({
  confidenceScore: z
    .number()
    .describe('The confidence score of the chatbot answer.'),
  defaultFallbackText: z.string().describe('The default fallback text to use.'),
  supportURL: z.string().describe('The support URL to include in the fallback message.'),
});
export type ShouldFallbackToSupportInput = z.infer<
  typeof ShouldFallbackToSupportInputSchema
>;

const ShouldFallbackToSupportOutputSchema = z.object({
  shouldFallback: z
    .boolean()
    .describe(
      'Whether or not the chatbot should fallback to the default message.'
    ),
  fallbackMessage: z
    .string()
    .optional()
    .describe('The fallback message to display if shouldFallback is true.'),
});
export type ShouldFallbackToSupportOutput = z.infer<
  typeof ShouldFallbackToSupportOutputSchema
>;

export async function shouldFallbackToSupport(
  input: ShouldFallbackToSupportInput
): Promise<ShouldFallbackToSupportOutput> {
  return shouldFallbackToSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'shouldFallbackToSupportPrompt',
  input: {schema: ShouldFallbackToSupportInputSchema},
  output: {schema: ShouldFallbackToSupportOutputSchema},
  prompt: `Given the confidence score of the chatbot's answer ({{confidenceScore}}), determine whether to fallback to a default support message. If the confidence score is below 0.5, return shouldFallback as true and provide a fallback message using the default fallback text ({{defaultFallbackText}}) and support URL ({{supportURL}}). If the confidence score is 0.5 or above, return shouldFallback as false.

  The fallback message should be a concatenation of the default fallback text and the support URL.
  `,
});

const shouldFallbackToSupportFlow = ai.defineFlow(
  {
    name: 'shouldFallbackToSupportFlow',
    inputSchema: ShouldFallbackToSupportInputSchema,
    outputSchema: ShouldFallbackToSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (output?.shouldFallback) {
      output.fallbackMessage = `${input.defaultFallbackText} ${input.supportURL}`;
    }
    return output!;
  }
);
