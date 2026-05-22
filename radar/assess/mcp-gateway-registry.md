---
name: MCP Server Catalog & Registry Solutions
quadrant: ai-emerging
ring: assess
ring_changed: 2026-05-22
owners: [integration-architect, ai-platform-lead]
poc_repo: https://github.com/coeorg/radar-mcp-catalog-registry
status: active
tags: [mcp, catalog, registry, gateway, discovery]
---

## What it is

**MCP catalogs and registries** are the control plane for discovering, publishing, and governing Model Context Protocol servers (and increasingly agents and skills)—the difference between “every developer wires Notion locally” and “the org runs one curated tool store with SSO and audit.”

A strong reference implementation is **[MCP Gateway & Registry](https://github.com/agentic-community/mcp-gateway-registry)** (Apache-2.0, ~660+ GitHub stars): an enterprise-oriented platform that combines (1) a unified MCP server gateway, (2) an **MCP servers registry** with dynamic discovery and group-scoped visibility, and (3) an **agent registry / A2A hub** for agent-to-agent patterns. It federates **external registries** (including the official MCP Registry API), supports Keycloak, Microsoft Entra ID, Okta, Auth0, and Cognito, offers **virtual MCP servers** (bundled tool sets per team), **registry-only** deployment for catalog-only use cases, and a Registry Card at `/.well-known/registry-card` for federation discovery.

**Alternatives worth evaluating** (different catalog/gateway depth):

| Solution | Role | Catalog / registry angle |
|----------|------|---------------------------|
| [agentic-community/mcp-gateway-registry](https://github.com/agentic-community/mcp-gateway-registry) | Self-hosted gateway + registry | Curated internal catalog, IAM, virtual servers, external registry federation, A2A/skills |
| [modelcontextprotocol/registry](https://github.com/modelcontextprotocol/registry) | Official community registry | Public “app store” of MCP servers; REST API (v0.1 freeze); discovery for clients, not enterprise IAM |
| [IBM/mcp-context-forge](https://github.com/ibm/mcp-context-forge) | AI gateway + registry/proxy | Federates MCP, A2A, REST/gRPC; central discovery, guardrails, OTel; virtualizes non-MCP APIs as MCP |
| [MintMCP](https://www.mintmcp.com/) | Managed commercial gateway | **MCP store** of approved servers, VMCP bundles, SSO, audit/PII controls, hosted connectors |
| [MCPNest](https://mcpnest.dev/) | Hosted / self-host platform | Verified **server catalog** + gateway; container orchestration, allowlists, audit (EU-oriented ops story) |
| [maximhq/bifrost](https://github.com/maximhq/bifrost) | Self-hosted Go gateway | Tool groups, OAuth/PKCE, audit logging; lighter catalog story—see **MCP Gateway Bake-off** entry |

Commercial gateways with registry features (**TrueFoundry**, **Lunar.dev MCPX**, Kong AI Gateway) are covered in the separate **MCP Gateway Bake-off** assess entry to avoid duplicating vendor scoring here.

## Why it's on our radar

Clients and internal teams hit the same wall: dozens of MCP servers on laptops, no curated catalog, no publisher/consumer separation, and no federation with the emerging **official MCP Registry**. We need a shortlist of catalog solutions we can stand up in a lab, demo in workshops, and contrast with “public directory only” vs. “enterprise gateway + store.”

## What we tried

No comparative catalog PoC is finished in our org. **Proposed scope (medium):** use [agentic-community/mcp-gateway-registry](https://github.com/agentic-community/mcp-gateway-registry) as the **anchor** (Docker Compose or macOS one-command setup per upstream docs), register 3–5 servers (one internal, two from the official registry), and exercise OAuth, group-restricted visibility, and audit export. In parallel, spike **registry-only** mode vs. full gateway mode, and document how **ContextForge** or **MintMCP** would satisfy the same catalog requirements where self-host vs. managed differs.

Success criteria: a published internal catalog UI/CLI, federated import from `modelcontextprotocol/registry`, and a written **“build vs. buy vs. public directory”** decision guide for clients.

## What worked

Upstream [mcp-gateway-registry](https://github.com/agentic-community/mcp-gateway-registry) directly addresses catalog chaos called out in its README: multi-tenant curated servers, agent/skills registry, IdP integration, and federation hooks rather than a hand-rolled YAML list. The official [MCP Registry](https://github.com/modelcontextprotocol/registry) gives a standards-aligned discovery API clients will expect. IBM ContextForge and MintMCP show two viable paths—deep self-hosted federation vs. managed **MCP store** with pre-built connectors—for teams that will not run MongoDB/Keycloak themselves.

## What didn't

Hands-on evaluation is still open. Anticipated gaps: operating MongoDB, Keycloak/Entra, and nginx as a production platform team; overlap and confusion between **public registry entries** and **approved internal tools**; and A2A/agent registry features that many integration-only engagements do not need yet. The official MCP Registry remains preview-tier (breaking changes possible) and is not an enterprise access-control layer by itself. MintMCP and similar SaaS options introduce data-residency and connector-hosting trust boundaries we must document honestly.

## When to recommend it to a client

After the PoC, when they are standardizing MCP across many engineers or tenants and need a **governed catalog** (curated servers, SSO, audit)—not a single IDE with three local servers. Favor **agentic-community/mcp-gateway-registry** or ContextForge when they can self-host and want federation; favor **MintMCP** when they want a managed MCP store quickly; use the **official MCP Registry** as the public discovery layer clients and tools will integrate with, backed by an internal gateway/registry for policy.

## When NOT to recommend it

Do not recommend a full enterprise catalog for one chatbot and one integration. Do not treat the public MCP Registry as sufficient for compliance or per-user authorization. Do not imply any open-source registry replaces API management, WAF, or data-classification programs without architecture review. Skip agent/A2A registry depth when the engagement is tools-only.

## Who to ask

Integration architecture and AI platform engineering own this assess track. For gateway-only vendor scoring (MCPX, Bifrost, Kong, etc.), see the **MCP Gateway Bake-off** entry. For building servers to register, see **MCP Server Skill Catalog (Internal)**.
