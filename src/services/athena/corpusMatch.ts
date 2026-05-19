import { corpus, type CorpusSample } from '../../data/testCorpus';

export type CorpusMatch = {
  id: string;
  category: CorpusSample['category'];
  score: number;
  expectedBand: CorpusSample['expectedBand'];
  language: CorpusSample['language'];
  excerpt: string;
  /** Jaccard intersection |A∩B| */
  intersection: number;
  /** Jaccard union |A∪B| */
  union: number;
  inputTokenCount: number;
  sampleTokenCount: number;
};

function tokenSet(text: string): Set<string> {
  const norm = text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const tokens = norm.split(' ').filter((t) => t.length > 2);
  return new Set(tokens);
}

function jaccardDetailed(a: Set<string>, b: Set<string>) {
  if (a.size === 0 || b.size === 0) {
    return { score: 0, intersection: 0, union: 0 };
  }
  let intersection = 0;
  for (const t of a) {
    if (b.has(t)) intersection++;
  }
  const union = a.size + b.size - intersection;
  return {
    score: union > 0 ? intersection / union : 0,
    intersection,
    union
  };
}

/** Match input against Philippine spam SMS evaluation corpus (Kaggle-derived). */
export function matchSpamCorpus(
  text: string,
  limit = 3,
  minScore = 0.12
): CorpusMatch[] {
  const inputTokens = tokenSet(text);
  const scored = corpus
    .map((sample) => {
      const sampleTokens = tokenSet(sample.text);
      const { score, intersection, union } = jaccardDetailed(
        inputTokens,
        sampleTokens
      );
      return {
        id: sample.id,
        category: sample.category,
        score,
        expectedBand: sample.expectedBand,
        language: sample.language,
        intersection,
        union,
        inputTokenCount: inputTokens.size,
        sampleTokenCount: sampleTokens.size,
        excerpt:
          sample.text.length > 120
            ? `${sample.text.slice(0, 117)}...`
            : sample.text
      };
    })
    .filter((m) => m.score >= minScore)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

export const CORPUS_SOURCE_NOTE =
  'Similarity: Jaccard index J(A,B)=|A∩B|/|A∪B| on NFKD-normalized tokens (len>2). Corpus: Philippine Spam SMS Messages (Kaggle bwandowando/philippine-spam-sms-messages), 86 held-out evaluation samples.';
