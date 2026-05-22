---
name: MCP Gateway Bake-off
quadrant: ai-emerging
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-mcp-gateway-bake-off
status: active
tags: [mcp, gateway, priority-backlog, governance]
---

## What it is

A structured comparison of MCP (Model Context Protocol) gateway products that sit in front of MCP servers—handling discovery, routing, authentication, policy, and audit. The market has consolidated around a small set of serious options (for example Lunar.dev MCPX, Bifrost, TrueFoundry, MintMCP, IBM ContextForge, and Kong’s AI Gateway extension for teams already on Kong).

## Why it's on our radar

Gateway patterns are on the MCP roadmap as formal infrastructure, not optional glue. Clients are asking how to govern many agents and many tools without reinventing auth and logging per PoC. A bake-off gives us credible, repeatable talking points for at least a year of delivery conversations.

## What we tried

No in-org bake-off has been completed yet. **Proposed scope (large; 2–3 engineers paired):** pick three contrasting gateways—MCPX (open-source, governance-first), Bifrost (performance-first, open-source), and one commercial managed option (MintMCP or TrueFoundry). Run the **same** scenario on each: gateway in front of three MCP servers (one internal, two community), per-user OAuth, and audit log export. Document install complexity, policy model, and operability.

## What worked

Industry signal: teams that centralize MCP traffic early reduce duplicated auth wrappers and get a single audit trail for agent tool calls. Open-source options lower the bar for lab evaluations before a commercial shortlist.

## What didn't

We have not run the bake-off yet. Anticipated gaps: feature parity across vendors is uneven (rate limiting, multi-tenant isolation, enterprise SSO), and “gateway vs. extend existing API management” debates will slow client decisions. Local dev ergonomics may lag direct MCP server calls during the comparison.

## When to recommend it to a client

Recommend after we complete the bake-off, for clients building **multiple** agents against **multiple** internal systems who need governance, OAuth, and exportable audit—not for a single chatbot with one integration.

## When NOT to recommend it

Do not recommend a specific vendor from this entry until the PoC finishes. Skip when the client has no API management discipline, needs only one tool, or cannot host an additional control plane in their environment.

## Who to ask

CoE radar maintainers own backlog prioritization until PoC owners are assigned. Pair with integration architecture and AI platform leads when the bake-off starts. For **catalog/registry** platforms (curated MCP stores, official registry federation, agent/skills registry), see **MCP Server Catalog & Registry Solutions**.
