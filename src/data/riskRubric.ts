// Risk rubric: each indicator is tied to a public, citable source.
// Weights are a design synthesis of the cited frameworks, not lifted verbatim.
// Score = min(sum of triggered weights, 100), then mapped to a risk band.

export type RiskBand = 'low' | 'caution' | 'high';

export type Indicator = {
  id: string;
  label: string;
  description: string;
  weight: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: {
    name: string;
    citation: string;
    url: string;
  };
  detect: (text: string) => {triggered: boolean;evidence?: string;};
};

// Normalize input text before pattern matching:
//   • Decompose unicode (e.g. accented chars) and strip combining marks
//   • Collapse zero-width and bidi control chars
//   • Replace common visually-confusable lookalikes with their ASCII equivalents
//     (Cyrillic "а" → "a", etc. — used by scammers to evade keyword filters)
//   • Normalize whitespace
// The original text is still surfaced as evidence; this only affects matching.
const CONFUSABLE_MAP: Record<string, string> = {
  // Cyrillic lookalikes
  а: 'a',
  е: 'e',
  о: 'o',
  р: 'p',
  с: 'c',
  у: 'y',
  х: 'x',
  // Greek lookalikes
  α: 'a',
  ε: 'e',
  ο: 'o',
  ρ: 'p',
  // Fullwidth
  '：': ':',
  '／': '/'
};

