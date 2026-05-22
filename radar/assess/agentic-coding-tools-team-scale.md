---
name: Agentic Coding Tools at Team Scale
quadrant: ai-emerging
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-agentic-coding-team-scale
status: active
tags: [agents, governance, code-review, practice]
---

## What it is

A practice-leadership assessment of how delivery changes when a large share of merged pull requests are agent-created—not “which coding agent is best,” but how review, ownership, security scanning, and throughput models hold when an engineer ships many agent PRs per day instead of one primarily human-authored PR.

## Why it's on our radar

Tool choice is saturated in industry content; our clients and clusters need **operating model** guidance. When more than ~30% of merges are agent-assisted, governance and review assumptions break unless we redesign them deliberately.

## What we tried

No formal cluster playbook exists yet. **Proposed scope (medium):** instrument a pilot team’s PR mix for several sprints, trial review checklists and CODEOWNERS adjustments, and draft a “how we work with coding agents” playbook for the integration cluster.

## What worked

Early anecdote: teams that label agent-generated PRs and require explicit test evidence reduce review thrash. Existing GitHub Actions and policy hooks can be extended without new products.

## What didn't

Playbook not written yet. Anticipated failures: reviewers treating agent output as trusted, secret leakage in prompts, and uneven quality on cross-cutting refactors that agents batch poorly.

## When to recommend it to a client

After the playbook PoC, for clients scaling Copilot/Cursor/Claude Code to whole teams—not for individual developer productivity tips.

## When NOT to recommend it

Do not export a playbook before measuring the client’s compliance constraints and PR policies. Not a substitute for secure SDLC training.

## Who to ask

Practice leadership and CoE radar maintainers until pilot team leads are assigned.
