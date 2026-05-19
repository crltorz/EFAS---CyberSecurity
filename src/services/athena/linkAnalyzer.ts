const URL_RE =
  /https?:\/\/[^\s<>"']+|www\.[a-z0-9][a-z0-9.-]*[a-z0-9][^\s<>"']*|\b[a-z0-9][-a-z0-9]{1,62}\.(com|net|org|ph|xyz|info|co|me|io|tk|ly|app|site|click|link|live|shop|de|ca|top|vip|cc|biz)(?:\/[^\s<>"']*)?/gi;

const SHORTENERS =
  /\b(bit\.ly|tinyurl\.com|t\.co|ow\.ly|is\.gd|buff\.ly|goo\.gl|cutt\.ly|shorturl\.at|rebrand\.ly|rb\.gy|s\.id)\b/i;

const SUSPICIOUS_TLDS =
  /\.(xyz|tk|top|vip|cc|biz|de|ru|cn|su|click|link|live|shop|app|site|info)(?:\/|$)/i;

const PH_BRANDS = [
  'gcash',
  'maya',
  'bdo',
  'bpi',
  'metrobank',
  'landbank',
  'pnb',
  'unionbank',
  'sec',
  'bsp',
  'dict',
  'pnp',
  'nbi',
  'lazada',
  'shopee',
  'grab'
];

export type LinkRiskLevel = 'elevated' | 'moderate' | 'low' | 'unknown';

export type LinkAnalysis = {
  raw: string;
  hostname: string;
  protocol: string;
  tld: string;
  path: string;
  port: string;
  subdomainDepth: number;
  flags: string[];
  flagCodes: string[];
  brandImpersonation?: string;
  heuristicRisk: LinkRiskLevel;
  safeBrowsingCheckUrl: string;
};

function tokenizeHost(host: string): string {
  return host.toLowerCase().replace(/^www\./, '');
}

export function extractUrls(text: string): string[] {
  const found = text.match(URL_RE) ?? [];
  const normalized = found.map((u) => (u.startsWith('http') ? u : `https://${u}`));
  return [...new Set(normalized)];
}

function computeHeuristicRisk(flagCodes: string[]): LinkRiskLevel {
  const high = [
    'RAW_IP',
    'SHORTENER',
    'BRAND_IMPERSONATION',
    'MALFORMED',
    'NON_HTTPS'
  ];
  const med = ['SUSPICIOUS_TLD', 'HYPHENATED_BRAND', 'DEEP_SUBDOMAIN', 'NON_PH_TLD'];
  if (flagCodes.some((c) => high.includes(c))) return 'elevated';
  if (flagCodes.some((c) => med.includes(c))) return 'moderate';
  if (flagCodes.length === 0) return 'low';
  return 'moderate';
}

export function analyzeLink(url: string): LinkAnalysis {
  const flags: string[] = [];
  const flagCodes: string[] = [];
  let hostname = '';
  let protocol = 'unknown';
  let tld = '';
  let path = '';
  let port = '';
  let subdomainDepth = 0;
  let brandImpersonation: string | undefined;

  try {
    const parsed = new URL(url);
    hostname = tokenizeHost(parsed.hostname);
    protocol = parsed.protocol.replace(':', '');
    port = parsed.port || (protocol === 'https' ? '443' : '80');
    path = parsed.pathname + parsed.search;
    const parts = hostname.split('.');
    tld = parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
    subdomainDepth = Math.max(0, parts.length - 2);

    if (protocol !== 'https') {
      flags.push('Transport not HTTPS (TLS downgrade / phishing risk)');
      flagCodes.push('NON_HTTPS');
    }
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(parsed.hostname)) {
      flags.push('Destination is literal IPv4 (no domain reputation chain)');
      flagCodes.push('RAW_IP');
    }
    if (SHORTENERS.test(hostname)) {
      flags.push('URL shortener — final destination opaque until expansion');
      flagCodes.push('SHORTENER');
    }
    if (SUSPICIOUS_TLDS.test(hostname)) {
      flags.push(`High-abuse TLD observed (${tld})`);
      flagCodes.push('SUSPICIOUS_TLD');
    }
    if (hostname.includes('-') && PH_BRANDS.some((b) => hostname.includes(b))) {
      flags.push('Hyphenated hostname contains financial/gov brand token');
      flagCodes.push('HYPHENATED_BRAND');
    }
    if (subdomainDepth > 2) {
      flags.push(
        `Subdomain depth ${subdomainDepth} (possible deceptive nesting)`
      );
      flagCodes.push('DEEP_SUBDOMAIN');
    }

    for (const brand of PH_BRANDS) {
      if (!hostname.includes(brand)) continue;
      const official = [
        `${brand}.com`,
        `${brand}.com.ph`,
        `${brand}.ph`,
        'mynt.xyz'
      ];
      if (official.some((o) => hostname === o || hostname.endsWith(`.${o}`))) {
        continue;
      }
      flags.push(
        `Hostname contains "${brand}" outside official registrable domain set`
      );
      flagCodes.push('BRAND_IMPERSONATION');
      brandImpersonation = brand.toUpperCase();
    }

    if (tld !== '.ph' && PH_BRANDS.some((b) => hostname.includes(b))) {
      flags.push('Brand token present on non-.ph TLD');
      flagCodes.push('NON_PH_TLD');
    }
  } catch {
    flags.push('Parse failure — URL syntax invalid for WHATWG URL parser');
    flagCodes.push('MALFORMED');
    hostname = url.slice(0, 80);
  }

  return {
    raw: url,
    hostname,
    protocol,
    tld,
    path: path || '/',
    port,
    subdomainDepth,
    flags,
    flagCodes,
    brandImpersonation,
    heuristicRisk: computeHeuristicRisk(flagCodes),
    safeBrowsingCheckUrl: buildSafeBrowsingUrl(url)
  };
}

function buildSafeBrowsingUrl(url: string): string {
  return `https://transparencyreport.google.com/safe-browsing/search?url=${encodeURIComponent(url)}`;
}

export function analyzeAllLinks(text: string): LinkAnalysis[] {
  return extractUrls(text).map(analyzeLink);
}
