/**
 * Scans src/data for https?:// URLs and reports HTTP status.
 * Usage: node scripts/check-links.mjs [--fail-on-error]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataDir = path.join(root, 'src', 'data');
const failOnError = process.argv.includes('--fail-on-error');

const urlRegex = /https?:\/\/[^\s"'<>\\)]+/g;

function collectUrlsFromFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const matches = text.match(urlRegex) ?? [];
  return matches.map((u) => u.replace(/[.,;]+$/, ''));
}

async function head(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'EFAS-LinkChecker/1.0' }
    });
    return res.status;
  } catch {
    try {
      const res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        redirect: 'follow',
        headers: { 'User-Agent': 'EFAS-LinkChecker/1.0' }
      });
      return res.status;
    } catch {
      return 0;
    }
  } finally {
    clearTimeout(timeout);
  }
}

const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.ts'));
const urlSet = new Set();
for (const file of files) {
  for (const u of collectUrlsFromFile(path.join(dataDir, file))) {
    urlSet.add(u);
  }
}

const urls = [...urlSet].sort();
console.log(`Checking ${urls.length} unique URLs...\n`);

let failures = 0;
for (const url of urls) {
  const status = await head(url);
  const ok = status >= 200 && status < 400;
  const label = ok ? 'OK' : 'FAIL';
  console.log(`${label} ${status || 'ERR'}\t${url}`);
  if (!ok) failures++;
}

console.log(`\n${failures} failure(s) of ${urls.length} URLs.`);
if (failOnError && failures > 0) process.exit(1);
