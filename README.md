# Tech Radar — Technology Evaluations

A living **technology radar** for SoftServe: curated evaluations of tools and platforms we have tried in delivery, published as markdown in this repository and rendered as an internal site (GitHub Pages).

Every technology decision—add, move between rings, or retire—is a **pull request**, so the radar stays reviewable, auditable, and easy to update without a separate CMS or database.

## Purpose

This repository is the **single source of truth** for:

- **What** we evaluated (PoCs, pilots, production use)
- **Where** it sits on the radar (ring and quadrant)
- **How** it performed in our context (what worked, what did not, when to recommend or avoid)
- **Who** to contact and **which** PoC repo to inspect

The goal is to turn scattered PoC learnings into durable guidance for teams and clients—not a generic industry radar, but **our** evidence-based view.

## Audience

| Who | How they use it |
|-----|-----------------|
| **Engineers & architects** | Explore the radar visualization, read detail pages, link PoCs into proposals |
| **Delivery leads & CoE** | Review ring moves via PRs, keep quadrants current, govern quality of entries |
| **PMs & account teams** | Use the **all entries** table view for quick scanning (when the site is live) |
| **Contributors** | Add or update entries after running a PoC or pilot—see [How to contribute](#how-to-contribute) |

## What you will find here

- **`radar/`** — One markdown file per technology, organized by ring: `adopt`, `trial`, `assess`, `hold`
- **`radar/entry-template.md`** — Copy-paste template for new entries
- **`scripts/`** — Validation and build tooling (radar data generation for the site)
- **`CONTRIBUTING.md`** — Full contributor playbook (rings, quadrants, frontmatter, PR checklist)

The published site (in progress) will provide:

- Interactive **radar diagram** (four quadrants, four rings)
- **Detail pages** per entry (owners, PoC repo link, evaluation narrative)
- **`/entries`** sortable table for list-oriented browsing

> **Site URL:** Will be documented here once GitHub Pages is enabled for this repository.

## Radar model (short)

**Rings** — maturity of recommendation in *our* context:

| Ring | Meaning |
|------|---------|
| **Adopt** | Proven; default where it fits |
| **Trial** | Worth real work; limited production |
| **Assess** | Worth learning; not a default yet |
| **Hold** | Avoid new work without strong justification |

**Quadrants** — topic area: Integration Platforms, Languages & Frameworks, Developer Experience, AI & Emerging.

Folder path and frontmatter `ring` must stay in sync. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full reference.

## How to contribute

1. Read **[CONTRIBUTING.md](CONTRIBUTING.md)** — rings, quadrants, required frontmatter, and body sections.
2. Copy **[radar/entry-template.md](radar/entry-template.md)** into `radar/<ring>/your-technology.md`.
3. Fill in honest evaluation content, especially **What didn't**.
4. Link the **PoC repository** in frontmatter (`poc_repo`).
5. Open a pull request to `main`; CI will validate structure (when workflows are enabled).

You can add or edit entries from the **GitHub web UI** without cloning locally. Optional local check (after validation script is wired):

```bash
node scripts/validate-entry.mjs radar/trial/your-technology.md
```

Ring changes (e.g. Trial → Adopt) are done by editing frontmatter, moving the file to the new ring folder, and opening a PR—the PR is the record of the decision.

## Repository layout

```
tech-radar-evaluations/
├── README.md                 ← you are here
├── CONTRIBUTING.md           ← contributor playbook
├── radar/
│   ├── entry-template.md
│   ├── adopt/
│   ├── trial/
│   ├── assess/
│   └── hold/
└── scripts/
    └── radar-config.mjs      ← shared rings, quadrants, validation rules
```

## Contributors

Entries are written by **engineers and architects** who ran PoCs or used the technology on engagements. Each entry should list **owners** (GitHub usernames) in frontmatter and name contacts in **Who to ask**.

We expect:

- Linked, accessible **PoC repos**
- Completed required sections (no empty **What didn't**)
- Review from someone who has **actually used** the tech when possible

Questions about process or access: open a GitHub issue in this repository or contact your **CoE / radar maintainers** (team channel to be linked when operational).

## Related links

- [CONTRIBUTING.md](CONTRIBUTING.md) — how to add and move entries
- [radar/entry-template.md](radar/entry-template.md) — entry template
