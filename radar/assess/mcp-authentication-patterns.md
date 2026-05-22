---
name: MCP Authentication Patterns (Multi-Source)
quadrant: ai-emerging
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-mcp-authentication-patterns
status: active
tags: [mcp, oauth, identity, priority-backlog]
---

## What it is

Patterns for propagating end-user identity when one MCP server fronts multiple downstream systems (for example Snowflake, Jira, and an internal API). The assessment compares shared service accounts with row-level filtering, per-user OAuth passthrough, and token-exchange brokers (Keycloak, Auth0, or similar).

## Why it's on our radar

Multi-source MCP servers are the realistic integration shape for enterprise agents, but identity propagation is where most lab PoCs hand-wave. Clients need a decision tree, not a single demo login.

## What we tried

No delivery PoC completed yet. **Proposed scope (medium):** three minimal reference implementations of the same logical MCP server exposing three downstreams, each using one identity pattern. Deliver a decision-tree document with prerequisites, compliance notes, and failure modes.

## What worked

Clear problem framing from client workshops: without a named pattern, every team reinvents service accounts and over-collects credentials. Token-exchange brokers are already familiar to integration architects from API gateway work.

## What didn't

Not evaluated hands-on yet. Expected pain: OAuth consent sprawl across SaaS systems, token lifetime and refresh handling in long-running agent sessions, and tension between “user context everywhere” and break-glass service accounts for batch jobs.

## When to recommend it to a client

After the PoC, for clients building MCP servers that aggregate more than one system of record and must enforce per-user authorization downstream—not for read-only public tool catalogs.

## When NOT to recommend it

Avoid presenting any pattern as default without mapping to the client’s IdP, data classification, and audit requirements. Do not recommend per-user passthrough where the client mandates shared batch identities only.

## Who to ask

Assign integration security and AI platform engineering when the reference implementations start. CoE radar maintainers track backlog status until then.
