import { contacts } from '../../data/contacts';
import { PNP_ACG_PHONE, PNP_ACG_URL } from '../../data/authorities';

/** Condensed emergency directory for Athena (matches EFAS Emergency page data). */
export function buildEmergencyContextBlock(): string {
  const lines: string[] = [
    'NATIONAL: 911 (life-threatening) | 117 (PNP)',
    `PNP Anti-Cybercrime Group (24/7): ${PNP_ACG_PHONE} | https://${PNP_ACG_URL}`,
    'DICT online scam hotline: 1326 | https://www.ncert.gov.ph/',
    'NBI Cybercrime: (02) 8523-8231',
    'GCash fraud: 2882 | Maya: (02) 8845-7788',
    'SMS spam report: forward message to 7726',
    '',
    'Surigao del Sur / Caraga (from EFAS Emergency contacts):'
  ];

  const relevant = contacts.filter(
    (c) =>
      c.category === 'Cybercrime Units' ||
      c.category === 'Police' ||
      c.category === 'Bank & E-Wallet Fraud'
  );

  for (const c of relevant.slice(0, 14)) {
    lines.push(
      `- ${c.name} | ${c.hotline} | ${c.hours}${c.address ? ` | ${c.address}` : ''}${c.sourceUrl ? ` | ${c.sourceUrl}` : ''}`
    );
  }

  return lines.join('\n');
}
