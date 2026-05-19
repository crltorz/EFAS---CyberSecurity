import {
  type ClassifierResult,
  type Intent,
  type AthenaCitation,
  classifyIntent,
  SAFETY_INTENTS
} from './classifier';

export { classifyIntent, detectLanguage } from './classifier';
export type {
  Intent,
  AthenaCitation,
  ClassifierResult,
  AthenaConfidence,
  ClassifierMethod
} from './classifier';

const INTENT_CITATIONS: Partial<Record<Intent, AthenaCitation[]>> = {
  emergency: [
    {
      title: 'PNP-ACG Cybersecurity Bulletins',
      url: 'https://acg.pnp.gov.ph/category/cybersecurity-bulletin/'
    },
    {
      title: 'BSP — AFASA Booklet & IRRs (RA 12010)',
      url: 'https://www.bsp.gov.ph/Regulations/Banking%20Laws/AFASA-Booklet-with-IRRs.pdf'
    }
  ],
  otp: [
    { title: 'BSP — Consumer protection', url: 'https://www.bsp.gov.ph' },
    { title: 'PNP-ACG', url: 'https://acg.pnp.gov.ph' }
  ],
  gcash: [
    { title: 'BSP Consumer Protection', url: 'https://www.bsp.gov.ph' },
    { title: 'PNP-ACG CS Scams Tracker', url: 'https://acg.pnp.gov.ph/category/cs-scams/' }
  ],
  sms_scam: [
    { title: 'PNP-ACG CS Scams Tracker', url: 'https://acg.pnp.gov.ph/category/cs-scams/' },
    { title: 'NTC', url: 'https://www.ntc.gov.ph' }
  ],
  phishing_email: [
    { title: 'DICT NCERT (CERT-PH)', url: 'https://www.ncert.gov.ph/' },
    { title: 'NIST SP 800-177 Rev. 1', url: 'https://csrc.nist.gov/pubs/sp/800/177/r1/final' }
  ],
  link_check: [
    {
      title: 'Google Safe Browsing Transparency Report',
      url: 'https://transparencyreport.google.com/safe-browsing/search'
    },
    { title: 'APWG Phishing Trends', url: 'https://apwg.org/trendsreports/' }
  ],
  investment_scam: [
    { title: 'SEC Philippines', url: 'https://www.sec.gov.ph' },
    {
      title: 'SEC — Anti-Money Laundering Act',
      url: 'https://www.sec.gov.ph/laws-rules-decisions-and-resolutions/anti-money-laundering-act/'
    }
  ],
  job_scam: [
    { title: 'DOLE — Suspicious job advisories', url: 'https://dole.gov.ph/?s=suspicious+job' },
    { title: 'PNP-ACG', url: 'https://acg.pnp.gov.ph' }
  ],
  identity_theft: [
    { title: 'National Privacy Commission (RA 10173)', url: 'https://privacy.gov.ph' },
    { title: 'PNP-ACG', url: 'https://acg.pnp.gov.ph' }
  ],
  report_scam: [
    { title: 'PNP-ACG', url: 'https://acg.pnp.gov.ph' },
    { title: 'NBI Cybercrime Division', url: 'https://www.nbi.gov.ph' }
  ],
  account_security: [
    {
      title: 'CISA — Phishing avoidance',
      url: 'https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks'
    },
    { title: 'NCERT (DICT)', url: 'https://www.ncert.gov.ph/' }
  ],
  general_scam: [
    {
      title: 'PNP-ACG Cybersecurity Bulletins',
      url: 'https://acg.pnp.gov.ph/category/cybersecurity-bulletin/'
    },
    {
      title: 'US FTC — Phishing recognition',
      url: 'https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams'
    }
  ],
  what_is: [
    { title: 'NCERT (DICT)', url: 'https://www.ncert.gov.ph/' },
    { title: 'PNP-ACG', url: 'https://acg.pnp.gov.ph' }
  ]
};

const DEFAULT_CITATIONS: AthenaCitation[] = [
  {
    title: 'PNP-ACG Cybersecurity Bulletins',
    url: 'https://acg.pnp.gov.ph/category/cybersecurity-bulletin/'
  },
  { title: 'NCERT (DICT)', url: 'https://www.ncert.gov.ph/' }
];

export function getCitationsForIntent(intent: Intent): AthenaCitation[] {
  return INTENT_CITATIONS[intent] ?? DEFAULT_CITATIONS;
}

export function classifyWithMeta(text: string): ClassifierResult {
  const intent = classifyIntent(text);
  const confidence = SAFETY_INTENTS.includes(intent)
    ? 'high'
    : intent === 'fallback'
      ? 'low'
      : 'medium';
  const method = SAFETY_INTENTS.includes(intent)
    ? 'safety_regex'
    : intent === 'fallback'
      ? 'fallback'
      : 'intent_regex';

  return {
    intent,
    confidence,
    method,
    citations: getCitationsForIntent(intent)
  };
}
