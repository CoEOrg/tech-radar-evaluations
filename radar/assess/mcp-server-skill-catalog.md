---
name: MCP Server Skill Catalog (Internal)
quadrant: ai-emerging
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-mcp-server-skill-catalog
status: active
tags: [mcp, dogfooding, internal-tools]
---

## What it is

A small catalog of **3–5 MCP servers** wrapping our own internal tools—time tracking, project assignment data, the tech radar repository itself, and similar—so engineers learn MCP by building real capabilities agents can call.

## Why it's on our radar

Dogfooding produces credible demos and low-risk first PoCs for less experienced engineers. It complements gateway/registry work with publishable tools rather than only infrastructure.

## What we tried

Not started. **Proposed scope (small–medium):** implement a minimal server per internal system with read-only or scoped-write tools, document auth and manifest versioning, and wire at least one internal assistant or CLI agent through the catalog.

## What worked

Internal APIs are under our control, so auth and schema iteration are faster than on client systems. Reuses patterns from the **MCP Server Catalog & Registry Solutions** assess entry once a registry or gateway is in play.

## What didn't

No servers shipped yet. Risks: scope creep into production data without governance, PII in tool responses, and maintenance burden when internal APIs change without semver discipline.

## When to recommend it to a client

After we have working examples, as a **training and discovery** pattern for clients building their first internal tool surface for agents—not as a productized catalog vendor.

## When NOT to recommend it

Do not imply our internal servers are copy-paste safe for client data classes. Skip when the client lacks API ownership for the systems agents must call.

## Who to ask

CoE radar maintainers for staffing a starter server (radar metadata is a natural first target). AI platform engineering for agent-side wiring.
