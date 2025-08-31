import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-legal-query.ts';
import '@/ai/flows/generate-response-alternatives.ts';
import '@/ai/flows/translate-user-query.ts';
