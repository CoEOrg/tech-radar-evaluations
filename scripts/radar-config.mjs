/** Shared radar metadata for validation and build scripts. */

export const RINGS = ['adopt', 'trial', 'assess', 'hold'];

/** Ring index for Zalando radar (0 = innermost adopt). */
export const RING_INDEX = {
  adopt: 0,
  trial: 1,
  assess: 2,
  hold: 3,
};

export const QUADRANTS = [
  {
    id: 'integration-platforms',
    label: 'Integration Platforms',
    index: 0,
  },
  {
    id: 'languages-frameworks',
    label: 'Languages & Frameworks',
    index: 1,
  },
  {
    id: 'developer-experience',
    label: 'Developer Experience',
    index: 2,
  },
  {
    id: 'ai-emerging',
    label: 'AI & Emerging',
    index: 3,
  },
];

export const QUADRANT_IDS = QUADRANTS.map((q) => q.id);

export const QUADRANT_INDEX = Object.fromEntries(
  QUADRANTS.map((q) => [q.id, q.index]),
);

export const STATUSES = ['active', 'archived'];

export const REQUIRED_HEADINGS = [
  'What it is',
  "Why it's on our radar",
  'What we tried',
  'What worked',
  "What didn't",
  'When to recommend it to a client',
  'When NOT to recommend it',
  'Who to ask',
];

export const REQUIRED_FRONTMATTER = [
  'name',
  'quadrant',
  'ring',
  'ring_changed',
  'owners',
  'poc_repo',
  'status',
];

export const GITHUB_USERNAME_RE =
  /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export const POC_REPO_PATTERN =
  /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;

export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
