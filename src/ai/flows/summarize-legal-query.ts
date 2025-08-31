'use server';
/**
 * @fileOverview Summarizes a legal query for better understanding and accuracy.
 *
 * - summarizeLegalQuery - A function that summarizes a legal query.
 * - SummarizeLegalQueryInput - The input type for the summarizeLegalQuery function.
 * - SummarizeLegalQueryOutput - The return type for the summarizeLegalQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLegalQueryInputSchema = z.object({
  legalQuery: z.string().describe('The legal query to summarize.'),
});
export type SummarizeLegalQueryInput = z.infer<typeof SummarizeLegalQueryInputSchema>;

const SummarizeLegalQueryOutputSchema = z.object({
  summary: z.string().describe('The summarized legal query.'),
});
export type SummarizeLegalQueryOutput = z.infer<typeof SummarizeLegalQueryOutputSchema>;

export async function summarizeLegalQuery(input: SummarizeLegalQueryInput): Promise<SummarizeLegalQueryOutput> {
  return summarizeLegalQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeLegalQueryPrompt',
  input: {schema: SummarizeLegalQueryInputSchema},
  output: {schema: SummarizeLegalQueryOutputSchema},
  prompt: `Summarize the following legal query to its core issue, ensuring clarity and accuracy:\n\n{{{legalQuery}}}`,    
});

const summarizeLegalQueryFlow = ai.defineFlow(
  {
    name: 'summarizeLegalQueryFlow',
    inputSchema: SummarizeLegalQueryInputSchema,
    outputSchema: SummarizeLegalQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
