## What kind of change is this?

- [ ] New radar entry
- [ ] Update existing entry (content, owners, PoC link, tags)
- [ ] Ring move (`ring` + `ring_changed` in frontmatter and file moved to matching folder)
- [ ] Site, scripts, or CI (no radar entry content)

## Entry paths (if applicable)

<!-- e.g. radar/trial/my-tool.md — one path per line -->

## Checklist

Required for **radar entry** pull requests ([full guide](../CONTRIBUTING.md)):

- [ ] **PoC repo** is linked in frontmatter (`poc_repo`) and reachable for reviewers
- [ ] **What didn't** is filled in with real findings — not template placeholder text
- [ ] **`ring` matches the folder** (`radar/<ring>/…`)
- [ ] **Owners** are valid GitHub usernames in the org
- [ ] **Validate radar entries** CI is green (or will pass after your latest push)
- [ ] A **second reviewer** who has used this technology is requested when possible

For **ring moves**, note the decision context (pilot outcome, client usage, quarterly review) in the PR description.

## Reviewer notes

<!-- Quadrant lead or maintainer: anything reviewers should focus on? -->
