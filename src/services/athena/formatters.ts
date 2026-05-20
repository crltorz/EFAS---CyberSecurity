import { bandActions, type AnalysisResult } from '../../data/riskRubric';
import type { PasswordStrength } from '../../data/passwordStrength';
import type { VerificationReport } from './verification';
import { CORPUS_SOURCE_NOTE } from './verification';
import { PNP_ACG_PHONE, PNP_ACG_URL } from '../../data/authorities';

export function formatAnalysisReply(
  result: AnalysisResult,
  lang: 'en' | 'tl'
): string {
  const bandUpper = result.band.toUpperCase();
  const bandIcon =
    result.band === 'high' ? '⚠' : result.band === 'caution' ? '⚡' : '✓';
  const lines: string[] = [];
  if (lang === 'tl') {
    lines.push('Eto ang resulta nang pinatakbo ko sa risk rubric ko:');
    lines.push('');
    lines.push(
      `${bandIcon} Panganib: ${bandUpper}  ·  iskor ${result.score}/100`
    );
    lines.push(result.verdict);
    if (result.triggered.length > 0) {
      lines.push('');
      lines.push(`Mga senyales (${result.triggered.length}):`);
      for (const ind of result.triggered) {
        lines.push(`• ${ind.label}  (+${ind.weight})`);
      }
    }
    lines.push('');
    lines.push('Dapat gawin:');
    bandActions[result.band].forEach((a, i) => lines.push(`${i + 1}. ${a}`));
  } else {
    lines.push("Here's what I found when I ran that through my risk rubric:");
    lines.push('');
    lines.push(`${bandIcon} Risk: ${bandUpper}  ·  score ${result.score}/100`);
    lines.push(result.verdict);
    if (result.triggered.length > 0) {
      lines.push('');
      lines.push(`Indicators triggered (${result.triggered.length}):`);
      for (const ind of result.triggered) {
        lines.push(`• ${ind.label}  (+${ind.weight})`);
      }
    }
    lines.push('');
    lines.push('Recommended actions:');
    bandActions[result.band].forEach((a, i) => lines.push(`${i + 1}. ${a}`));
  }
  return lines.join('\n');
}

const CATEGORY_LABELS: Record<string, { en: string; tl: string }> = {
  gambling_scam: { en: 'Gambling / casino lure', tl: 'Gambling / casino lure' },
  sms_scam: { en: 'SMS smishing', tl: 'SMS smishing' },
  phishing_email: { en: 'Phishing email', tl: 'Phishing email' },
  investment_scam: { en: 'Investment fraud', tl: 'Investment fraud' },
  job_scam: { en: 'Job / task scam', tl: 'Job / task scam' },
  task_scam: { en: 'Task scam', tl: 'Task scam' },
  government_impersonation: {
    en: 'Government impersonation',
    tl: 'Government impersonation'
  },
  parcel_scam: { en: 'Parcel / delivery scam', tl: 'Parcel / delivery scam' },
  promotional_spam: { en: 'Promotional spam', tl: 'Promotional spam' },
  legitimate: { en: 'Legitimate-style message', tl: 'Legitimate-style message' }
};

