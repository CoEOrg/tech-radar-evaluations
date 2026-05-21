#!/usr/bin/env node
/**
 * Copy generated/radar-data.json into website/static for Docusaurus.
 * Usage: node scripts/sync-radar-data.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import {REPO_ROOT} from './parse-entry.mjs';

const SRC = path.join(REPO_ROOT, 'generated', 'radar-data.json');
const DEST = path.join(REPO_ROOT, 'website', 'static', 'radar-data.json');

function main() {
  if (!fs.existsSync(SRC)) {
    console.error(
      `Missing ${path.relative(REPO_ROOT, SRC)} — run: npm run radar:data`,
    );
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(DEST), {recursive: true});
  fs.copyFileSync(SRC, DEST);
  console.log(
    `Synced ${path.relative(REPO_ROOT, SRC)} → ${path.relative(REPO_ROOT, DEST)}`,
  );
}

main();
