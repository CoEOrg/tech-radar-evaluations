#!/usr/bin/env node
/**
 * Validate a tech radar markdown entry (frontmatter, ring folder, headings, URLs).
 * Usage: node scripts/validate-entry.mjs <path> [path...]
 *        node scripts/validate-entry.mjs --all
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DATE_RE,
  GITHUB_USERNAME_RE,
  POC_REPO_PATTERN,
  QUADRANT_IDS,
  REQUIRED_FRONTMATTER,
  REQUIRED_HEADINGS,
  RINGS,
  STATUSES,
} from './radar-config.mjs';
import {
  collectAllEntries,
  extractH2Headings,
  parseFrontmatter,
  relativeRadarPath,
  ringFromPath,
  sectionContent,
} from './parse-entry.mjs';

const ENTRY_PATH_RE = /^radar\/(adopt|trial|assess|hold)\/[^/]+\.md$/;

const PLACEHOLDER_HEADING_SNIPPETS = [
  'One or two paragraphs describing',
  'Why we are evaluating or tracking this now',
  'Concrete scope: environment',
  'What met expectations',
  'What failed, was painful, or is not ready — do not skip',
  'Specific scenarios, constraints',
  'Anti-patterns, maturity gaps',
  'Name the people behind the PoC',
];

function isPlaceholderSection(text) {
  const normalized = text.toLowerCase();
  return PLACEHOLDER_HEADING_SNIPPETS.some((snippet) =>
    normalized.includes(snippet.toLowerCase()),
  );
}

export function validateEntry(filePath) {
  const errors = [];
  const relativePath = relativeRadarPath(filePath);

  if (!relativePath.endsWith('.md')) {
    errors.push('Entry must be a .md file');
    return errors;
  }

  if (path.basename(filePath) === 'entry-template.md') {
    errors.push('entry-template.md is not a publishable entry');
    return errors;
  }

  if (!ENTRY_PATH_RE.test(relativePath)) {
    errors.push(
      `Path must match radar/{adopt|trial|assess|hold}/<slug>.md (got ${relativePath})`,
    );
  }

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    errors.push(`Cannot read file: ${err.message}`);
    return errors;
  }

  const parsed = parseFrontmatter(content);
  if (parsed.error) {
    errors.push(parsed.error);
    return errors;
  }

  const { data, body } = parsed;
  const pathRing = ringFromPath(relativePath);

  for (const field of REQUIRED_FRONTMATTER) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      errors.push(`Missing required frontmatter field: ${field}`);
    }
  }

  if (typeof data.name !== 'string' || !data.name.trim()) {
    errors.push('name must be a non-empty string');
  }

  if (data.quadrant !== undefined && !QUADRANT_IDS.includes(data.quadrant)) {
    errors.push(
      `quadrant must be one of: ${QUADRANT_IDS.join(', ')} (got ${data.quadrant})`,
    );
  }

  if (data.ring !== undefined && !RINGS.includes(data.ring)) {
    errors.push(`ring must be one of: ${RINGS.join(', ')} (got ${data.ring})`);
  }

  if (pathRing && data.ring && data.ring !== pathRing) {
    errors.push(
      `ring in frontmatter (${data.ring}) must match folder (${pathRing})`,
    );
  }

  if (data.ring_changed !== undefined && !DATE_RE.test(String(data.ring_changed))) {
    errors.push('ring_changed must be ISO date YYYY-MM-DD');
  }

  if (data.status !== undefined && !STATUSES.includes(data.status)) {
    errors.push(`status must be one of: ${STATUSES.join(', ')} (got ${data.status})`);
  }

  if (data.poc_repo !== undefined) {
    const poc = String(data.poc_repo).trim();
    if (!POC_REPO_PATTERN.test(poc)) {
      errors.push(
        'poc_repo must be https://github.com/org/repo with no extra path segments',
      );
    }
  }

  if (data.owners !== undefined) {
    if (!Array.isArray(data.owners) || data.owners.length === 0) {
      errors.push('owners must be a non-empty array of GitHub usernames');
    } else {
      for (const owner of data.owners) {
        if (typeof owner !== 'string' || !GITHUB_USERNAME_RE.test(owner)) {
          errors.push(`Invalid GitHub username in owners: ${owner}`);
        }
      }
    }
  }

  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags)) {
      errors.push('tags must be an array of strings when present');
    } else {
      for (const tag of data.tags) {
        if (typeof tag !== 'string' || !tag.trim()) {
          errors.push('tags must contain non-empty strings');
        }
      }
    }
  }

  const headings = extractH2Headings(body);
  for (const required of REQUIRED_HEADINGS) {
    if (!headings.includes(required)) {
      errors.push(`Missing required heading: ## ${required}`);
    }
  }

  const didnt = sectionContent(body, "What didn't");
  if (!didnt) {
    errors.push("Section ## What didn't must not be empty");
  } else if (isPlaceholderSection(didnt)) {
    errors.push("Section ## What didn't must not use template placeholder text");
  }

  return errors;
}

function main() {
  const args = process.argv.slice(2);
  let files;

  if (args.length === 0) {
    console.error('Usage: node scripts/validate-entry.mjs <path> [path...] | --all');
    process.exit(1);
  }

  if (args.length === 1 && args[0] === '--all') {
    files = collectAllEntries();
    if (files.length === 0) {
      console.error('No entries found under radar/{adopt,trial,assess,hold}/');
      process.exit(1);
    }
  } else {
    files = args.map((arg) => path.resolve(process.cwd(), arg));
  }

  let failed = false;

  for (const file of files) {
    const errors = validateEntry(file);
    if (errors.length === 0) {
      console.log(`OK ${relativeRadarPath(file)}`);
      continue;
    }
    failed = true;
    console.error(`FAIL ${relativeRadarPath(file)}`);
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
  }

  process.exit(failed ? 1 : 0);
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  main();
}
