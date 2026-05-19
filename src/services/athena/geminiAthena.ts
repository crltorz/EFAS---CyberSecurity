import type { AnalysisResult } from '../../data/riskRubric';

export type AthenaCitation = { title: string; url: string };

const SOURCES_SUFFIX = /\nSOURCES:\s*(\[[\s\S]*\])\s*$/;

export function parseAthenaReply(raw: string): {
  text: string;
  citations: AthenaCitation[];
} {
  const trimmed = raw.trim();
  const match = trimmed.match(SOURCES_SUFFIX);
  if (!match || match.index === undefined) {
    return { text: trimmed, citations: [] };
  }

  const text = trimmed.slice(0, match.index).trim();
  try {
    const parsed: unknown = JSON.parse(match[1]);
    if (!Array.isArray(parsed)) return { text, citations: [] };
    const citations = parsed
      .filter(
        (item): item is { title?: string; url: string } =>
          !!item &&
          typeof item === 'object' &&
          typeof (item as { url?: string }).url === 'string'
      )
      .map((item) => ({
        title: String(item.title || item.url).trim(),
        url: String(item.url).trim()
      }))
      .filter((c) => c.url.startsWith('http'));
    return { text, citations };
  } catch {
    return { text, citations: [] };
  }
}

export function buildRubricContext(
  analysis: AnalysisResult,
  lang: 'en' | 'tl'
): string {
  const lines: string[] =
    lang === 'tl'
      ? [
          `Band: ${analysis.band} (${analysis.score}/100)`,
          analysis.verdict
        ]
      : [
          `Risk band: ${analysis.band} (score ${analysis.score}/100)`,
          analysis.verdict
        ];

  if (analysis.triggered.length > 0) {
    lines.push(
      lang === 'tl' ? 'Mga senyales na natukoy:' : 'Indicators triggered:'
    );
    for (const ind of analysis.triggered) {
      lines.push(
        `- ${ind.label} [${ind.source.name}: ${ind.source.url}]`
      );
    }
  }

  return lines.join('\n');
}

export const ATHENA_OFFLINE_EN =
  "I'm having trouble reaching my AI service right now. Please try again in a moment, or use EFAS Fact Check for pasted messages. For urgent fraud, call your bank's fraud line and PNP-ACG at (02) 8723-0401 local 7491.";

export const ATHENA_OFFLINE_TL =
  'Hindi ako makakonekta sa AI service ngayon. Subukan ulit mamaya, o gamitin ang Fact Check para sa mga text. Kung urgent, tawagan ang fraud line ng bangko mo at PNP-ACG sa (02) 8723-0401 local 7491.';

export const OFF_TOPIC_EN =
  "I focus on Philippine cybersecurity — scams, suspicious messages, account safety, and reporting. Ask me about something like that and I'll help.";

export const OFF_TOPIC_TL =
  'Nakatuon ako sa cybersecurity sa Pilipinas — scams, kahina-hinalang text, account safety, at pag-report. Magtanong ka tungkol diyan at tutulungan kita.';

/** Normalize spacing for professional plain-text replies. */
export function polishAthenaText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[•●▪]/g, '-')
    .trim();
}
