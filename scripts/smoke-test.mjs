#!/usr/bin/env node
/**
 * Local CI smoke test: invalid entry must fail validation, valid entry must pass.
 * Usage: node scripts/smoke-test.mjs [--build]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { validateEntry } from './validate-entry.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const INVALID_REL = 'radar/trial/__smoke-invalid.md';
const INVALID_PATH = path.join(repoRoot, INVALID_REL);
const VALID_REL = 'radar/trial/litellm.md';
const VALID_PATH = path.join(repoRoot, VALID_REL);

const INVALID_CONTENT = `---
name: Smoke Test Invalid
quadrant: not-a-real-quadrant
ring: adopt
ring_changed: not-a-date
owners: []
poc_repo: https://example.com/not-github
status: unknown
---

## What it is

One or two paragraphs describing the technology.

## Why it's on our radar

Why we are evaluating or tracking this now.

## What we tried

Concrete scope: environment, duration, team.

## What worked

What met expectations.

## What didn't

What failed, was painful, or is not ready — do not skip this section.

## When to recommend it to a client

Specific scenarios, constraints, and client types.

## When NOT to recommend it

Anti-patterns, maturity gaps, or alternatives.

## Who to ask

Name the people behind the PoC.
`;

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

function main() {
  process.chdir(repoRoot);

  fs.mkdirSync(path.dirname(INVALID_PATH), { recursive: true });
  fs.writeFileSync(INVALID_PATH, INVALID_CONTENT, 'utf8');

  try {
    const invalidErrors = validateEntry(INVALID_PATH);
    assert(
      invalidErrors.length > 0,
      'invalid fixture should produce validation errors',
    );
    console.log(`OK invalid entry rejected (${invalidErrors.length} error(s))`);

    const validErrors = validateEntry(VALID_PATH);
    assert(validErrors.length === 0, `valid entry should pass: ${validErrors.join('; ')}`);
    console.log(`OK valid entry accepted (${VALID_REL})`);
  } finally {
    if (fs.existsSync(INVALID_PATH)) {
      fs.unlinkSync(INVALID_PATH);
    }
  }

  console.log('Running npm run validate (all entries)...');
  execSync('npm run validate', { stdio: 'inherit' });

  if (process.argv.includes('--build')) {
    console.log('Running npm run build...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('OK production build');
  }

  console.log('Smoke test passed.');
}

main();