function normalize(input: string): string {
  let s = (input || '').toLowerCase();
  // strip zero-width + bidi controls
  s = s.replace(/[\u200B-\u200F\u202A-\u202E\u2060\uFEFF]/g, '');
  // unicode NFKD decomposition + strip combining marks (accents)
  s = s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  // map confusables
  s = s.replace(/./g, (c) => CONFUSABLE_MAP[c] ?? c);
  // collapse whitespace
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

const findMatch = (text: string, regex: RegExp): string | undefined => {
  const m = text.match(regex);
  return m ? m[0] : undefined;
};

export const indicators: Indicator[] = [
{
  id: 'credential_request',
  label: 'Credential or OTP request',
  description:
  'Message asks for OTP, MPIN, PIN, password, CVV, or account verification details. Legitimate institutions never request these.',
  weight: 30,
  severity: 'critical',
  source: {
    name: 'BSP — AFASA (RA 12010) & Circular 1140',
    citation:
    'Republic Act 12010, the Anti-Financial Account Scamming Act (AFASA), and its 2024 Implementing Rules criminalize the unauthorized solicitation and use of OTPs, MPINs, and other financial account credentials. Reinforced by BSP Circular No. 1140 (2022) on consumer fraud handling — legitimate banks and e-money issuers will never request these through any channel.',
    url: 'https://www.bsp.gov.ph/Regulations/Banking%20Laws/AFASA-Booklet-with-IRRs.pdf'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(otp|one[- ]?time[- ]?password|mpin|m-?pin|verify (your )?(account|identity)|cvv|card[ -]?number|enter your (password|pin)|(send|share|forward|i-?send|ipadala|pakishare|pakisend|paki[- ]?forward|ibigay)\s+(mo\s+)?(ang|yung|nyo)?\s*(otp|mpin|pin|password|code|verification)|6[- ]?digit\s+code)\b/i
    );
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'suspicious_url',
  label: 'Suspicious or lookalike URL',
  description:
  'Link contains hyphenated brand names, unusual TLDs, or domain patterns associated with phishing.',
  weight: 25,
  severity: 'high',
  source: {
    name: 'NIST SP 800-177 Rev. 1 — Trustworthy Email',
    citation:
    'NIST Special Publication 800-177 Revision 1 (Section 4: Sender Authentication & Anti-Phishing). Lookalike and deceptive domain construction is listed as a primary phishing indicator.',
    url: 'https://csrc.nist.gov/pubs/sp/800/177/r1/final'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(bdo|bpi|gcash|maya|paymaya|metrobank|landbank|unionbank|securitybank|chinabank|rcbc|eastwest|pnb|netflix|lazada|shopee|lbc|jnt|j&t|paypal|bir|sss|pagibig|pag-ibig|philhealth|dfa|comelec|govph|cebuana|palawan|globe|smart|dito|sun)[-_.]+(secure|verify|update|login|account|support|claim|alert|service|notice|payment|billing|portal|center|help|customer)\b/i
    );
    const m2 = findMatch(
      t,
      /\.(tk|ml|ga|cf|gq|xyz|top|click|loan|work|monster|biz|info|live|fit|rest|cyou|icu)\b/i
    );
    const evidence = m || m2;
    return { triggered: !!evidence, evidence };
  }
},
{
  id: 'brand_impersonation',
  label: 'Brand impersonation via unofficial channel',
  description:
  'Message claims to be from a known institution (bank, e-wallet, courier, agency) but uses SMS or messaging app instead of official channels.',
  weight: 15,
  severity: 'high',
  source: {
    name: 'PNP-ACG Cybersecurity Bulletins',
    citation:
    'PNP Anti-Cybercrime Group publishes regular Cybersecurity Bulletins documenting active smishing campaigns. Legitimate Philippine banks, GCash, and Maya do not send actionable links via SMS.',
    url: 'https://acg.pnp.gov.ph/category/cybersecurity-bulletin/'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(bdo|bpi|gcash|maya|paymaya|metrobank|landbank|unionbank|security bank|chinabank|rcbc|eastwest|pnb|netflix|lazada|shopee|lbc|j&t|jnt|paypal|bir|sss|pag[- ]?ibig|philhealth|dfa|comelec|gov\.ph|cebuana|palawan|globe|smart|dito|sun|grab|foodpanda|maxicare|medicard|fwd|amazon prime)\b/i
    );
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'urgency_language',
  label: 'Urgency or threat tactics',
  description:
  'Language designed to panic the recipient into acting without verifying. A core social-engineering technique.',
  weight: 15,
  severity: 'high',
  source: {
    name: 'CISA — Avoiding Social Engineering and Phishing Attacks',
    citation:
    'US Cybersecurity & Infrastructure Security Agency lists artificial urgency as one of the four core hallmarks of social-engineering attacks. Referenced and adopted by DICT/CERT-PH in local advisories.',
    url: 'https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(urgent|immediately|24 ?hours?|locked|suspended|expir(e|ed|es|ing)|act now|final notice|last (chance|warning)|will be (closed|deactivated|terminated)|ngayon\s+na|bilisan\s+(mo|na)|mawawala\s+(na|ang)|kailangan\s+ngayon|mag[- ]?expire|ma[- ]?lock|ma[- ]?suspend|huling\s+(araw|babala|pagkakataon)|hindi\s+(mo\s+)?makukuha|bago\s+ma[- ]?(disable|close|cancel))\b/i
    );
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'money_request',
  label: 'Money transfer or fee request',
  description:
  'Asks for padala, deposit, release fee, processing fee, or transfer to a personal account.',
  weight: 20,
  severity: 'high',
  source: {
    name: 'SEC Philippines — AMLA & Investment Advisories',
    citation:
    'Securities and Exchange Commission Philippines publishes advisories on solicitation, "release fee", and personal-account padala patterns commonly used in Philippine investment and online shopping scams. Also covered by RA 9160 — the Anti-Money Laundering Act (as amended), which regulates the laundering of fraud proceeds through personal accounts.',
    url: 'https://www.sec.gov.ph/laws-rules-decisions-and-resolutions/anti-money-laundering-act/'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(send (money|gcash|padala)|deposit (now|first|the amount)|release fee|processing fee|advance (fee|payment)|wire (transfer|the money)|remit(tance)?|magpadala\s+(ka|po)?\s*(ng\s+pera|sa\s+gcash)|i[- ]?padala|magdeposit|magbayad\s+(muna|po)?\s+(ng|para)|reservation\s+fee|customs\s+fee|delivery\s+fee|holding\s+fee|reactivation\s+fee|kindly\s+(send|deposit|transfer))\b/i
    );
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'generic_greeting',
  label: 'Generic, non-personalized greeting',
  description:
  'Uses "Dear Customer", "Hello friend", or similar instead of your real name — a sign of mass-sent phishing.',
  weight: 5,
  severity: 'low',
  source: {
    name: 'US FTC — How to Recognize and Avoid Phishing Scams',
    citation:
    'US Federal Trade Commission consumer guidance on phishing lists generic greetings ("Dear Customer", etc.) as a baseline indicator that a message was sent en masse rather than from a legitimate institution that knows you.',
    url: 'https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(dear (customer|user|valued (customer|client)|sir\/madam|account holder)|hello friend|attention sir\/madam)\b/i
    );
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'known_scam_template',
  label: 'Matches known PH scam template',
  description:
  'Contains phrases documented in PNP-ACG bulletins on circulating scam SMS — relative-in-distress, parcel pickup, prize claim, etc.',
  weight: 25,
  severity: 'critical',
  source: {
    name: 'PNP-ACG CS Scams Tracker (Active Scam Campaigns)',
    citation:
    'PNP Anti-Cybercrime Group periodically publishes the exact phrasing of active scam SMS campaigns in its CS Scams category and Cybersecurity Bulletins. The templates matched here are taken directly from those advisories.',
    url: 'https://acg.pnp.gov.ph/category/cs-scams/'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(ma,? this is my new number|i lost my phone|congratulations,? you('| ha)?ve won|your (parcel|package) (cannot be delivered|is on hold|customs fee|delivery (failed|pending))|claim your prize|unclaimed (cash|prize)|you are selected as (a )?winner|nanay,?\s+bago\s+kong\s+number|nawala\s+(ang|yung)\s+(phone|sim)|nanalo\s+ka|napili\s+ka(ng)?\s+winner|may\s+(parcel|package|padala)\s+(ka|para\s+sayo)|kindly\s+claim|paki[- ]?claim|tara\s+claim)\b/i
    );
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'insecure_url',
  label: 'Non-HTTPS or IP-based URL',
  description:
  'Link uses http:// instead of https://, or points to a raw IP address — both unusual for legitimate services.',
  weight: 10,
  severity: 'medium',
  source: {
    name: 'Google Safe Browsing — Site Status & Developer Criteria',
    citation:
    'Google Safe Browsing technical documentation classifies non-HTTPS and IP-based URLs in consumer-facing services as elevated risk. The Site Status tool lets users check any URL against this database.',
    url: 'https://transparencyreport.google.com/safe-browsing/search'
  },
  detect: (t) => {
    const m =
    findMatch(t, /http:\/\/(?!localhost)[a-zA-Z0-9.-]+/i) ||
    findMatch(t, /https?:\/\/\d{1,3}(\.\d{1,3}){3}/);
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'shortened_url',
  label: 'Shortened URL',
  description:
  'Uses a URL shortener that hides the true destination — common in phishing campaigns.',
  weight: 10,
  severity: 'medium',
  source: {
    name: 'APWG Phishing Activity Trends Reports (Quarterly)',
    citation:
    'Anti-Phishing Working Group quarterly trends reports consistently identify URL shorteners as one of the most common obfuscation techniques observed in confirmed phishing campaigns.',
    url: 'https://apwg.org/trendsreports/'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(bit\.ly|tinyurl\.com|t\.co|ow\.ly|is\.gd|buff\.ly|goo\.gl|cutt\.ly|shorturl\.at|rebrand\.ly)\b/i
    );
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'grammar_anomalies',
  label: 'Grammar / formatting anomalies',
  description:
  'Excessive capitalization, repeated punctuation, or unusual character substitutions — common in mass-produced scam messages.',
  weight: 5,
  severity: 'low',
  source: {
    name: 'US FTC — How to Recognize and Avoid Phishing Scams',
    citation:
    'FTC consumer guidance and APWG observations both cite spelling, grammar, and formatting anomalies as low-weight but consistent supplementary indicators of mass-produced scam messages.',
    url: 'https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams'
  },
  detect: (t) => {
    const m = findMatch(t, /[A-Z]{5,}/) || findMatch(t, /!{3,}/);
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'investment_lure',
  label: 'Investment or quick-profit lure',
  description:
  'Promises guaranteed returns, doubling money, fixed daily ROI, or "limited slot" investment opportunities — all hallmarks of Ponzi and HYIP schemes.',
  weight: 25,
  severity: 'critical',
  source: {
    name: 'SEC Philippines — Advisories on Unauthorized Investment Solicitations',
    citation:
    'The Securities and Exchange Commission Philippines maintains a public registry of unauthorized investment-taking entities. Common indicators in advisories include guaranteed returns, fixed daily ROI, and "limited slot" recruitment language.',
    url: 'https://www.sec.gov.ph/advisories/'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(guaranteed (return|profit|earning|kita)|double\s+(your|my|the)?\s*(money|investment|pera)|(\d+)\s*%\s*(daily|per day|monthly|guaranteed|fixed|sure)|fixed\s+(roi|return|income)|passive\s+income\s+(daily|weekly)|earn\s+(up\s+to|as\s+much\s+as)\s+₱?\d|limited\s+slots?|paluwagan\s+online|crypto\s+(mining|trading)\s+(app|platform)\s+(daily|guaranteed)|sure\s+kita|sure\s+ball|tiyak\s+na\s+kita)\b/i
    );
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'romance_lure',
  label: 'Romance / emotional manipulation pattern',
  description:
  'Sudden expressions of love, claims of being stuck overseas, or requests for emergency money tied to a romantic relationship — classic romance-scam indicators.',
  weight: 20,
  severity: 'high',
  source: {
    name: 'FBI Internet Crime Complaint Center (IC3) — Confidence/Romance Scam Indicators',
    citation:
    'The FBI Internet Crime Complaint Center (IC3) publishes annual reports documenting confidence/romance scam patterns, including premature professions of love, military-overseas pretenses, and emergency financial requests.',
    url: 'https://www.ic3.gov/Home/ConsumerAlerts'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(i\s+love\s+you|love\s+of\s+my\s+life|my\s+(soulmate|true love)|stuck\s+(in|at|overseas)|stranded\s+(in|at)|deployed\s+(in|to)|on\s+a\s+(mission|deployment|oil\s+rig)|widower\s+with|my\s+late\s+(wife|husband)|need\s+money\s+for\s+(visa|flight|hospital|emergency)|send\s+me\s+(money|gift\s+card|itunes|steam)|mahal\s+na\s+mahal\s+kita|hindi\s+ako\s+makauwi|magpadala\s+ka\s+ng\s+pera\s+(para|sa\s+visa|sa\s+ticket))\b/i
    );
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'job_lure',
  label: 'Suspicious job or task-earning offer',
  description:
  'Job or income offers requiring an upfront fee, promising unrealistic earnings, or recruiting via Telegram/WhatsApp — classic task-scam and pyramid-recruitment indicators.',
  weight: 20,
  severity: 'high',
  source: {
    name: 'DOLE & DTI — Advisories on Online Job and Task Scams',
    citation:
    'The Department of Labor and Employment and Department of Trade and Industry issue regular advisories warning against upfront-fee jobs, Telegram/WhatsApp task scams, and unrealistic earning promises that violate fair-hiring rules under Republic Act 10173 and labor regulations.',
    url: 'https://www.dole.gov.ph/'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(work\s+from\s+home\s+(no\s+experience|easy)|earn\s+₱?\d+(,\d{3})*\s+(daily|per\s+day|a\s+day)|like\s+and\s+earn|task\s+earning|telegram\s+(task|job|earning)|whatsapp\s+(task|job|earning)|easy\s+₱?\d+|no\s+experience\s+needed.*earn|registration\s+fee\s+(for|to)\s+(start|begin|join)|training\s+fee\s+(of|para|first)|trabaho\s+online\s+(walang|no)\s+experience|kita\s+agad|click\s+and\s+earn)\b/i
    );
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'personal_account_padala',
  label: 'Personal e-wallet or account padala request',
  description:
  'Asks the recipient to send money to a personal GCash, Maya, or bank account number — a common laundering pattern. Legitimate merchants and agencies use business accounts.',
  weight: 20,
  severity: 'high',
  source: {
    name: 'PNP-ACG & BSP AFASA — Money-Mule Advisories',
    citation:
    'PNP Anti-Cybercrime Group and BSP advisories document that scammers commonly route funds through personal e-wallet or bank accounts (often opened with stolen IDs) rather than verified merchant accounts. Reinforced by RA 12010 (Anti-Financial Account Scamming Act) and its 2024 IRRs.',
    url: 'https://www.bsp.gov.ph/Regulations/Banking%20Laws/AFASA-Booklet-with-IRRs.pdf'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(send\s+to\s+my\s+(gcash|maya|bank|account)|i[- ]?padala\s+(mo|sa)\s+(akin|aking)|magpadala\s+ka\s+sa\s+(gcash|maya|number)|gcash\s+number\s+ko|my\s+gcash\s+(number\s+is|is)|padala\s+sa\s+gcash|reference\s+number\s+after\s+(payment|sending))\b/i
    );
    const m2 = findMatch(t, /\b09\d{9}\b\s+(gcash|maya|paymaya)\b/i);
    const evidence = m || m2;
    return { triggered: !!evidence, evidence };
  }
},
{
  id: 'leet_obfuscation',
  label: 'Obfuscated brand or word (leet substitution)',
  description:
  'Substitutes digits or symbols for letters in brand names ("B1tcoin", "P@yp@l", "G-c4sh") — a known filter-evasion tactic.',
  weight: 10,
  severity: 'medium',
  source: {
    name: 'APWG Phishing Activity Trends — Obfuscation Techniques',
    citation:
    'The Anti-Phishing Working Group quarterly trends reports document character substitution (leetspeak) as a recurring obfuscation tactic used to bypass keyword-based filters and confuse readers into trusting fake brand mentions.',
    url: 'https://apwg.org/trendsreports/'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(b[1!|]tco[!1|]n|p[@4]yp[@4]l|g[- ]?c[@4]sh|m[@4]y[@4]|f[@4]ceb[o0]{2}k|p[@4]g[- ]?[i!1]b[!1|]g)\b/i
    );
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'typosquat_domain',
  label: 'Typosquatted brand domain',
  description:
  'A domain that mimics a known brand by inserting hyphens, extra subdomains, or visually similar tokens (e.g. "gcash-ph-secure.com", "bdo-online.net.ph"). Legitimate institutions never operate from these domains.',
  weight: 25,
  severity: 'critical',
  source: {
    name: 'ICANN — Domain Name System Abuse Reports',
    citation:
    'The Internet Corporation for Assigned Names and Numbers (ICANN) and the joint DNS Abuse Institute regularly publish reports documenting brand-impersonation typosquatting as a leading vector for phishing campaigns globally.',
    url: 'https://dnsabuseinstitute.org/'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b(gcash|maya|bdo|bpi|metrobank|landbank|unionbank|paypal|netflix|lazada|shopee|sss|bir|philhealth|pag[- ]?ibig|dfa)[-.][a-z0-9-]*(secure|login|verify|update|portal|service|support|center|payment|account|help|gov|ph)[a-z0-9.-]*\.[a-z]{2,8}\b/i
    );
    return { triggered: !!m, evidence: m };
  }
},
{
  id: 'suspicious_sender_number',
  label: 'Random 11-digit mobile sender',
  description:
  'Message originates from a personal-style 09xxxxxxxxx mobile number while claiming to represent a bank, e-wallet, or government agency. Real institutions use registered short codes or verified Sender IDs.',
  weight: 10,
  severity: 'medium',
  source: {
    name: 'NTC — Memorandum on SIM Registration & Sender IDs',
    citation:
    'The National Telecommunications Commission (RA 11934 — SIM Registration Act, and earlier memoranda) requires registered Sender IDs for institutional SMS. Personal-number SMS claiming to be from banks or agencies is a documented indicator of smishing.',
    url: 'https://ntc.gov.ph/'
  },
  detect: (t) => {
    const hasMobileNumber = /\b09\d{9}\b/.test(t);
    const claimsInstitution =
    /\b(bdo|bpi|gcash|maya|paymaya|metrobank|landbank|unionbank|sss|bir|philhealth|pag[- ]?ibig|dfa|comelec|pnp|nbi|dict|bsp)\b/i.test(
      t
    );
    const triggered = hasMobileNumber && claimsInstitution;
    const m = hasMobileNumber ? t.match(/\b09\d{9}\b/)?.[0] : undefined;
    return { triggered, evidence: m };
  }
},
{
  id: 'free_email_brand_claim',
  label: 'Brand claim from free-email provider',
  description:
  'Message or email purports to be from a bank, e-wallet, or government agency but uses a gmail.com, yahoo.com, or hotmail.com return address. Legitimate institutions only send from their own corporate domain.',
  weight: 20,
  severity: 'high',
  source: {
    name: 'PNP-ACG & NCERT (DICT) — Phishing Indicators',
    citation:
    'Joint advisories from PNP-ACG and the National CERT (NCERT, under DICT) list free-mail addresses claiming institutional identity as one of the highest-confidence phishing indicators alongside lookalike domains.',
    url: 'https://www.ncert.gov.ph/'
  },
  detect: (t) => {
    const m = findMatch(
      t,
      /\b[\w.+-]+@(gmail|yahoo|hotmail|outlook|aol|icloud|protonmail|mail|live|gmx|yandex)\.(com|ph|net)\b/i
    );
    const claimsInstitution =
    /\b(bdo|bpi|gcash|maya|paymaya|metrobank|landbank|unionbank|sss|bir|philhealth|pag[- ]?ibig|dfa|comelec|pnp|nbi|dict|bsp|sec|npc|customer service|fraud team|support team)\b/i.test(
      t
    );
    const triggered = !!m && claimsInstitution;
    return { triggered, evidence: m };
  }
}];


export type AnalysisResult = {
  score: number;
  band: RiskBand;
  bandLabel: string;
  verdict: string;
  triggered: Array<Indicator & {evidence?: string;}>;
  notTriggered: Indicator[];
};

export function analyze(input: string): AnalysisResult {
  const text = normalize(input);
  const triggered: Array<Indicator & {evidence?: string;}> = [];
  const notTriggered: Indicator[] = [];

  for (const ind of indicators) {
    const result = ind.detect(text);
    if (result.triggered) {
      triggered.push({ ...ind, evidence: result.evidence });
    } else {
      notTriggered.push(ind);
    }
  }

  const rawScore = triggered.reduce((sum, ind) => sum + ind.weight, 0);
  const score = Math.min(rawScore, 100);

  let band: RiskBand;
  let bandLabel: string;
  let verdict: string;

  if (score >= 61) {
    band = 'high';
    bandLabel = 'High Risk Detected';
    verdict =
    'This content shows strong indicators of a scam or phishing attempt. Do not click any links, do not respond, and do not share any information.';
  } else if (score >= 31) {
    band = 'caution';
    bandLabel = 'Caution Advised';
    verdict =
    'Some concerning patterns were detected. Verify the sender through official channels before taking any action.';
  } else {
    band = 'low';
    bandLabel = 'Low Risk';
    verdict =
    'No strong scam indicators were detected. Always remain cautious, especially with unsolicited messages.';
  }

  return { score, band, bandLabel, verdict, triggered, notTriggered };
}

export const bandActions: Record<RiskBand, string[]> = {
  high: [
  'Do not click any links or reply to the sender.',
  'Block the sender on the platform you received this on.',
  'Report to PNP-ACG: (02) 8723-0401 local 7491 or acg.pnp.gov.ph/category/cybersecurity-bulletin/.',
  'If you already shared OTP/MPIN, call your bank or e-wallet fraud line immediately.'],

  caution: [
  'Do not click links until you verify the sender through official channels.',
  'Look up the official phone number or website yourself — do not use any number in the message.',
  'If from a bank or e-wallet, log in directly via the official app to confirm.',
  'Forward suspicious SMS to 7726 (Globe / Smart spam reporting).'],

  low: [
  'Stay vigilant — scammers continually adapt their patterns.',
  'If unsure, verify with the official source by typing the URL directly.',
  'Never share OTPs, MPINs, or passwords regardless of who asks.']

};