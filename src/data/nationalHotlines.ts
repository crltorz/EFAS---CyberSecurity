import { PNP_ACG_PHONE } from './authorities';

export type NationalHotline = {
  id: string;
  label: string;
  number: string;
  description: string;
  tel: string;
  url?: string;
};

export const NATIONAL_HOTLINES: NationalHotline[] = [
  {
    id: '911',
    label: 'National Emergency',
    number: '911',
    description: 'Life-threatening emergencies (fire, medical, crime in progress)',
    tel: '911'
  },
  {
    id: '117',
    label: 'PNP Hotline',
    number: '117',
    description: 'Philippine National Police emergency line',
    tel: '117'
  },
  {
    id: '1326',
    label: 'DICT — Online Scams',
    number: '1326',
    description: 'Report online shopping scams and cyber incidents (DICT)',
    tel: '1326',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    id: 'acg',
    label: 'PNP Anti-Cybercrime Group',
    number: PNP_ACG_PHONE,
    description: 'Cybercrime complaints, phishing, online fraud',
    tel: '0287230401',
    url: 'https://acg.pnp.gov.ph/'
  },
  {
    id: 'nbi',
    label: 'NBI Cybercrime Division',
    number: '(02) 8523-8231',
    description: 'Investigation of cyber-enabled crimes',
    tel: '0285238231',
    url: 'https://www.nbi.gov.ph/'
  },
  {
    id: 'bsp',
    label: 'BSP Consumer Assistance',
    number: '(02) 8708-7087',
    description: 'Banking and e-money fraud concerns',
    tel: '0287087087',
    url: 'https://www.bsp.gov.ph/SitePages/ConsumerFinance/ConsumerAssistance.aspx'
  }
];

export const EMERGENCY_STEPS = [
  {
    step: 1,
    title: 'Stop and disconnect',
    detail:
      'Do not send more money. Disconnect compromised devices from Wi-Fi if malware is suspected.'
  },
  {
    step: 2,
    title: 'Secure accounts',
    detail:
      'Change passwords from a clean device. Enable 2FA on email, banking, and GCash/Maya.'
  },
  {
    step: 3,
    title: 'Preserve evidence',
    detail:
      'Screenshot messages, URLs, transaction IDs, and sender numbers before they are deleted.'
  },
  {
    step: 4,
    title: 'Report officially',
    detail:
      'Call the relevant hotline below. File with PNP-ACG or DICT 1326 for cyber incidents.'
  }
];
