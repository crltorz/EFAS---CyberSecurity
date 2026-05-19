import {
  getCategoryAccent,
  getCategoryImageUri,
  getCategorySlug
} from './categoryMedia';

type TopicVisual = {
  headline: string;
  icon: string;
};

/** Per-article themed artwork (id → visual). */
const ARTICLE_VISUALS: Record<string, TopicVisual> = {
  '1': {
    headline: 'GCash Phishing',
    icon: phoneWalletIcon('#38bdf8')
  },
  '2': {
    headline: 'Facebook Security',
    icon: socialShieldIcon('#818cf8')
  },
  '3': {
    headline: 'Fake Lending Apps',
    icon: loanAppIcon('#f472b6')
  },
  '4': {
    headline: 'Strong Passwords',
    icon: lockKeyIcon('#2dd4bf')
  },
  '5': {
    headline: 'Kamag-anak Scams',
    icon: familySmsIcon('#4ade80')
  },
  '6': {
    headline: 'Suspicious Links',
    icon: linkWarningIcon('#4ade80')
  },
  '7': {
    headline: 'Investment Fraud',
    icon: chartScamIcon('#f472b6')
  },
  '8': {
    headline: 'SIM Registration',
    icon: simCardIcon('#818cf8')
  },
  '9': {
    headline: 'Public Wi-Fi',
    icon: wifiIcon('#4ade80')
  },
  '10': {
    headline: 'Romance Scams',
    icon: heartScamIcon('#f472b6')
  },
  '11': {
    headline: 'Child Safety Online',
    icon: childShieldIcon('#4ade80')
  },
  '12': {
    headline: 'Data Privacy Act',
    icon: documentShieldIcon('#818cf8')
  },
  '13': {
    headline: 'AI and Deepfakes',
    icon: aiFaceIcon('#c084fc')
  },
  '14': {
    headline: 'OFW Remittance',
    icon: remittanceIcon('#fcd34d')
  },
  '15': {
    headline: 'QR Quishing',
    icon: qrCodeIcon('#f472b6')
  },
  '16': {
    headline: 'Ransomware',
    icon: ransomwareIcon('#94a3b8')
  },
  '17': {
    headline: 'ATM Skimming',
    icon: atmCardIcon('#fcd34d')
  },
  '18': {
    headline: 'Cyberbullying',
    icon: chatHarassIcon('#4ade80')
  }
};

/** Per-alert themed artwork. */
const ALERT_VISUALS: Record<string, TopicVisual> = {
  '1': {
    headline: 'GCash Prize SMS',
    icon: phoneWalletIcon('#f87171')
  },
  '2': {
    headline: 'PhilSys Email',
    icon: idCardIcon('#fb923c')
  },
  '3': {
    headline: 'Fake Relief Drive',
    icon: donationIcon('#a78bfa')
  },
  '4': {
    headline: 'Impersonation Fraud',
    icon: impersonationIcon('#34d399')
  },
  '5': {
    headline: 'Telegram Task Scam',
    icon: telegramTaskIcon('#fbbf24')
  },
  '6': {
    headline: 'BPI Account SMS',
    icon: bankSmsIcon('#f87171')
  }
};

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildTopicSvg(category: string, headline: string, icon: string): string {
  const slug = getCategorySlug(category);
  const accent = getCategoryAccent(category);
  const safeHeadline = escapeXml(headline);
  const safeCategory = escapeXml(category.toUpperCase());

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg-${slug}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#050505"/>
      <stop offset="55%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e3a5f"/>
    </linearGradient>
    <radialGradient id="glow-${slug}" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid-${slug}" width="36" height="36" patternUnits="userSpaceOnUse">
      <path d="M 36 0 L 0 0 0 36" fill="none" stroke="${accent}" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="675" fill="url(#bg-${slug})"/>
  <rect width="1200" height="675" fill="url(#grid-${slug})"/>
  <rect width="1200" height="675" fill="url(#glow-${slug})"/>
  <rect x="60" y="60" width="1080" height="555" rx="28" fill="#0b1220" fill-opacity="0.72" stroke="${accent}" stroke-opacity="0.4" stroke-width="2"/>
  <g transform="translate(600, 230)">${icon}</g>
  <text x="600" y="400" text-anchor="middle" fill="#f1f5f9" font-family="system-ui,sans-serif" font-size="42" font-weight="700">${safeHeadline}</text>
  <text x="600" y="448" text-anchor="middle" fill="${accent}" font-family="system-ui,sans-serif" font-size="20" font-weight="600" letter-spacing="0.08em">${safeCategory}</text>
  <text x="600" y="490" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="15">EFAS - Verified Philippine cybersecurity</text>
</svg>`;
}

function toDataUri(svg: string): string {
  const base64 =
    typeof Buffer !== 'undefined'
      ? Buffer.from(svg, 'utf-8').toString('base64')
      : btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${base64}`;
}

