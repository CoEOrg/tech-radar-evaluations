import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { RINGS } from './radar-config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(__dirname, '..');
export const RADAR_ROOT = path.join(REPO_ROOT, 'radar');

export function relativeRadarPath(filePath) {
  return path.relative(REPO_ROOT, path.resolve(filePath)).split(path.sep).join('/');
}

export function ringFromPath(relativePath) {
  const match = /^radar\/(adopt|trial|assess|hold)\//.exec(relativePath);
  return match ? match[1] : null;
}

export function slugFromPath(relativePath) {
  const base = path.basename(relativePath, '.md');
  return base;
}

export function parseFrontmatter(content) {
  const normalized = content.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { error: 'File must start with YAML frontmatter (---)' };
  }
  const end = normalized.indexOf('\n---\n', 4);
  if (end === -1) {
    return { error: 'Frontmatter closing --- not found' };
  }
  const yaml = normalized.slice(4, end);
  const body = normalized.slice(end + 5);
  return { data: parseYamlBlock(yaml), body };
}

function parseYamlBlock(yaml) {
  const data = {};
  for (const line of yaml.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = /^([a-z_]+):\s*(.*)$/i.exec(trimmed);
    if (!match) continue;
    const [, key, raw] = match;
    data[key] = parseYamlValue(raw);
  }
  return data;
}

function parseYamlValue(raw) {
  const trimmed = raw.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map((part) => stripQuotes(part.trim()));
  }
  return stripQuotes(trimmed);
}

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

export function extractH2Headings(body) {
  const headings = [];
  for (const line of body.split('\n')) {
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (match) headings.push(match[1]);
  }
  return headings;
}

export function sectionContent(body, heading) {
  const marker = `## ${heading}`;
  const start = body.indexOf(marker);
  if (start === -1) return '';
  const after = body.slice(start + marker.length);
  const next = after.search(/\n## /);
  const chunk = next === -1 ? after : after.slice(0, next);
  return chunk.replace(/^\s+/, '').trim();
}

export function firstParagraph(text) {
  if (!text) return '';
  const blocks = text.split(/\n\n+/);
  for (const block of blocks) {
    const trimmed = block.trim();
    if (trimmed) return trimmed.replace(/\s+/g, ' ');
  }
  return '';
}

export function collectAllEntries() {
  const files = [];
  for (const ring of RINGS) {
    const dir = path.join(RADAR_ROOT, ring);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (name.endsWith('.md')) {
        files.push(path.join(dir, name));
      }
    }
  }
  return files.sort();
}
