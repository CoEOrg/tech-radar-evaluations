#!/usr/bin/env node
/**
 * Build radar JSON from markdown entries under radar/.
 * Usage: node scripts/build-radar-data.mjs [--out path]
 * Default output: generated/radar-data.json
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  QUADRANTS,
  QUADRANT_INDEX,
  RING_INDEX,
  RINGS,
} from './radar-config.mjs';
import {
  collectAllEntries,
  firstParagraph,
  parseFrontmatter,
  relativeRadarPath,
  sectionContent,
  slugFromPath,
  REPO_ROOT,
} from './parse-entry.mjs';
import { validateEntry } from './validate-entry.mjs';

const DEFAULT_OUT = path.join(REPO_ROOT, 'generated', 'radar-data.json');

const RING_LABELS = {
  adopt: 'Adopt',
  trial: 'Trial',
  assess: 'Assess',
  hold: 'Hold',
};

function parseArgs(argv) {
  let out = DEFAULT_OUT;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--out' && argv[i + 1]) {
      out = path.resolve(process.cwd(), argv[i + 1]);
      i += 1;
    }
  }
  return { out };
}

function buildEntryRecord(filePath) {
  const relativePath = relativeRadarPath(filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = parseFrontmatter(content);
  if (parsed.error) {
    throw new Error(`${relativePath}: ${parsed.error}`);
  }

  const { data, body } = parsed;
  const slug = slugFromPath(relativePath);
  const quadrantId = data.quadrant;
  const ringId = data.ring;
  const summary = firstParagraph(sectionContent(body, 'What it is'));
  const tags = Array.isArray(data.tags) ? data.tags : [];

  return {
    slug,
    name: data.name,
    quadrant: quadrantId,
    quadrantIndex: QUADRANT_INDEX[quadrantId],
    quadrantLabel: QUADRANTS.find((q) => q.id === quadrantId)?.label ?? quadrantId,
    ring: ringId,
    ringIndex: RING_INDEX[ringId],
    ringLabel: RING_LABELS[ringId] ?? ringId,
    ring_changed: data.ring_changed,
    owners: data.owners,
    poc_repo: data.poc_repo,
    status: data.status,
    tags,
    path: relativePath,
    summary,
    docRoute: `/docs/entries/${slug}`,
  };
}

function toVizEntry(entry) {
  const viz = {
    label: entry.name,
    quadrant: entry.quadrantIndex,
    ring: entry.ringIndex,
    active: entry.status === 'active',
    moved: 0,
    link: entry.poc_repo,
  };
  return viz;
}

function buildRadarData(entries) {
  const recentlyChanged = [...entries]
    .sort((a, b) => b.ring_changed.localeCompare(a.ring_changed))
    .slice(0, 10)
    .map((e) => ({
      slug: e.slug,
      name: e.name,
      ring: e.ring,
      ringLabel: e.ringLabel,
      quadrant: e.quadrant,
      quadrantLabel: e.quadrantLabel,
      ring_changed: e.ring_changed,
      path: e.path,
    }));

  const now = new Date();
  const dateLabel = `${now.getUTCFullYear()}.${String(now.getUTCMonth() + 1).padStart(2, '0')}`;

  return {
    generatedAt: now.toISOString(),
    quadrants: QUADRANTS.map(({ id, label, index }) => ({ id, label, index })),
    rings: RINGS.map((id) => ({
      id,
      label: RING_LABELS[id],
      index: RING_INDEX[id],
    })),
    entries,
    recentlyChanged,
    viz: {
      date: dateLabel,
      entries: entries.map(toVizEntry),
    },
  };
}

function main() {
  const { out } = parseArgs(process.argv.slice(2));
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
    console.error('Build aborted: fix validation errors before generating radar data');
    process.exit(1);
  }

  const entries = files.map(buildEntryRecord);
  const payload = buildRadarData(entries);

  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${path.relative(REPO_ROOT, out)} (${entries.length} entries)`);
}

main();