export function getArticleImageUri(articleId: string, category: string): string {
  const visual = ARTICLE_VISUALS[articleId];
  if (!visual) {
    return toDataUri(buildTopicSvg(category, category, genericShieldIcon(getCategoryAccent(category))));
  }
  return toDataUri(buildTopicSvg(category, visual.headline, visual.icon));
}

export function getAlertImageUri(alertId: string, category: string): string {
  const visual = ALERT_VISUALS[alertId];
  if (!visual) {
    return toDataUri(buildTopicSvg(category, category, genericShieldIcon(getCategoryAccent(category))));
  }
  return toDataUri(buildTopicSvg(category, visual.headline, visual.icon));
}

export function resolveImageUri(
  category: string,
  externalUrl?: string,
  topicId?: string,
  topicKind?: 'article' | 'alert'
): string {
  if (externalUrl?.startsWith('data:image/')) return externalUrl;
  if (topicId && topicKind === 'article') return getArticleImageUri(topicId, category);
  if (topicId && topicKind === 'alert') return getAlertImageUri(topicId, category);
  return getCategoryImageUri(category);
}

function genericShieldIcon(color: string): string {
  return `<path d="M0-72 L56-96 56-20 Q56 48 0 80 Q-56 48 -56-20 L-56-96 Z" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="4"/>
  <path d="M-20-8 L-6 12 L28-28" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function phoneWalletIcon(color: string): string {
  return `<rect x="-52" y="-88" width="104" height="176" rx="16" fill="#0f172a" stroke="${color}" stroke-width="4"/>
  <rect x="-36" y="-56" width="72" height="48" rx="8" fill="${color}" fill-opacity="0.25"/>
  <text x="0" y="-22" text-anchor="middle" fill="${color}" font-family="system-ui,sans-serif" font-size="22" font-weight="700">₱</text>
  <circle cx="0" cy="48" r="10" fill="${color}"/>`;
}

function socialShieldIcon(color: string): string {
  return `<circle cx="0" cy="-20" r="44" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="4"/>
  <text x="0" y="-8" text-anchor="middle" fill="${color}" font-family="system-ui,sans-serif" font-size="36" font-weight="800">f</text>
  ${genericShieldIcon(color)}`;
}

function loanAppIcon(color: string): string {
  return `<rect x="-70" y="-70" width="140" height="140" rx="28" fill="#0f172a" stroke="${color}" stroke-width="4"/>
  <text x="0" y="8" text-anchor="middle" fill="${color}" font-family="system-ui,sans-serif" font-size="48" font-weight="800">₱</text>
  <path d="M-40 50 L40 50" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
  <text x="0" y="72" text-anchor="middle" fill="#ef4444" font-family="system-ui,sans-serif" font-size="14" font-weight="700">UNREGISTERED</text>`;
}

function lockKeyIcon(color: string): string {
  return `<rect x="-48" y="-20" width="96" height="80" rx="12" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="4"/>
  <path d="M-28-20 V-48 Q-28-72 0-72 Q28-72 28-48 V-20" fill="none" stroke="${color}" stroke-width="6"/>
  <circle cx="0" cy="16" r="12" fill="${color}"/>`;
}

function familySmsIcon(color: string): string {
  return `<circle cx="-36" cy="-30" r="22" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="3"/>
  <circle cx="36" cy="-30" r="22" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="3"/>
  <rect x="-80" y="10" width="160" height="70" rx="12" fill="#0f172a" stroke="${color}" stroke-width="3"/>
  <text x="0" y="52" text-anchor="middle" fill="${color}" font-family="system-ui,sans-serif" font-size="16">Anak, send…</text>`;
}

function linkWarningIcon(color: string): string {
  return `<path d="M-50 20 L50 20 L30-50 L-30-50 Z" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="4"/>
  <text x="0" y="8" text-anchor="middle" fill="${color}" font-family="system-ui,sans-serif" font-size="36" font-weight="800">!</text>
  <path d="M-60-30 H20" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
  <path d="M40-30 H80" stroke="#64748b" stroke-width="5" stroke-linecap="round" stroke-dasharray="8 8"/>`;
}

function chartScamIcon(color: string): string {
  return `<polyline points="-60,40 -20,-20 20,10 60,-50" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
  <text x="0" y="70" text-anchor="middle" fill="#ef4444" font-family="system-ui,sans-serif" font-size="16" font-weight="700">TOO GOOD</text>`;
}

function simCardIcon(color: string): string {
  return `<rect x="-55" y="-70" width="110" height="140" rx="14" fill="#0f172a" stroke="${color}" stroke-width="4"/>
  <path d="M-55-40 H55" stroke="${color}" stroke-width="3"/>
  <rect x="-30" y="-10" width="60" height="40" rx="6" fill="${color}" fill-opacity="0.3"/>
  <text x="0" y="60" text-anchor="middle" fill="${color}" font-family="system-ui,sans-serif" font-size="14" font-weight="700">RA 11934</text>`;
}

function wifiIcon(color: string): string {
  return `<path d="M0-60 Q-70-10 -90 30" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
  <path d="M0-35 Q-45 5 -55 30" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-opacity="0.7"/>
  <path d="M0-10 Q-20 20 -25 30" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-opacity="0.5"/>
  <circle cx="0" cy="38" r="8" fill="${color}"/>`;
}

function heartScamIcon(color: string): string {
  return `<path d="M0 50 C-70-10 -70-70 0-30 C70-70 70-10 0 50 Z" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="4"/>
  <text x="0" y="78" text-anchor="middle" fill="#ef4444" font-family="system-ui,sans-serif" font-size="14" font-weight="700">SEND MONEY</text>`;
}

function childShieldIcon(color: string): string {
  return `${genericShieldIcon(color)}
  <circle cx="0" cy="-10" r="18" fill="${color}"/>`;
}

function documentShieldIcon(color: string): string {
  return `<rect x="-45" y="-65" width="90" height="110" rx="8" fill="#0f172a" stroke="${color}" stroke-width="4"/>
  <path d="M-25-35 H25 M-25-10 H25 M-25 15 H10" stroke="${color}" stroke-width="4" stroke-linecap="round"/>`;
}

function aiFaceIcon(color: string): string {
  return `<circle cx="0" cy="0" r="55" fill="#0f172a" stroke="${color}" stroke-width="4"/>
  <circle cx="-18" cy="-8" r="8" fill="${color}"/>
  <circle cx="18" cy="-8" r="8" fill="${color}"/>
  <path d="M-25 25 Q0 40 25 25" fill="none" stroke="${color}" stroke-width="4"/>
  <path d="M-70-40 L70 50" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>`;
}

function remittanceIcon(color: string): string {
  return `<rect x="-70" y="-40" width="140" height="80" rx="10" fill="#0f172a" stroke="${color}" stroke-width="4"/>
  <text x="0" y="8" text-anchor="middle" fill="${color}" font-family="system-ui,sans-serif" font-size="26" font-weight="700">OFW REMIT</text>`;
}

function qrCodeIcon(color: string): string {
  return `<rect x="-55" y="-55" width="110" height="110" rx="8" fill="#0f172a" stroke="${color}" stroke-width="4"/>
  <rect x="-40" y="-40" width="28" height="28" fill="${color}"/>
  <rect x="12" y="-40" width="28" height="28" fill="${color}" fill-opacity="0.5"/>
  <rect x="-40" y="12" width="28" height="28" fill="${color}" fill-opacity="0.5"/>
  <rect x="12" y="12" width="28" height="28" fill="${color}"/>`;
}

function ransomwareIcon(color: string): string {
  return `<rect x="-55" y="-45" width="110" height="90" rx="8" fill="#0f172a" stroke="${color}" stroke-width="4"/>
  <rect x="-20" y="-28" width="40" height="32" rx="6" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="3"/>
  <path d="M-12-28 V-40 Q0-50 12-40 V-28" fill="none" stroke="${color}" stroke-width="4"/>
  <text x="0" y="32" text-anchor="middle" fill="#ef4444" font-family="system-ui,sans-serif" font-size="18" font-weight="700">LOCKED</text>`;
}

function impersonationIcon(color: string): string {
  return `<circle cx="-28" cy="-10" r="20" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="3"/>
  <circle cx="28" cy="-10" r="20" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="3"/>
  <path d="M-8 30 L8 30" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
  <text x="0" y="58" text-anchor="middle" fill="${color}" font-family="system-ui,sans-serif" font-size="12" font-weight="700">FAKE CEO</text>`;
}

function telegramTaskIcon(color: string): string {
  return `<circle cx="0" cy="0" r="50" fill="#0f172a" stroke="${color}" stroke-width="4"/>
  <path d="M-22-8 L22 0 L-22 8 L-12 0 Z" fill="${color}"/>
  <text x="0" y="72" text-anchor="middle" fill="#ef4444" font-family="system-ui,sans-serif" font-size="13" font-weight="700">TASK SCAM</text>`;
}

function atmCardIcon(color: string): string {
  return `<rect x="-80" y="-50" width="160" height="100" rx="12" fill="#1e293b" stroke="${color}" stroke-width="4"/>
  <rect x="-60" y="-20" width="120" height="16" rx="4" fill="${color}" fill-opacity="0.4"/>
  <rect x="30" y="20" width="36" height="24" rx="4" fill="${color}"/>`;
}

function chatHarassIcon(color: string): string {
  return `<rect x="-75" y="-35" width="90" height="55" rx="10" fill="#0f172a" stroke="${color}" stroke-width="3"/>
  <rect x="5" y="5" width="90" height="55" rx="10" fill="${color}" fill-opacity="0.15" stroke="${color}" stroke-width="3"/>`;
}

function idCardIcon(color: string): string {
  return `<rect x="-75" y="-50" width="150" height="100" rx="10" fill="#0f172a" stroke="${color}" stroke-width="4"/>
  <circle cx="-35" cy="0" r="22" fill="${color}" fill-opacity="0.3"/>
  <path d="M15-15 H55 M15 5 H55 M15 25 H40" stroke="${color}" stroke-width="4" stroke-linecap="round"/>`;
}

function donationIcon(color: string): string {
  return `<path d="M0 50 C-50 10 -50-30 0-10 C50-30 50 10 0 50 Z" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="4"/>
  <text x="0" y="78" text-anchor="middle" fill="${color}" font-family="system-ui,sans-serif" font-size="14">FAKE LGU</text>`;
}

function shoppingBagIcon(color: string): string {
  return `<path d="M-50 20 H50 L40-30 H-40 Z" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="4"/>
  <path d="M-20-30 V-50 Q0-65 20-50 V-30" fill="none" stroke="${color}" stroke-width="4"/>`;
}

function rideHailIcon(color: string): string {
  return `<rect x="-70" y="-20" width="140" height="50" rx="12" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="4"/>
  <circle cx="-40" cy="40" r="14" fill="#0f172a" stroke="${color}" stroke-width="4"/>
  <circle cx="40" cy="40" r="14" fill="#0f172a" stroke="${color}" stroke-width="4"/>`;
}

function bankSmsIcon(color: string): string {
  return `${phoneWalletIcon(color)}
  <text x="0" y="110" text-anchor="middle" fill="#ef4444" font-family="system-ui,sans-serif" font-size="14" font-weight="700">ACCOUNT LOCKED</text>`;
}
