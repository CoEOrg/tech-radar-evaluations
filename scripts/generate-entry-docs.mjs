#!/usr/bin/env node
/**
 * Generate Docusaurus MDX detail pages from radar markdown entries.
 * Usage: node scripts/generate-entry-docs.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import {QUADRANTS} from './radar-config.mjs';
import {
  collectAllEntries,
  parseFrontmatter,
  relativeRadarPath,
  slugFromPath,
  REPO_ROOT,
} from './parse-entry.mjs';
import {validateEntry} from './validate-entry.mjs';

const ORG = 'CoEOrg';
const REPO = 'tech-radar-evaluations';
const REPO_URL = `https://github.com/${ORG}/${REPO}`;
const OUT_DIR = path.join(REPO_ROOT, 'website', 'docs', 'entries');

const RING_LABELS = {
  adopt: 'Adopt',
  trial: 'Trial',
  assess: 'Assess',
  hold: 'Hold',
};

function quadrantLabel(quadrantId) {
  return QUADRANTS.find((q) => q.id === quadrantId)?.label ?? quadrantId;
}

function escapeMdxBody(text) {
  return text.replace(/\{/g, '\\{');
}

function buildMdx({data, body, relativePath, slug}) {
  const ringLabel = RING_LABELS[data.ring] ?? data.ring;
  const quadLabel = quadrantLabel(data.quadrant);
  const owners = Array.isArray(data.owners) ? data.owners : [];
  const editUrl = `${REPO_URL}/edit/main/${relativePath}`;

  const headerProps = [
    `name=${JSON.stringify(data.name)}`,
    `ring=${JSON.stringify(data.ring)}`,
    `ringLabel=${JSON.stringify(ringLabel)}`,
    `quadrant=${JSON.stringify(data.quadrant)}`,
    `quadrantLabel=${JSON.stringify(quadLabel)}`,
    `owners={${JSON.stringify(owners)}}`,
    `pocRepo=${JSON.stringify(data.poc_repo)}`,
    `status=${JSON.stringify(data.status)}`,
    `ringChanged=${JSON.stringify(data.ring_changed)}`,
  ].join('\n  ');

  const trimmedBody = body.trim();
  const mdxBody = trimmedBody ? `${escapeMdxBody(trimmedBody)}\n` : '';

  return `---
title: ${data.name}
hide_title: true
sidebar_label: ${data.name}
slug: /entries/${slug}
custom_edit_url: ${editUrl}
---

import EntryDetailHeader from '@site/src/components/EntryDetailHeader';

<EntryDetailHeader
  ${headerProps}
/>

${mdxBody}`;
}

function main() {
  const files = collectAllEntries();

  if (files.length === 0) {
    console.error('No entries found under radar/{adopt,trial,assess,hold}/');
    process.exit(1);
  }

  let failed = false;
  for (const file of files) {
    const errors = validateEntry(file);
    if (errors.length > 0) {
      failed = true;
      console.error(`FAIL ${relativeRadarPath(file)}`);
      for (const err of errors) {
        console.error(`  - ${err}`);
      }
    }
  }
  if (failed) {
    console.error('Doc generation aborted: fix validation errors first');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, {recursive: true});

  const expectedSlugs = new Set();

  for (const file of files) {
    const relativePath = relativeRadarPath(file);
    const content = fs.readFileSync(file, 'utf8');
    const parsed = parseFrontmatter(content);
    if (parsed.error) {
      console.error(`${relativePath}: ${parsed.error}`);
      process.exit(1);
    }

    const slug = slugFromPath(relativePath);
    expectedSlugs.add(slug);
    const outPath = path.join(OUT_DIR, `${slug}.mdx`);
    const mdx = buildMdx({
      data: parsed.data,
      body: parsed.body,
      relativePath,
      slug,
    });
    fs.writeFileSync(outPath, mdx, 'utf8');
    console.log(`Wrote ${path.relative(REPO_ROOT, outPath)}`);
  }

  for (const name of fs.readdirSync(OUT_DIR)) {
    if (!name.endsWith('.mdx')) {
      continue;
    }
    const slug = name.slice(0, -4);
    if (!expectedSlugs.has(slug)) {
      fs.unlinkSync(path.join(OUT_DIR, name));
      console.log(`Removed stale ${path.join('website/docs/entries', name)}`);
    }
  }

  const gitkeep = path.join(OUT_DIR, '.gitkeep');
  if (fs.existsSync(gitkeep)) {
    fs.unlinkSync(gitkeep);
  }
}

main();
