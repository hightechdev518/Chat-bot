import { config } from 'dotenv';
config();

import '@/ai/flows/cite-sources-for-answer.ts';
import '@/ai/flows/generate-answer-from-faq.ts';
import '@/ai/flows/fallback-to-support.ts';