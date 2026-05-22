---
name: Bun and Deno 2 for Integration Scripts
quadrant: languages-frameworks
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-bun-deno-integration-scripts
status: active
tags: [bun, deno, scripts, lambda]
---

## What it is

Assessment of **Bun** and **Deno 2** for short-lived integration scripts, glue code, and Lambda-style workloads where Node startup time, tooling, and security defaults matter.

## Why it's on our radar

Low-cost curiosity with surprising relevance: many engagements need small deployable scripts (file transforms, webhook adapters, one-off ETL). Alternatives to `node` + npm may reduce friction if constraints align.

## What we tried

Not yet compared. **Proposed scope (small):** same script (HTTP pull, transform, publish) on Node LTS, Bun, and Deno; compare cold start, dependency management, and CI packaging.

## What worked

Fast iteration for engineers who already know TypeScript. Deno’s permission flags appeal to security-conscious clients; Bun’s speed claims are worth validating on our workloads.

## What didn't

No measurement yet. Risks: enterprise support hesitation, AWS Lambda runtime availability, and libraries that assume Node-only native addons.

## When to recommend it to a client

After the script PoC, for greenfield utility workloads where the client accepts non-Node runtimes—not for core ESB replacements.

## When NOT to recommend it

Do not standardize cluster-wide on Bun/Deno without client ops buy-in. Skip when compliance mandates Node LTS only.

## Who to ask

Node/TypeScript engineers open to runtime experiments. CoE radar maintainers for backlog tracking.
