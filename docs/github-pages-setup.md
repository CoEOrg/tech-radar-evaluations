# GitHub Enterprise Pages — setup and org-only access

This repository publishes the Tech Radar as a **GitHub Pages** site built by Docusaurus and deployed from [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml).

| Item | Value |
|------|--------|
| Organization | `CoEOrg` |
| Repository | `tech-radar-evaluations` |
| Live URL | https://coeorg.github.io/tech-radar-evaluations/ |
| Docusaurus `baseUrl` | `/tech-radar-evaluations/` |

> Host casing in the URL may differ on your GHE instance (e.g. `CoEOrg` vs `coeorg`). Use the URL shown under **Settings → Pages** after the first successful deploy.

## Goals

- **Internal-only** radar content (evaluations, PoC links, owner names).
- **No separate app server** — static site + GitHub Actions.
- **Org members (or repo readers) only** — not public internet.

Access control is enforced by **repository visibility** and **GitHub Pages visibility**, not by application-level login on the static site.

## Prerequisites

Work with a **repository admin** and, if needed, an **enterprise/org owner**.

1. **GitHub Enterprise** (Cloud or Server) with **GitHub Pages** and **Actions** enabled for the org.
2. For **private** Pages on private repos: confirm your enterprise allows [private Pages](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#about-publishing-sources) (GHE Cloud) or the equivalent policy on GHE Server.
3. This repo’s default branch is **`main`** and CI workflows are allowed to run.

## One-time repository setup

### 1. Pages publishing source

1. Open **https://github.com/CoEOrg/tech-radar-evaluations/settings/pages** (adjust host for GHE).
2. Under **Build and deployment → Source**, select **GitHub Actions** (not “Deploy from a branch”).
3. Save. Do not point Pages at a `gh-pages` branch; deployment uses the official Pages artifact flow.

### 2. Workflow permissions

1. **Settings → Actions → General → Workflow permissions**
2. Prefer **Read and write permissions** (or ensure the default `GITHUB_TOKEN` can publish Pages per org policy).
3. Allow **GitHub Actions** to create and approve deployments if your org requires it for the `github-pages` environment.

### 3. `github-pages` environment

The deploy workflow uses the **`github-pages`** environment. On first deploy, GitHub may create it automatically.

If deployment is blocked:

1. **Settings → Environments → github-pages**
2. Remove overly strict **deployment protection rules** for this internal site, or add required reviewers per your governance model.
3. Re-run the **Deploy GitHub Pages** workflow.

### 4. Repository visibility (primary access control)

| Repository visibility | Who should see the site |
|----------------------|-------------------------|
| **Private** | Users with **read** access to this repo (typical for org-only radar) |
| **Internal** (GHE) | All authenticated enterprise members |
| **Public** | Anyone on the internet — **avoid** for this radar |

**Recommendation:** keep **`tech-radar-evaluations` private** and grant access via **teams** (e.g. engineering, CoE, delivery). Pages visibility for private repos follows repo permissions.

### 5. Pages visibility (GHE Cloud / newer Pages controls)

If your instance exposes **Pages visibility** separately:

1. **Settings → Pages → Visibility**
2. Choose **Private** (same as repo) or the strictest option that limits access to org members / repo readers.
3. Do **not** select **Public** unless you intentionally want an external audience.

On some GHE versions, private repo Pages are automatically non-public; the UI may not show a separate toggle.

## How deployment works

On every push to **`main`** (and on manual **workflow_dispatch**):

1. **Validate** all entries (`npm run validate`).
2. **Build** the site (`npm run build` → `website/build`).
3. **Upload** the artifact and **deploy** via `actions/deploy-pages@v4`.

Monitor: **Actions → Deploy GitHub Pages**. The deployment summary links to the live URL.

## Verify org-only access

Run this checklist after the first successful deploy. Record results in your team runbook or an internal ticket.

### A. Authorized user (should succeed)

Use a GitHub account that is an **org member** with **read** access to `CoEOrg/tech-radar-evaluations` (directly or via team).

| # | Check | Expected |
|---|--------|----------|
| A1 | Open https://coeorg.github.io/tech-radar-evaluations/ while logged in | Home loads; radar rings and blips render |
| A2 | Open `/entries` | Table lists seed entries |
| A3 | Open a detail page (e.g. `/docs/entries/litellm`) | Markdown content and PoC link visible |
| A4 | Open browser devtools → Network | `radar-data.json`, `js/d3.v7.min.js`, `js/radar-0.12.js` return **200** (under `/tech-radar-evaluations/`) |

### B. Unauthorized user (should fail)

Use **signed-out browser**, **personal account outside the org**, or a test user **without** repo read access.

| # | Check | Expected |
|---|--------|----------|
| B1 | Open the same Pages URL | **404**, **login redirect**, or **access denied** — not the full radar UI |
| B2 | Try direct URL to `…/radar-data.json` | No JSON payload for anonymous users |
| B3 | Confirm repo is not public | **Settings → General → Danger zone** shows **Private** |

### C. CI and content

| # | Check | Expected |
|---|--------|----------|
| C1 | Merge a trivial doc-only change to `main` | **Deploy GitHub Pages** succeeds; site updates within a few minutes |
| C2 | Open PR with invalid entry frontmatter | **Validate radar entries** fails; merge blocked if branch protection requires checks |

### D. Enterprise SSO (if applicable)

If the org uses **SAML SSO**:

| # | Check | Expected |
|---|--------|----------|
| D1 | Authorized user without SSO authorization for the org | Prompted to **authorize SSO** before repo/Pages access |
| D2 | After SSO, repeat A1 | Site loads |

**Sign-off:** document verifier name, date, and GHE hostname in your internal wiki when A and B pass.

## Troubleshooting

| Symptom | Likely cause | Action |
|---------|----------------|--------|
| 404 on all paths | Pages source not **GitHub Actions**, or deploy never succeeded | Fix **Settings → Pages**; re-run deploy workflow |
| Blank radar, “Recently changed” works | Wrong `svg` id for Zalando `radar-0.12.js` | Ensure `buildRadarConfig` passes `svg`, not only `svg_id` (see `website/src/lib/radar-viz.ts`) |
| Assets 404 (`js/…`, `radar-data.json`) | `baseUrl` mismatch | `website/docusaurus.config.ts` `baseUrl` must be `/tech-radar-evaluations/` |
| Deploy job fails at upload/deploy | Pages not enabled or environment blocked | Enable Actions Pages; relax `github-pages` environment rules |
| Site public when it should be private | Repo or Pages visibility too open | Set repo **Private**; restrict teams; review Pages visibility setting |

## Related documentation

- [CONTRIBUTING.md](../CONTRIBUTING.md) — adding and validating entries
- [website/README.md](../website/README.md) — local build and dev server
- [README.md](../README.md) — repository overview (site URL and quick start)
