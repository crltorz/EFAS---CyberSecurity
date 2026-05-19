export type Intent =
  | 'sms_scam'
  | 'link_check'
  | 'account_security'
  | 'report_scam'
  | 'emergency'
  | 'gcash'
  | 'phishing_email'
  | 'otp'
  | 'investment_scam'
  | 'job_scam'
  | 'identity_theft'
  | 'greeting'
  | 'thanks'
  | 'capabilities'
  | 'general_scam'
  | 'what_is'
  | 'fallback';

export type AthenaConfidence = 'high' | 'medium' | 'low';

export type ClassifierMethod =
  | 'safety_regex'
  | 'intent_regex'
  | 'fallback';

export interface AthenaCitation {
  title: string;
  url: string;
}

export interface ClassifierResult {
  intent: Intent;
  confidence: AthenaConfidence;
  method: ClassifierMethod;
  citations: AthenaCitation[];
}

export const SAFETY_INTENTS: Intent[] = ['emergency', 'otp', 'report_scam'];

const intentMatchers: { intent: Intent; keywords: RegExp }[] = [
  {
    intent: 'greeting',
    keywords:
      /^\s*(hi+|hello+|hey+|yo|sup|kumusta|kamusta|musta|good\s*(morning|afternoon|evening|day)|magandang\s*(umaga|hapon|gabi))\b/i
  },
  {
    intent: 'thanks',
    keywords:
      /\b(thanks?|thank\s*you|thx|ty|salamat|maraming\s*salamat|appreciate)\b/i
  },
  {
    intent: 'emergency',
    keywords:
      /\b(emergency|urgent|asap|right\s*now|happening\s*now|(was|am|been|got|just|i'?ve\s*been)\s*scammed|i'?m\s*scammed|just\s*lost|lost\s+(?:\w+\s+){0,4}(money|pera|cash|savings|funds|account|bank|everything|all)|money\s*(got\s*)?(lost|gone|missing|stolen|taken|drained)|(was|were|got|has\s*been|have\s*been|been)\s*(taken|stolen|drained|wiped|swiped|robbed|withdrawn|debited|emptied|cleared|hacked|compromised)|(taken|stolen|drained|swiped|withdrawn|missing|gone|empty|emptied|hacked|compromised)\s+(out\s+of\s+|from\s+|in\s+|sa\s+)?(my\s+|aking\s+|akin\s+)?(gcash|maya|paymaya|bank|account|wallet|card|paypal|coins|savings)|unauthorized\s+(transaction|transfer|withdrawal|charge|debit|login|access)|someone\s+(took|stole|drained|emptied|withdrew|hacked|got\s+into|accessed)|gone\s*missing|nawalan|nawala\s*(ng\s*)?pera|stolen\s*(money|account)|nakawan|ninakaw|got\s*hacked|hacked\s*right\s*now|na[- ]?hack|hinack|took\s*my\s*(money|pera|account|savings|bank)|stole\s*(my|from|the)|drain(ed)?\s*(my\s*)?(account|bank|wallet|savings)|wiped\s*(out|clean)|empty\s*(my\s*)?(account|bank|wallet)|clicked\s+(a\s+|the\s+)?(link|url|sketch|something)|sent\s+(money|pera)\s+to|transferred\s+(money|funds|pera)|gave\s*(my|him|her|them)\s*(otp|mpin|password|details)|fell\s*for\s*(a\s*)?(scam|trick)|naloko|nagsend\s*ng\s*pera|tulungan|help\s*me\s*now|kailangan\s*tulong|dont\s*know\s*what\s*to\s*do|don'?t\s*know\s*what\s*to\s*do|what\s*(do|should|would|will)\s*i\s*do)\b/i
  },
  {
    intent: 'otp',
    keywords:
      /\b(otp|one[- ]?time[- ]?pass(word)?|verif(y|ication)\s*code|mpin|pin\s*code|6[- ]?digit|code\s*(sent|received|sa\s*phone))\b/i
  },
  {
    intent: 'gcash',
    keywords:
      /\b(gcash|g[- ]?cash|maya|paymaya|grabpay|grab\s*pay|coins\.ph|coins\s*ph|e[- ]?wallet|ewallet|mobile\s*wallet|mobile\s*money|cash[- ]?in|cash[- ]?out)\b/i
  },
  {
    intent: 'investment_scam',
    keywords:
      /\b(invest(ment|ing|or)?|crypto|bitcoin|btc|eth|trading|trader|double\s*(my|your)?\s*(money|pera)|guarantee(d)?\s*(return|profit|kita)|roi|ponzi|pyramid|hyip|forex|sure\s*(profit|kita|win)|paluwagan|mining\s*app)\b/i
  },
  {
    intent: 'job_scam',
    keywords:
      /\b(job\s*offer|work[- ]?from[- ]?home|wfh|easy\s*money|recruit(ment|er|ing)?|hiring|task\s*scam|like\s*(and\s*)?earn|telegram\s*(task|job)|whatsapp\s*(task|job)|part[- ]?time\s*(online|home)|trabaho|sideline)\b/i
  },
  {
    intent: 'identity_theft',
    keywords:
      /\b(identity\s*theft|stolen\s*identity|impersonat(e|ed|ing|ion)|account\s*takeover|someone\s*(using|pretending|posing)|posing\s*as|nag[- ]?gaya|ginaya|nag[- ]?pa[- ]?nood|hijacked|locked\s*out|cant\s*log\s*in)\b/i
  },
  {
    intent: 'sms_scam',
    keywords:
      /\b(sms|text\s*(message|msg)?|texted|smishing|forwarded\s*(message|msg)|random\s*(number|sender)|unknown\s*(number|sender)|got\s*a\s*(text|message)|nag[- ]?text|niloko\s*sa\s*text)\b/i
  },
  {
    intent: 'phishing_email',
    keywords:
      /\b(email|phish(ing)?|spam\s*mail|inbox|gmail|yahoo\s*mail|outlook|spoof(ed|ing)?|fake\s*sender|sender\s*address)\b/i
  },
  {
    intent: 'link_check',
    keywords:
      /\b(link|url|website|web\s*site|domain|click|bit\.ly|tinyurl|t\.co|https?:\/\/|www\.|\.com|\.ph|safe\s*to\s*click|fake\s*(site|page|url|link)|short(ened)?\s*link)\b/i
  },
  {
    intent: 'report_scam',
    keywords:
      /\b(report|file\s*a?\s*(complaint|case|report)|where\s*(to|do\s*i)\s*(go|report|file)|how\s*(to|do\s*i)\s*report|pnp[- ]?acg|acg|cybercrime|nbi|sumbong|magsumbong|denuncia|blotter)\b/i
  },
  {
    intent: 'account_security',
    keywords:
      /\b(secure|protect(ed|ion)?|safety|safeguard|harden|lock\s*down|password|passcode|2fa|two[- ]?factor|mfa|multi[- ]?factor|authentic(ate|ator)|biometric|fingerprint|face\s*id|account\s*safe|protect\s*my)\b/i
  },
  {
    intent: 'what_is',
    keywords:
      /\b(what\s*(is|are|does|do)|what'?s|whats|explain|tell\s*me\s*about|define|describe|how\s*(does|do)\s*(it|they|this)|what\s*kind|paano\s*(ang|ginagawa)|ano\s*(ang|yung|ito|to))\b/i
  },
  {
    intent: 'general_scam',
    keywords:
      /\b(scam(s|med|mer|ming)?|fraud(ulent)?|fake|suspicious|sketchy|dubious|phishing|fishy|peke|panloko|loko[- ]?loko|kawat|niloko|nagloko|legit|legitimate|real\s*or\s*fake|tama\s*ba|safe\s*ba)\b/i
  },
  {
    intent: 'capabilities',
    keywords:
      /\b(what\s*can\s*you\s*do|who\s*are\s*you|what\s*are\s*you|your\s*capabilit(y|ies)|your\s*feature|how\s*do\s*you\s*work|use\s*you|ano\s*ka|sino\s*ka|kaya\s*mo)\b/i
  }
];

const HELP_CAPABILITIES_RE = /\b(help|tulong)\b/i;
const SAFETY_BEFORE_HELP_RE =
  /\b(scam|fraud|hacked|stolen|naloko|emergency|urgent|otp|mpin|gcash|maya|bank|account|pera|nakaw|report)\b/i;

const OFF_TOPIC_RE =
  /\b(recipe|homework|weather|movie|football|write\s+(me\s+)?(an?\s+)?(essay|poem)|python\s+code|capital\s+of\s+\w+|horoscope|medical\s+advice)\b/i;

const CYBER_SCOPE_RE =
  /\b(scam|fraud|phish|hack|otp|mpin|gcash|maya|bank|account|cyber|security|sms|email|link|url|report|pnp|acg|wallet|suspicious|fake|pera|naloko|7726|2882)\b/i;

export function classifyIntent(text: string): Intent {
  for (const { intent, keywords } of intentMatchers) {
    if (keywords.test(text)) return intent;
  }
  if (HELP_CAPABILITIES_RE.test(text) && !SAFETY_BEFORE_HELP_RE.test(text)) {
    return 'capabilities';
  }
  return 'fallback';
}

export function isOffTopicMessage(text: string): boolean {
  return OFF_TOPIC_RE.test(text) && !CYBER_SCOPE_RE.test(text);
}

export function isCybersecurityInScope(text: string): boolean {
  return CYBER_SCOPE_RE.test(text) || classifyIntent(text) !== 'fallback';
}

export function detectLanguage(text: string): 'en' | 'tl' {
  const t = ' ' + text.toLowerCase() + ' ';
  const tagalogMarkers = [
    ' ang ',
    ' ng ',
    ' mga ',
    ' na ',
    ' sa ',
    ' ay ',
    ' ako ',
    ' ikaw ',
    ' siya ',
    ' kami ',
    ' kayo ',
    ' sila ',
    ' kasi ',
    ' kaya ',
    ' dahil ',
    ' kung ',
    ' pero ',
    ' hindi ',
    ' oo ',
    ' opo ',
    ' salamat ',
    ' kumusta ',
    ' kamusta ',
    ' ano ',
    ' sino ',
    ' paano ',
    ' bakit ',
    ' saan ',
    ' kailan ',
    ' gusto ',
    ' ayoko ',
    ' may ',
    ' wala ',
    ' meron ',
    ' ito ',
    ' iyan ',
    ' iyon ',
    ' dito ',
    ' doon ',
    ' yan ',
    ' yun ',
    ' eto ',
    ' tama ',
    ' mali ',
    ' walang ',
    ' marami ',
    ' pera ',
    ' kuwarta ',
    ' nakaw ',
    ' niloko ',
    ' naloko ',
    ' peke ',
    ' tulungan ',
    ' tulong ',
    ' nakawan ',
    ' ninakaw ',
    ' hinack ',
    ' pakitulungan ',
    ' pakipindot ',
    ' nakatanggap ',
    ' galing ',
    ' kanino ',
    ' magkano ',
    ' magreport ',
    ' nagdala ',
    ' ipinadala ',
    ' tatlo ',
    ' apat ',
    ' lima ',
    ' isang ',
    ' nasa ',
    ' parang ',
    ' bago ',
    ' luma ',
    ' bagong ',
    ' kayang ',
    ' pwede ',
    ' kahapon ',
    ' kaninang ',
    ' kanina ',
    ' bukas ',
    ' ngayon ',
    ' ngayong '
  ];

  let hits = 0;
  for (const marker of tagalogMarkers) {
    if (t.includes(marker)) hits++;
    if (hits >= 2) return 'tl';
  }
  return 'en';
}
