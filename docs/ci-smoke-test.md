# CI and site smoke test

Verifies the three behaviors required before calling the GitHub Pages MVP done:

1. **Invalid PR** → **Validate radar entries** workflow fails  
2. **Valid PR** → validation passes and can merge to `main`  
3. **Merge to `main`** → **Deploy GitHub Pages** runs and the live site updates  

## Automated local check (no GitHub required)

From the repository root:

```bash
npm run smoke-test
```

This script:

- Writes a temporary invalid file under `radar/trial/__smoke-invalid.md` (removed afterward)
- Asserts validation fails for that file (bad quadrant, ring/folder mismatch, empty owners, placeholder **What didn't**, etc.)
- Asserts `radar/trial/litellm.md` passes
- Runs `npm run validate` for all published entries

Optional full build:

```bash
npm run smoke-test:full
```

## Manual GitHub smoke test (run once per environment)

Use two short-lived branches. Do **not** merge the invalid PR.

### 1. Invalid PR must fail CI

```bash
git checkout main
git pull
git checkout -b smoke-test/invalid-entry
```

Create `radar/trial/smoke-test-invalid.md` with deliberately bad frontmatter, for example:

```yaml
quadrant: not-a-real-quadrant
ring: adopt   # file is under trial/ → folder mismatch
owners: []
```

Keep template placeholder text in **What didn't**. Commit, push, open a PR to `main`.

| Check | Expected |
|-------|----------|
| **Validate radar entries** workflow | **Failure** (red X) |
| Job log | Errors for quadrant, ring/folder, owners, and/or placeholder **What didn't** |
| Merge | Blocked if branch protection requires the validation check |

Close the PR without merging. Delete the branch.

### 2. Valid PR must pass CI and merge

```bash
git checkout main
git pull
git checkout -b smoke-test/valid-entry
```

Add a minimal valid entry (or fix a typo in an existing entry). Example path: `radar/assess/smoke-test-valid.md` — copy [radar/entry-template.md](../radar/entry-template.md), fill all required fields honestly, use a reachable `poc_repo`.

| Check | Expected |
|-------|----------|
| **Validate radar entries** | **Success** |
| PR template checklist | Completed |
| Review + merge to `main` | Allowed when policy satisfied |

After merge, confirm **Deploy GitHub Pages** succeeds (Actions tab).

### 3. Live site reflects merge

Within a few minutes of deploy:

| Check | URL | Expected |
|-------|-----|----------|
| Radar home | https://coeorg.github.io/tech-radar-evaluations/ | Rings, blips, recently changed |
| New/updated entry | `/docs/entries/<slug>` | Detail page and PoC link |
| Entries table | `/entries` | Row visible with correct ring/quadrant |

Remove temporary smoke-test entries in a follow-up PR if you do not want them on the radar long term.

## Record results

Copy [ci-smoke-test-results.md](ci-smoke-test-results.md) or add a row to your team wiki with date, verifier, and pass/fail for each section.

## Related

- [github-pages-setup.md](github-pages-setup.md) — Pages access verification (section C)  
- [CONTRIBUTING.md](../CONTRIBUTING.md) — entry rules validated by CI  
- Workflows: [validate-radar.yml](../.github/workflows/validate-radar.yml), [deploy-pages.yml](../.github/workflows/deploy-pages.yml)
