import { SeverityLevel } from '../components/SeverityBadge';
import { VerificationStatus as VStatus } from '../components/VerifiedBadge';
import { getAlertImageUri } from './topicMedia';

export interface ScamAlert {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  date: string;
  source: string;
  sourceUrl: string;
  status: VStatus;
  image?: string;
  category: string;
}

const rawScamAlerts: ScamAlert[] = [
  {
    id: '1',
    title: 'Fake GCash "Won Prize" SMS Phishing',
    description:
      'Users are receiving SMS claiming they won PHP 50,000. The link directs to a fake GCash login page designed to steal MPIN and OTP.',
    severity: 'Critical',
    date: 'Oct 14, 2023',
    source: 'PNP-ACG',
    sourceUrl: 'https://acg.pnp.gov.ph/category/cs-scams/',
    status: 'Officially Verified',
    category: 'SMS Phishing'
  },
  {
    id: '2',
    title: 'PhilSys ID Upgrade Email Scam',
    description:
      'Fraudulent emails claiming to be from PSA ask users to pay a fee to "upgrade" their National ID. PhilSys warns these are phishing scams, not official assistance.',
    severity: 'High',
    date: 'Oct 12, 2023',
    source: 'PhilSys / PSA',
    sourceUrl:
      'https://philsys.gov.ph/psa-warns-against-phishing-scams-disguised-as-national-id-assistance/',
    status: 'Officially Verified',
    category: 'Email Phishing'
  },
  {
    id: '3',
    title: 'Fake Relief Goods Drive',
    description:
      'Social media pages solicit donations via Maya/GCash posing as official disaster relief during floods. DICT Cybersecurity warns not to send money to unverified drives.',
    severity: 'Medium',
    date: 'Oct 10, 2023',
    source: 'DICT Cybersecurity',
    sourceUrl:
      'https://www.facebook.com/CYBERSECgovph/posts/dont-let-scammers-add-to-the-disasterduring-this-rainy-season-floods-affect-many/1185342073624746/',
    status: 'Officially Verified',
    category: 'Social Engineering'
  },
  {
    id: '4',
    title:
      'Fraudsters Impersonating Authorities, Financial Institutions, and Corporate Leaders',
    description:
      'Scammers pose as government officials, bank representatives, or executives to pressure victims into transfers or credential disclosure. PNP-ACG Cyber Security Bulletin No. 433 documents the modus.',
    severity: 'High',
    date: 'Oct 08, 2023',
    source: 'PNP-ACG',
    sourceUrl:
      'https://acg.pnp.gov.ph/acg-cyber-security-bulletin-nr-433-fraudsters-impersonating-authorities-financial-institutions-and-corporate-leaders/',
    status: 'Officially Verified',
    category: 'Social Engineering'
  },
  {
    id: '5',
    title: 'Telegram Task Scam',
    description:
      'Recruiters on Telegram offer easy "task" earnings, then require deposits or fees before paying out. PNP RACU 8 warns this is a growing scheme targeting job seekers.',
    severity: 'Medium',
    date: 'Oct 05, 2023',
    source: 'PNP-ACG RACU 8',
    sourceUrl:
      'https://www.facebook.com/racu8pnpacg/posts/-telegram-task-scam-modus-operandi-beware-of-the-telegram-task-scam-a-scheme-tar/1169783898661752/',
    status: 'Officially Verified',
    category: 'Job Scam'
  },
  {
    id: '6',
    title: 'BPI "Account Locked" SMS Scam',
    description:
      'Mass SMS impersonating BPI claim accounts are locked due to suspicious activity. BPI advises never tapping links in SMS and reporting fraud to the bank directly.',
    severity: 'Critical',
    date: 'Oct 03, 2023',
    source: 'BPI',
    sourceUrl:
      'https://www.bpi.com.ph/about-bpi/news/3-things-to-do-when-getting-suspicious-messages',
    status: 'Officially Verified',
    category: 'SMS Phishing'
  }
];

export const scamAlerts: ScamAlert[] = rawScamAlerts.map((alert) => ({
  ...alert,
  image: getAlertImageUri(alert.id, alert.category)
}));
