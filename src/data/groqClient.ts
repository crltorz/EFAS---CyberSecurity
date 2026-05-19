import { buildAthenaHotlineBlock } from './authorities';
import { knowledgeSources } from '../services/athena/knowledge';
import { buildEmergencyContextBlock } from '../services/athena/emergencyContext';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
const GROQ_MODEL = 'llama-3.3-70b-versatile';
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

export type ChatTurn = {
  role: 'user' | 'model';
  text: string;
};

export type GroqChatOptions = {
  lang?: 'en' | 'tl';
  rubricContext?: string;
  isEmergency?: boolean;
};

function buildReferenceLibraryBlock(): string {
  return knowledgeSources
    .map((s) => `- ${s.name}: ${s.url} (${s.label})`)
    .join('\n');
}

function buildSystemPrompt(lang: 'en' | 'tl', isEmergency: boolean): string {
  const languageRule =
    lang === 'tl'
      ? 'Reply in Filipino or Taglish, matching how the user writes.'
      : 'Reply in clear English unless the user writes in Filipino or Taglish — then match them.';

  const emergencyBlock = isEmergency
    ? `\nEMERGENCY — user may be actively victimized. Lead with numbered immediate steps (freeze accounts, call fraud lines). Use contacts below:\n${buildEmergencyContextBlock()}\n`
    : '';

  return `You are Athena, the conversational AI inside EFAS (Electronic Fraud Awareness System) for the Philippines.

PROFESSIONAL FORMAT (always)
- Plain text only. No markdown, no emoji, no bullet character "•".
- Use clear section labels on their own line, e.g. "Summary:", "Recommended steps:", "Where to report:"
- Use numbered lists (1. 2. 3.) for steps and reporting channels.
- Keep paragraphs short (2-4 sentences). Sound professional, calm, and precise.
- ${languageRule}

HOW TO TALK
- Answer what the user actually asked. Stay on topic.
- For simple questions, 2-4 sentences under Summary is enough.
- For reporting or "where/when" questions, always include "Where to report:" with agency name, hotline, hours if known, and full https:// URL.
- One follow-up question at the end only if you need missing details.

SCOPE
- Philippine scams, phishing, account security, e-wallets, and reporting cybercrime.
- Politely redirect off-topic requests.

VERIFIED HOTLINES (never invent others)
${buildAthenaHotlineBlock()}

REFERENCE LIBRARY (cite in SOURCES line only when you rely on one)
${buildReferenceLibraryBlock()}
${emergencyBlock}
CITATIONS (strict)
- Casual chat (greetings, thanks): no SOURCES line.
- When you cite an official source from the library or hotline block, end with exactly:
SOURCES: [{"title":"Short name","url":"https://..."}]
- Maximum 3 sources. Omit SOURCES if none were needed.`;
}

export async function chatWithGroq(
  history: ChatTurn[],
  userMessage: string,
  options: GroqChatOptions = {}
): Promise<string> {
  if (!GROQ_API_KEY?.trim()) {
    throw new Error('Groq API key not configured (VITE_GROQ_API_KEY)');
  }

  const lang = options.lang ?? 'en';
  let userText = userMessage;
  if (options.rubricContext) {
    userText = `${options.rubricContext}\n\n---\nUser message:\n${userMessage}\n\nInstructions: EFAS technical verification is complete above. Reply with a short analyst note (3-5 sentences): interpret the score/band, highlight the top 1-2 technical findings (indicator IDs or URL flags), and one concrete next step. Use professional plain text with optional "Analyst note:" header. Do not repeat the full report tables.`;
  }

  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    {
      role: 'system',
      content: buildSystemPrompt(lang, !!options.isEmergency)
    },
    ...history.map((t) => ({
      role: (t.role === 'model' ? 'assistant' : 'user') as 'user' | 'assistant',
      content: t.text
    })),
    { role: 'user', content: userText }
  ];

  const response = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature: 0.55,
      max_tokens: 1024
    })
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Groq API error ${response.status}: ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content ?? '';

  if (!text) throw new Error('Groq returned empty response');
  return String(text).trim();
}
