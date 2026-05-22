# Tech Radar — Technology Evaluations

A living **technology radar** for SoftServe: curated evaluations of tools and platforms we have tried in delivery, published as markdown in this repository and rendered as an internal site on **GitHub Pages**.

Every technology decision—add, move between rings, or retire—is a **pull request**, so the radar stays reviewable, auditable, and easy to update without a separate CMS or database.

## Live site

**https://coeorg.github.io/tech-radar-evaluations/**

| Page | URL |
|------|-----|
| Radar home | [/](https://coeorg.github.io/tech-radar-evaluations/) |
| All entries (sort/filter) | [/entries](https://coeorg.github.io/tech-radar-evaluations/entries) |
| About | [/docs/intro](https://coeorg.github.io/tech-radar-evaluations/docs/intro) |

Access is limited to users who can read this repository (private org radar). Admins: [docs/github-pages-setup.md](docs/github-pages-setup.md).

## Contributor quick start

**Fastest path (GitHub web UI — no clone required):**

1. Open **[radar/entry-template.md](radar/entry-template.md)** and copy it into `radar/<ring>/your-technology.md` (ring = `adopt`, `trial`, `assess`, or `hold`).
2. Fill in YAML frontmatter and every required section — especially **What didn't**.
3. Set `poc_repo` to your PoC repository (`https://github.com/org/repo`).
4. Commit on a branch and open a **pull request to `main`**.
5. Wait for **Validate radar entries** CI to pass; get review from your quadrant lead (and someone who used the tech, when possible).
6. After merge, the site redeploys automatically (usually within a few minutes).

**Optional local check** (from a clone):

```bash
npm install
npm run validate                              # all entries
node scripts/validate-entry.mjs radar/trial/your-technology.md
npm start                                     # http://localhost:3000/tech-radar-evaluations/
```

Full rules (rings, quadrants, PR checklist): **[CONTRIBUTING.md](CONTRIBUTING.md)**.

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
| **Engineers & architects** | Explore the [radar visualization](https://coeorg.github.io/tech-radar-evaluations/), read detail pages, link PoCs into proposals |
| **Delivery leads & CoE** | Review ring moves via PRs, keep quadrants current, govern quality of entries |
| **PMs & account teams** | Use the [**all entries**](https://coeorg.github.io/tech-radar-evaluations/entries) table for quick scanning |
| **Contributors** | Add or update entries after a PoC or pilot — [Contributor quick start](#contributor-quick-start) |

## What you will find here

- **`radar/`** — One markdown file per technology, organized by ring: `adopt`, `trial`, `assess`, `hold`
- **`radar/entry-template.md`** — Copy-paste template for new entries
- **`website/`** — Docusaurus site (radar UI, entry pages, `/entries` table)
- **`scripts/`** — Validation and build tooling (radar JSON + generated docs)
- **`CONTRIBUTING.md`** — Full contributor playbook (rings, quadrants, frontmatter, PR checklist)

The published site provides:

- Interactive **radar diagram** (four quadrants, four rings)
- **Detail pages** per entry (owners, PoC repo link, evaluation narrative)
- **`/entries`** sortable table for list-oriented browsing

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

See **[Contributor quick start](#contributor-quick-start)** above. Ring changes (e.g. Trial → Adopt): edit frontmatter (`ring`, `ring_changed`), move the file to the new folder, open a PR — the PR is the record of the decision.

## Repository layout

```
tech-radar-evaluations/
├── README.md
├── CONTRIBUTING.md
├── docs/
│   └── github-pages-setup.md   ← GHE Pages + access verification
├── radar/
│   ├── entry-template.md
│   ├── adopt/ | trial/ | assess/ | hold/
├── scripts/                    ← validate, build JSON, generate MDX
├── website/                    ← Docusaurus app
└── .github/workflows/          ← PR validation + Pages deploy
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
- [website/README.md](website/README.md) — local development and production build
- [docs/github-pages-setup.md](docs/github-pages-setup.md) — GHE private Pages setup and org-only access verification
