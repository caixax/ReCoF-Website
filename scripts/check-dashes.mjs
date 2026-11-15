// Fails when a file under the given files or folders contains an em dash or an en dash.
//   node scripts/check-dashes.mjs content assets README.md

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const EM = String.fromCharCode(0x2014);
const EN = String.fromCharCode(0x2013);
const TEXT = /\.(md|html|css|js|mjs|json|yml|yaml|conf|sh|txt|svg)$/;

function files(p) {
  if (!statSync(p, { throwIfNoEntry: false })) return [];
  if (!statSync(p).isDirectory()) return [p];
  return readdirSync(p).flatMap((n) => files(join(p, n)));
}

const bad = [];
for (const file of process.argv.slice(2).flatMap(files)) {
  if (!TEXT.test(file)) continue;
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (line.includes(EM) || line.includes(EN)) bad.push(`${file}:${i + 1}`);
    });
}
if (bad.length > 0) {
  console.error('Em dashes or en dashes are not allowed. Found in:');
  for (const b of bad) console.error('  ' + b);
  process.exit(1);
}
