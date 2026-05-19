import assert from 'assert';
import { readFileSync } from 'fs';

const routing = readFileSync('src/services/athena/routing.ts', 'utf8');
assert.ok(routing.includes('if (hasUrl) return true'));
assert.ok(!/if\s*\([^)]+\)\s*\n\s*return true;\s*\n\s*const scamKw/s.test(routing));

const classifier = readFileSync('src/services/athena/classifier.ts', 'utf8');
assert.ok(classifier.includes('HELP_CAPABILITIES_RE'));
const capMatch = classifier.match(
  /intent:\s*'capabilities',\s*keywords:\s*\/([^/]+)\//
);
assert.ok(capMatch && !/\bhelp\b/.test(capMatch[1]));

console.log('Athena routing checks passed.');
