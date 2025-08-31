'use server';

/**
 * @fileOverview This file defines a Genkit flow to translate user queries between Bengali and English.
 *
 * - translateUserQuery - A function that translates user queries based on detected language.
 * - TranslateUserQueryInput - The input type for the translateUserQuery function.
 * - TranslateUserQueryOutput - The return type for the translateUserQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateUserQueryInputSchema = z.object({
  query: z.string().describe('The user query to translate.'),
  targetLanguage: z.enum(['en', 'bn']).describe('The target language for the translation.'),
});
export type TranslateUserQueryInput = z.infer<typeof TranslateUserQueryInputSchema>;

const TranslateUserQueryOutputSchema = z.object({
  translatedQuery: z.string().describe('The translated user query.'),
});
export type TranslateUserQueryOutput = z.infer<typeof TranslateUserQueryOutputSchema>;

export async function translateUserQuery(input: TranslateUserQueryInput): Promise<TranslateUserQueryOutput> {
  return translateUserQueryFlow(input);
}

const translatePrompt = ai.definePrompt({
  name: 'translatePrompt',
  input: {schema: TranslateUserQueryInputSchema},
  output: {schema: TranslateUserQueryOutputSchema},
  prompt: `Translate the following user query to {{targetLanguage}}:\n\n{{query}}`,
});

const translateUserQueryFlow = ai.defineFlow(
  {
    name: 'translateUserQueryFlow',
    inputSchema: TranslateUserQueryInputSchema,
    outputSchema: TranslateUserQueryOutputSchema,
  },
  async input => {
    const {output} = await translatePrompt(input);
    return output!;
  }
);
