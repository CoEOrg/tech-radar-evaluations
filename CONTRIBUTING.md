# Contributing to the Tech Radar

This repository is the source of truth for our technology evaluations. Each technology is a markdown file under `radar/{adopt,trial,assess,hold}/`. Merging a pull request updates the published site.

## Quick start (GitHub web UI)

1. Copy [radar/entry-template.md](radar/entry-template.md) into the ring folder that matches the entry’s current ring, e.g. `radar/trial/my-tool.md`.
2. Fill in the YAML frontmatter and every section in the body.
3. Open a pull request against `main`. Use the PR template checklist; CI validates frontmatter and required headings.
4. After review and merge, the site rebuilds automatically.

You do not need to clone the repo or run a local build to add an entry, though local validation is available (see below).

## Rings and quadrants

**Rings** (folder name must match `ring` in frontmatter):

| Ring   | Meaning |
|--------|---------|
| adopt  | Proven in our context; default recommendation where it fits |
| trial  | Worth pursuing on real work; limited production use |
| assess | Worth learning; not a default recommendation yet |
| hold   | Do not start new work here without a strong reason |

**Quadrants** (`quadrant` in frontmatter — pick one):

| ID | Label |
|----|-------|
| `integration-platforms` | Integration Platforms |
| `languages-frameworks` | Languages & Frameworks |
| `developer-experience` | Developer Experience |
| `ai-emerging` | AI & Emerging |

## Frontmatter rules

| Field | Required | Notes |
|-------|----------|-------|
| `name` | Yes | Display name on the radar |
| `quadrant` | Yes | One of the quadrant IDs above |
| `ring` | Yes | `adopt`, `trial`, `assess`, or `hold` — must match the parent folder |
| `ring_changed` | Yes | ISO date `YYYY-MM-DD` when the entry moved to this ring |
| `owners` | Yes | GitHub usernames (no `@`), e.g. `[jane-doe, mike-smith]` |
| `poc_repo` | Yes | HTTPS URL: `https://github.com/org/repo` |
| `status` | Yes | `active` or `archived` |
| `tags` | No | Short labels for search and the entries table |

## Body sections

Every entry must include these level-2 headings (exact titles):

- What it is
- Why it's on our radar
- What we tried
- What worked
- What didn't
- When to recommend it to a client
- When NOT to recommend it
- Who to ask

Be honest in **What didn't** — that section is what makes entries useful for the next team.

## Moving between rings

To change ring (e.g. trial → adopt):

1. Edit frontmatter: set `ring` and `ring_changed` to today’s date.
2. Move the file to the matching folder, e.g. `radar/trial/foo.md` → `radar/adopt/foo.md`.
3. Open a PR. The PR is the record of the ring decision; quarterly reviews decide which PRs to merge.

## Pull request checklist

- [ ] PoC repo linked and reachable (`poc_repo`)
- [ ] **What didn't** is filled in, not placeholder text
- [ ] `ring` matches the directory (`radar/<ring>/...`)
- [ ] Owners are valid GitHub usernames in the org
- [ ] A second reviewer who has used the technology has been requested (when possible)

## Local validation (optional)

From the repository root, after validation scripts are added:

```bash
node scripts/validate-entry.mjs path/to/radar/trial/my-tool.md
```

## Questions

Open an issue or ask in the channel linked from the root [README.md](README.md).
