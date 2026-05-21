---
name: MCP Gateway Registry
quadrant: integration-platforms
ring: assess
ring_changed: 2026-04-02
owners: [integration-architect, ai-platform-lead]
poc_repo: https://github.com/your-org/radar-mcp-gateway-registry
status: active
tags: [mcp, agents, integration]
---

## What it is

An MCP (Model Context Protocol) gateway and registry pattern centralizes discovery, authentication, and routing for tools and data sources that AI agents call at runtime. Teams register capabilities once instead of wiring ad hoc HTTP wrappers per assistant.

## Why it's on our radar

Agentic prototypes multiply direct integrations to internal APIs. Without a registry, we duplicate auth, logging, and versioning across every PoC and increase blast radius when an endpoint changes.

## What we tried

We stood up a small registry service and two sample MCP servers (issue tracker read-only, document search) in a lab cluster. One internal copilot and one CLI agent consumed tools through the gateway for two sprints.

## What worked

Clear separation between “tool publisher” and “agent consumer” teams. Versioned tool manifests made it obvious which agents depended on which capability. Central audit logging for tool invocations was easier than scattered callbacks.

## What didn't

Operational maturity is early: no built-in rate limiting parity with our API management layer, and local dev ergonomics lag behind calling REST directly. Governance for who may publish a production tool is still manual.

## When to recommend it to a client

Recommend for assess-phase workshops when the client is building multiple agents against the same internal systems and wants a deliberate integration boundary—not as default production architecture yet.

## When NOT to recommend it

Not for single-chatbot demos with one integration, or when the client lacks API management discipline to back the registry. Do not imply this replaces enterprise API gateways without an architecture review.

## Who to ask

The integration architecture guild ran the registry PoC. AI platform engineering can demo agent-side configuration.