export function formatVerificationReport(
  report: VerificationReport,
  lang: 'en' | 'tl'
): string {
  const { rubric, links, corpusMatches, meta } = report;
  const bandLabel =
    rubric.band === 'high'
      ? 'HIGH'
      : rubric.band === 'caution'
        ? 'CAUTION'
        : 'LOW';

  const lines: string[] = [];
  const L = (en: string, tl: string) => (lang === 'tl' ? tl : en);

  lines.push('EFAS TECHNICAL VERIFICATION REPORT');
  lines.push('========================================');
  lines.push('');

  lines.push(L('1. ANALYSIS METADATA', '1. METADATA NG ANALYSIS'));
  lines.push(`   Input length: ${meta.inputLength} characters`);
  lines.push(`   URLs extracted: ${meta.urlCount}`);
  lines.push(
    `   Preprocessing: NFKD unicode normalization, zero-width strip, confusable homoglyph mapping (riskRubric.normalize)`
  );
  lines.push('');

  lines.push(L('2. SCORING ENGINE (HEURISTIC RUBRIC)', '2. SCORING ENGINE'));
  lines.push(`   Indicator pool: ${meta.rubricPoolSize} rules`);
  lines.push(
    `   Triggered: ${meta.triggeredCount} | Not triggered: ${meta.notTriggeredCount}`
  );
  lines.push(
    `   Raw weight sum: ${meta.rawScoreSum} -> Capped score: ${meta.cappedScore}/100`
  );
  lines.push(`   Classification: ${bandLabel} RISK (${meta.bandRule})`);
  lines.push(`   Verdict: ${rubric.verdict}`);
  lines.push(
    '   Band thresholds: LOW 0-30 | CAUTION 31-60 | HIGH 61-100 (min(sum(weights), 100))'
  );
  lines.push('');

  if (rubric.triggered.length > 0) {
    lines.push(L('3. INDICATOR FIRINGS', '3. MGA INDICATOR NA NA-TRIGGER'));
    rubric.triggered
      .sort((a, b) => b.weight - a.weight)
      .forEach((ind, i) => {
        lines.push(
          `   [${i + 1}] id=${ind.id} | severity=${ind.severity} | weight=+${ind.weight}`
        );
        lines.push(`       label: ${ind.label}`);
        lines.push(`       detection: ${ind.description}`);
        if (ind.evidence) {
          lines.push(`       matched_span: "${ind.evidence}"`);
        }
        lines.push(`       framework: ${ind.source.name}`);
        lines.push(`       citation: ${ind.source.url}`);
      });
    lines.push('');
  } else {
    lines.push(L('3. INDICATOR FIRINGS', '3. INDICATOR FIRINGS'));
    lines.push('   No rubric indicators fired on normalized input.');
    lines.push('');
  }

  if (links.length > 0) {
    lines.push(L('4. URL DECOMPOSITION & STRUCTURAL RISK', '4. URL ANALYSIS'));
    links.forEach((link, i) => {
      lines.push(`   [${i + 1}] raw=${link.raw}`);
      lines.push(
        `       host=${link.hostname} | proto=${link.protocol} | port=${link.port || 'default'} | tld=${link.tld || 'n/a'}`
      );
      lines.push(
        `       path=${link.path} | subdomain_depth=${link.subdomainDepth}`
      );
      lines.push(`       heuristic_risk=${link.heuristicRisk.toUpperCase()}`);
      if (link.brandImpersonation) {
        lines.push(`       brand_token=${link.brandImpersonation} (non-official domain)`);
      }
      if (link.flagCodes.length > 0) {
        lines.push(`       flag_codes: ${link.flagCodes.join(', ')}`);
        link.flags.forEach((f) => lines.push(`       - ${f}`));
      } else {
        lines.push(
          '       flag_codes: none (structural pass — still verify via Safe Browsing)'
        );
      }
      lines.push(`       external_check: ${link.safeBrowsingCheckUrl}`);
    });
    lines.push('');
  }

  lines.push(
    L('5. CORPUS SIMILARITY (SPAM SMS DATASET)', '5. CORPUS SIMILARITY')
  );
  if (corpusMatches.length > 0) {
    corpusMatches.forEach((m, i) => {
      const cat =
        CATEGORY_LABELS[m.category]?.[lang === 'tl' ? 'tl' : 'en'] ?? m.category;
      lines.push(`   [${i + 1}] ref=${m.id} | category=${cat}`);
      lines.push(
        `       Jaccard J=${m.score.toFixed(4)} | |A∩B|=${m.intersection} | |A∪B|=${m.union}`
      );
      lines.push(
        `       |A|=${m.inputTokenCount} input tokens | |B|=${m.sampleTokenCount} corpus tokens`
      );
      lines.push(`       corpus_label_band=${m.expectedBand} | lang=${m.language}`);
      lines.push(`       nearest_sample: "${m.excerpt}"`);
    });
    lines.push(`   ${CORPUS_SOURCE_NOTE}`);
  } else {
    lines.push(
      '   No corpus match above Jaccard threshold (min 0.12). Pattern may be novel or benign.'
    );
  }
  lines.push('');

  lines.push(L('6. OPERATIONAL RESPONSE', '6. OPERATIONAL RESPONSE'));
  bandActions[rubric.band].forEach((a, i) => lines.push(`   ${i + 1}. ${a}`));
  lines.push('');

  if (rubric.band !== 'low') {
    lines.push(L('7. REPORTING CHANNELS', '7. REPORTING CHANNELS'));
    lines.push(
      `   PNP-ACG (24/7): ${PNP_ACG_PHONE} | https://${PNP_ACG_URL}`
    );
    lines.push('   DICT NCERT: 1326 | https://www.ncert.gov.ph/');
    lines.push('   NBI Cybercrime: (02) 8523-8231');
    lines.push('   CERT-PH phishing: report@cert.gov.ph');
    lines.push('   NTC SMS spam: forward to 7726');
    lines.push('');
  }

  lines.push(
    L(
      'DISCLAIMER: Heuristic analysis only — not a live malware sandbox or bank fraud decision. Cross-check with official channels before acting.',
      'DISCLAIMER: Heuristic analysis lamang — hindi live malware scan. I-verify sa opisyal na channel.'
    )
  );

  return lines.join('\n');
}

export function formatPasswordReply(
  result: PasswordStrength,
  lang: 'en' | 'tl'
): string {
  const icon = result.score >= 3 ? '✓' : result.score === 2 ? '⚡' : '⚠';
  const lines: string[] = [];
  if (lang === 'tl') {
    lines.push(`${icon} Lakas ng password: ${result.band.toUpperCase()}`);
    lines.push(`Tinatayang oras bago ma-crack: ${result.estimatedCrackTime}`);
  } else {
    lines.push(`${icon} Password strength: ${result.band.toUpperCase()}`);
    lines.push(`Estimated time to crack: ${result.estimatedCrackTime}`);
  }
  lines.push('');
  lines.push(
    lang === 'tl'
      ? 'Huwag ibahagi ang totoong password sa kahit kanino. Gumamit ng password manager.'
      : 'Never share your real password with anyone. Use a password manager.'
  );
  return lines.join('\n');
}
