import {
  analyze,
  indicators,
  type AnalysisResult
} from '../../data/riskRubric';
import { analyzeAllLinks, type LinkAnalysis } from './linkAnalyzer';
import { matchSpamCorpus, type CorpusMatch, CORPUS_SOURCE_NOTE } from './corpusMatch';

export type VerificationMeta = {
  inputLength: number;
  urlCount: number;
  rubricPoolSize: number;
  triggeredCount: number;
  notTriggeredCount: number;
  rawScoreSum: number;
  cappedScore: number;
  bandRule: string;
};

export type VerificationReport = {
  rubric: AnalysisResult;
  links: LinkAnalysis[];
  corpusMatches: CorpusMatch[];
  citations: { title: string; url: string }[];
  meta: VerificationMeta;
};

export function runVerification(text: string): VerificationReport {
  const rubric = analyze(text);
  const links = analyzeAllLinks(text);
  const corpusMatches = matchSpamCorpus(text);

  const rawScoreSum = rubric.triggered.reduce((s, i) => s + i.weight, 0);

  const meta: VerificationMeta = {
    inputLength: text.length,
    urlCount: links.length,
    rubricPoolSize: indicators.length,
    triggeredCount: rubric.triggered.length,
    notTriggeredCount: rubric.notTriggered.length,
    rawScoreSum,
    cappedScore: rubric.score,
    bandRule:
      rubric.band === 'high'
        ? 'score >= 61'
        : rubric.band === 'caution'
          ? '31 <= score <= 60'
          : 'score <= 30'
  };

  const citationMap = new Map<string, { title: string; url: string }>();
  for (const ind of rubric.triggered) {
    citationMap.set(ind.source.url, {
      title: ind.source.name,
      url: ind.source.url
    });
  }

  if (links.length > 0) {
    citationMap.set(
      'https://transparencyreport.google.com/safe-browsing/search',
      {
        title: 'Google Safe Browsing',
        url: 'https://transparencyreport.google.com/safe-browsing/search'
      }
    );
  }

  if (corpusMatches.length > 0) {
    citationMap.set(
      'https://www.kaggle.com/datasets/bwandowando/philippine-spam-sms-messages',
      {
        title: 'Philippine Spam SMS Dataset (Kaggle)',
        url: 'https://www.kaggle.com/datasets/bwandowando/philippine-spam-sms-messages'
      }
    );
  }

  return {
    rubric,
    links,
    corpusMatches,
    citations: [...citationMap.values()],
    meta
  };
}

export function verificationContextForGroq(report: VerificationReport): string {
  const m = report.meta;
  const lines: string[] = [
    'EFAS automated verification complete. Provide a concise technical analyst note (3-5 sentences max). Do not repeat the full report.',
    `Engine: weighted heuristic rubric (${m.rubricPoolSize} indicators) + URL structural analysis + Jaccard corpus similarity.`,
    `Score: ${m.cappedScore}/100 (raw sum ${m.rawScoreSum}, cap 100) | Band: ${report.rubric.band} (${m.bandRule})`,
    report.rubric.verdict
  ];

  if (report.rubric.triggered.length) {
    lines.push(
      'Fired: ' +
        report.rubric.triggered
          .map((i) => `${i.id}[+${i.weight}]`)
          .join(', ')
    );
  }

  if (report.links.length) {
    lines.push(
      'URLs: ' +
        report.links
          .map(
            (l) =>
              `${l.hostname} risk=${l.heuristicRisk} flags=${l.flagCodes.join('|') || 'none'}`
          )
          .join('; ')
    );
  }

  if (report.corpusMatches.length) {
    lines.push(
      'Corpus top match: ' +
        report.corpusMatches
          .map(
            (c) =>
              `${c.id} J=${c.score.toFixed(3)} (${c.intersection}/${c.union}) cat=${c.category}`
          )
          .join('; ')
    );
  }

  return lines.join('\n');
}

export { CORPUS_SOURCE_NOTE };
