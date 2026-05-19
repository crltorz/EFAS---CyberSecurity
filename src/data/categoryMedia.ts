/** Reliable category images (inline SVG) — no external CDN dependency. */

const SLUG_MAP: Record<string, string> = {
  'SMS Phishing': 'sms-phishing',
  'Email Phishing': 'email-phishing',
  'Social Engineering': 'social-engineering',
  'E-commerce Fraud': 'ecommerce-fraud',
  'Job Scam': 'job-scam',
  Phishing: 'phishing',
  Privacy: 'privacy',
  'Scam Awareness': 'scam-awareness',
  Passwords: 'passwords',
  'Online Safety': 'online-safety',
  'Financial Fraud': 'financial-fraud',
  'Workplace & Business': 'workplace',
  'AI Threats': 'ai-threats'
};

const ACCENT: Record<string, string> = {
  'sms-phishing': '#f87171',
  'email-phishing': '#fb923c',
  'social-engineering': '#a78bfa',
  'ecommerce-fraud': '#34d399',
  'job-scam': '#fbbf24',
  phishing: '#38bdf8',
  privacy: '#818cf8',
  'scam-awareness': '#f472b6',
  passwords: '#2dd4bf',
  'online-safety': '#4ade80',
  'financial-fraud': '#fcd34d',
  workplace: '#94a3b8',
  'ai-threats': '#c084fc'
};

function buildSvg(label: string, accent: string): string {
  const safe = label.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#1e466b"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${accent}" stroke-opacity="0.08" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect width="1200" height="675" fill="url(#grid)"/>
  <circle cx="200" cy="120" r="180" fill="${accent}" fill-opacity="0.12"/>
  <circle cx="1000" cy="560" r="220" fill="${accent}" fill-opacity="0.08"/>
  <rect x="80" y="80" width="1040" height="515" rx="24" fill="#0f172a" fill-opacity="0.55" stroke="${accent}" stroke-opacity="0.35" stroke-width="2"/>
  <text x="600" y="310" text-anchor="middle" fill="${accent}" font-family="system-ui,sans-serif" font-size="52" font-weight="700">${safe}</text>
  <text x="600" y="370" text-anchor="middle" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="22">EFAS · Philippine Cybersecurity</text>
  <text x="600" y="420" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="16">Verified awareness content</text>
</svg>`;
}

export function getCategorySlug(category: string): string {
  return SLUG_MAP[category] ?? 'online-safety';
}

export function getCategoryAccent(category: string): string {
  const slug = getCategorySlug(category);
  return ACCENT[slug] ?? '#67baf4';
}

export function getCategoryImageUri(category: string): string {
  const accent = getCategoryAccent(category);
  const svg = buildSvg(category, accent);
  const base64 =
    typeof Buffer !== 'undefined'
      ? Buffer.from(svg, 'utf-8').toString('base64')
      : btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${base64}`;
}

