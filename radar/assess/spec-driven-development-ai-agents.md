---
name: Spec-Driven Development with AI Agents
quadrant: ai-emerging
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-spec-driven-development-ai
status: active
tags: [methodology, agents, openapi, adr]
---

## What it is

A delivery methodology PoC (not a single tool PoC): the four-phase workflow that has solidified in 2026—**specify, plan, task, implement**—writing OpenAPI contracts and ADRs first, then using those specs as primary context when prompting AI agents (Claude Code, Cursor, or similar) to generate implementation code.

## Why it's on our radar

Teams want to move faster with agents without losing architectural control. Spec-first work is a legitimate emerging discipline, but it is easy to do poorly without senior judgment on what “done” means for contracts and tests.

## What we tried

Not yet executed in our cluster. **Proposed scope (medium; senior engineer):** one greenfield integration project run spec-first with an agent toolchain; a control “vibe-coded” variant on a comparable slice. Measure lines of test code generated, contract violations caught in CI, and time-to-first-working-endpoint.

## What worked

Literature and early adopters report fewer integration surprises when OpenAPI and ADRs precede codegen. Fits engagements where the client already values contract testing.

## What didn't

No internal metrics yet. Expected difficulties: keeping specs authoritative when agents drift implementations, overhead on small changes, and the risk that junior teams treat generated code as reviewed by default.

## When to recommend it to a client

After the PoC, for greenfield APIs and integration services with compliance or multi-team consumers—when they will invest in CI contract gates, not for one-off scripts.

## When NOT to recommend it

Do not sell as “AI will write your architecture.” Avoid when the client cannot maintain OpenAPI in-repo or when delivery timelines forbid upfront specification work.

## Who to ask

Assign a senior integration lead for the methodology PoC. CoE radar maintainers coordinate until staffing is confirmed.
