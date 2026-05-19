// Password strength evaluator — entropy-based scoring with practical checks.
// Grounded in NIST SP 800-63B (Digital Identity Guidelines) recommendations:
// length matters most, composition rules matter less, blocklist matters a lot.
// Reference: https://pages.nist.gov/800-63-3/sp800-63b.html

export type PasswordStrength = {
  password: string;
  score: 0 | 1 | 2 | 3 | 4; // 0 very weak → 4 strong
  band: 'very weak' | 'weak' | 'fair' | 'strong' | 'excellent';
  bandColor: 'red' | 'orange' | 'amber' | 'emerald' | 'cyan';
  estimatedCrackTime: string;
  entropyBits: number;
  length: number;
  checks: {
    label: string;
    passed: boolean;
    detail?: string;
  }[];
  suggestions: string[];
};

// Common-password blocklist (top patterns from breach corpora — abbreviated for size).
// Real-world products use 100k+ entry lists. This is a representative sample.
const COMMON_PASSWORDS = new Set([
'123456',
'12345678',
'123456789',
'1234567890',
'qwerty',
'qwerty123',
'password',
'password1',
'password123',
'admin',
'admin123',
'letmein',
'welcome',
'welcome1',
'iloveyou',
'monkey',
'dragon',
'sunshine',
'princess',
'1234',
'12345',
'111111',
'000000',
'654321',
'abc123',
'qazwsx',
'asdfgh',
'zxcvbn',
'football',
'baseball',
'master',
// PH-specific common patterns
'pilipinas',
'philippines',
'manila',
'pinoy',
'pinas',
'mahal',
'pasalubong',
'lakas',
'gcash',
'gcash123',
'pasaload']
);

// Common date / year patterns that scammers / brute forcers try first
function hasObviousDatePattern(pw: string): boolean {
  // 4-digit year 1900-2099
  if (/\b(19|20)\d{2}\b/.test(pw)) return true;
  // Common date formats MMDDYYYY, DDMMYYYY
  if (/^\d{6,8}$/.test(pw)) return true;
  return false;
}

function poolSize(pw: string): number {
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 33; // typical printable symbols
  return pool || 1;
}

function formatCrackTime(seconds: number): string {
  if (seconds < 1) return 'instantly';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000 * 1e6)
  return `${Math.round(seconds / 31536000 / 1000)} thousand years`;
  if (seconds < 31536000 * 1e9)
  return `${Math.round(seconds / 31536000 / 1e6)} million years`;
  return 'effectively forever';
}

export function evaluatePassword(password: string): PasswordStrength {
  const pw = password ?? '';
  const length = pw.length;
  const lower = pw.toLowerCase();

  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasDigit = /[0-9]/.test(pw);
  const hasSymbol = /[^a-zA-Z0-9]/.test(pw);
  const isCommon = COMMON_PASSWORDS.has(lower);
  const isOnlyDigits = /^\d+$/.test(pw);
  const hasRepeats = /(.)\1{2,}/.test(pw); // aaa, 111
  const hasSequence =
  /(?:abcd|bcde|cdef|defg|1234|2345|3456|4567|5678|6789|qwer|wert|asdf)/i.test(
    pw
  );
  const hasDate = hasObviousDatePattern(pw);

  // Entropy = length * log2(poolSize), reduced for known weaknesses
  let entropyBits = length * Math.log2(poolSize(pw));
  if (isCommon) entropyBits = Math.min(entropyBits, 10);
  if (hasRepeats) entropyBits *= 0.7;
  if (hasSequence) entropyBits *= 0.7;
  if (hasDate && length <= 10) entropyBits *= 0.7;

  // Cracking model: 10 billion guesses per second (a modern GPU farm)
  const guessesPerSecond = 1e10;
  const totalGuesses = Math.pow(2, entropyBits);
  const crackSeconds = totalGuesses / guessesPerSecond / 2; // average half the keyspace
  const estimatedCrackTime = formatCrackTime(crackSeconds);

  let score: 0 | 1 | 2 | 3 | 4;
  let band: PasswordStrength['band'];
  let bandColor: PasswordStrength['bandColor'];

  if (length === 0) {
    score = 0;
    band = 'very weak';
    bandColor = 'red';
  } else if (isCommon || length < 6 || isOnlyDigits && length < 10) {
    score = 0;
    band = 'very weak';
    bandColor = 'red';
  } else if (entropyBits < 28) {
    score = 1;
    band = 'weak';
    bandColor = 'orange';
  } else if (entropyBits < 50) {
    score = 2;
    band = 'fair';
    bandColor = 'amber';
  } else if (entropyBits < 75) {
    score = 3;
    band = 'strong';
    bandColor = 'emerald';
  } else {
    score = 4;
    band = 'excellent';
    bandColor = 'cyan';
  }

  const checks = [
  {
    label: 'At least 12 characters long',
    passed: length >= 12,
    detail: `Currently ${length} characters`
  },
  {
    label: 'Contains lowercase letters',
    passed: hasLower
  },
  {
    label: 'Contains uppercase letters',
    passed: hasUpper
  },
  {
    label: 'Contains numbers',
    passed: hasDigit
  },
  {
    label: 'Contains symbols (!@#$ etc.)',
    passed: hasSymbol
  },
  {
    label: 'Not on common-password blocklist',
    passed: !isCommon,
    detail: isCommon ?
    'This password appears in breach databases' :
    undefined
  },
  {
    label: 'No obvious sequences (1234, qwer)',
    passed: !hasSequence
  },
  {
    label: 'No repeated characters (aaa, 111)',
    passed: !hasRepeats
  },
  {
    label: 'No obvious date / year',
    passed: !hasDate
  }];


  const suggestions: string[] = [];
  if (length < 12)
  suggestions.push(
    'Make it at least 12 characters — length matters more than complexity.'
  );
  if (!hasUpper || !hasLower)
  suggestions.push('Mix uppercase and lowercase letters.');
  if (!hasDigit) suggestions.push('Add a few numbers in non-obvious positions.');
  if (!hasSymbol) suggestions.push('Add at least one symbol like ! @ # $ % &.');
  if (isCommon)
  suggestions.push(
    'This password is too common — pick something nobody would guess.'
  );
  if (hasSequence)
  suggestions.push('Avoid keyboard sequences like 1234 or qwer.');
  if (hasRepeats)
  suggestions.push('Avoid repeating the same character three or more times.');
  if (hasDate)
  suggestions.push(
    'Avoid birthdays, anniversaries, or 4-digit years — these are tried first.'
  );
  if (score >= 3 && suggestions.length === 0)
  suggestions.push(
    'Strong password. Use it only on one account, never reuse it elsewhere.'
  );
  if (score === 4)
  suggestions.push(
    'Excellent. Consider storing it in a password manager like Bitwarden so you do not need to memorize it.'
  );

  return {
    password: pw,
    score,
    band,
    bandColor,
    estimatedCrackTime,
    entropyBits: Math.round(entropyBits * 10) / 10,
    length,
    checks,
    suggestions
  };
}