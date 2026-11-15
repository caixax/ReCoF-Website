// Refreshes data/recof-cvars.json, which the options page is built from, with the list ReCoF ships for its launcher.
// By default it takes the file from a ReCoF checkout next to this repository; pass a path or a URL to use another.
//
//   node scripts/sync-cvars.mjs                         (../ReCoF/tools/dist_extra/recof-cvars.json)
//   node scripts/sync-cvars.mjs https://raw.githubusercontent.com/caixax/ReCoF/main/tools/dist_extra/recof-cvars.json

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const from = process.argv[2] || join(ROOT, '..', 'ReCoF', 'tools', 'dist_extra', 'recof-cvars.json');

const text = /^https?:\/\//.test(from) ? await (await fetch(from)).text() : readFileSync(from, 'utf8');
const data = JSON.parse(text);
if (!Array.isArray(data.cvars) || data.cvars.some((c) => !c.name || !c.group || !c.label_en)) {
  console.error(`${from} is not a ReCoF option list`);
  process.exit(1);
}
writeFileSync(join(ROOT, 'data', 'recof-cvars.json'), JSON.stringify(data, null, 2) + '\n');
console.log(`data/recof-cvars.json: ${data.cvars.length} options from ${from}`);
