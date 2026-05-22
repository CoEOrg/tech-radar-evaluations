---
name: Agent-Readable API Documentation
quadrant: developer-experience
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-agent-readable-documentation
status: active
tags: [documentation, llms-txt, agents, priority-backlog]
---

## What it is

Documentation structured for **AI assistants** as first-class consumers—not only humans—including patterns such as `llms.txt`, clear endpoint grouping, explicit auth flows, and examples that agents can follow without ambiguous prose.

## Why it's on our radar

Developers increasingly ask Claude, Cursor, or similar tools to read API docs and write integration code. A small PoC that measurably improves generated client code is a strong demo for API product teams.

## What we tried

Not yet run. **Proposed scope (small):** take one existing client API doc set, add `llms.txt` and restructure for agent consumption, then score whether Claude/Cursor can produce working integration code against a test harness.

## What worked

Early industry examples show structured, machine-navigable docs reduce hallucinated endpoints. Low engineering cost relative to gateway or platform PoCs.

## What didn't

No before/after metrics yet. Risks: docs leaking deprecated endpoints if not generated from OpenAPI, and overfitting prompts to one model family.

## When to recommend it to a client

After measurement, for clients publishing partner APIs who see support load from integration mistakes—not as a replacement for human-readable reference docs.

## When NOT to recommend it

Do not claim agent-readable docs fix bad API design. Skip when the client cannot keep docs in sync with the spec automatically.

## Who to ask

Technical writers paired with an integration engineer for the restructuring PoC. CoE radar maintainers for backlog tracking.
