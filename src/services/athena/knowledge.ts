import type { Intent } from './classifier';

export type KnowledgeSource = {
  name: string;
  label: string;
  url: string;
};

export const knowledgeSources: KnowledgeSource[] = [
  {
    name: 'PNP-ACG Cybersecurity Bulletins',
    label: 'Active scam advisories',
    url: 'https://acg.pnp.gov.ph/category/cybersecurity-bulletin/'
  },
  {
    name: 'PNP-ACG CS Scams Tracker',
    label: 'SMS and e-wallet scam patterns',
    url: 'https://acg.pnp.gov.ph/category/cs-scams/'
  },
  {
    name: 'BSP — AFASA Booklet & IRRs',
    label: 'RA 12010 · financial account scamming',
    url: 'https://www.bsp.gov.ph/Regulations/Banking%20Laws/AFASA-Booklet-with-IRRs.pdf'
  },
  {
    name: 'SEC Philippines',
    label: 'Investment fraud advisories',
    url: 'https://www.sec.gov.ph/advisories/'
  },
  {
    name: 'DOLE',
    label: 'Suspicious job scam advisories',
    url: 'https://dole.gov.ph/?s=suspicious+job'
  },
  {
    name: 'NCERT (DICT)',
    label: 'National CERT · report@cert.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    name: 'National Privacy Commission',
    label: 'RA 10173 data breach complaints',
    url: 'https://privacy.gov.ph'
  },
  {
    name: 'Google Safe Browsing',
    label: 'URL reputation lookup',
    url: 'https://transparencyreport.google.com/safe-browsing/search'
  },
  {
    name: 'CISA',
    label: 'Phishing and social engineering',
    url: 'https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks'
  }
];

export const intentFollowUps: Record<Intent, string[]> = {
  emergency: ['How do I contact PNP-ACG?', 'How do I freeze my GCash?'],
  otp: ['I already shared my OTP. What now?', 'How do I report this number?'],
  gcash: ['How do I enable biometrics?', 'What is the GCash hotline?'],
  sms_scam: ['Can you check this specific link?', 'How do I block them?'],
  phishing_email: ['Where do I forward this email?', 'I clicked the link. What now?'],
  link_check: ['It looks fake. Where do I report it?', 'What is virustotal.com?'],
  investment_scam: ['How do I check SEC registration?', 'I already invested. Help.'],
  job_scam: ['How do I verify with DOLE?', 'I paid a training fee. What now?'],
  identity_theft: ['How do I contact NPC?', 'How do I set up 2FA?'],
  account_security: ['What is a password manager?', 'How does 2FA work?'],
  report_scam: ['What evidence do I need?', 'Can I report online?'],
  general_scam: ['Can you analyze this message?', 'What scams are common now?'],
  greeting: ['Check a suspicious text', 'How do I report a scam?'],
  thanks: ['I have another question', 'Goodbye'],
  capabilities: ['Check a link', 'Secure my account'],
  what_is: ['Give an example', 'How do I protect myself?'],
  fallback: [
    'I received a suspicious text',
    'I need to report a scam',
    'My account was hacked'
  ]
};

const intentSources: Partial<Record<Intent, string[]>> = {
  emergency: ['PNP-ACG Cybersecurity Bulletins', 'BSP — AFASA Booklet & IRRs'],
  sms_scam: ['PNP-ACG CS Scams Tracker'],
  report_scam: ['PNP-ACG Cybersecurity Bulletins', 'NCERT (DICT)'],
  link_check: ['Google Safe Browsing'],
  general_scam: ['PNP-ACG CS Scams Tracker']
};

export function sourcesForIntent(intent: Intent): KnowledgeSource[] {
  const names = intentSources[intent] ?? ['PNP-ACG Cybersecurity Bulletins'];
  const matched = knowledgeSources.filter((k) => names.includes(k.name));
  return matched.length > 0 ? matched : [knowledgeSources[0]];
}
