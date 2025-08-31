"use server";

import { generateResponseAlternatives } from "@/ai/flows/generate-response-alternatives";
import { z } from "zod";

const processQuerySchema = z.object({
  query: z.string(),
  language: z.enum(["en", "bn"]),
});

export async function processUserQueryAction(values: z.infer<typeof processQuerySchema>) {
  const validatedFields = processQuerySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  
  try {
    const result = await generateResponseAlternatives(validatedFields.data);
    if (result.alternatives && result.alternatives.length > 0) {
      return { success: result.alternatives[0] };
    }
    return { error: "Could not generate a response." };
  } catch (e) {
    console.error(e);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
