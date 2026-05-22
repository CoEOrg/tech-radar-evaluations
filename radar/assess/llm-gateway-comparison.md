---
name: LLM Gateway Comparison (LiteLLM, Portkey, Bifrost)
quadrant: ai-emerging
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-llm-gateway-comparison
status: active
tags: [llm-gateway, routing, observability, security]
---

## What it is

A side-by-side assessment of LLM gateway/proxy options—**LiteLLM** (not “LightLLM”), **Portkey**, and **Bifrost**—for teams using OpenAI, Anthropic, Bedrock, and others behind one API surface, one billing view, one log stream, and one policy layer.

## Why it's on our radar

This is a recurring client question: “How do we unify providers without locking to one SDK?” LiteLLM already has a separate radar entry from an earlier pilot; this PoC extends the story to alternatives and explicitly covers supply-chain and security posture (including teaching moments such as LiteLLM’s known compromise history).

## What we tried

No comparative PoC has been run yet. **Proposed scope (medium):** same workloads on each gateway—virtual keys or equivalent, budget caps, failover, and export of request logs to the client’s SIEM pattern. Document hosting model, enterprise SSO, and operational dashboards.

## What worked

LiteLLM trial entry shows OpenAI-compatible clients and per-key budgets work in lab conditions. Portkey and Bifrost are frequently shortlisted in industry comparisons for managed policy and performance-focused routing respectively.

## What didn't

Comparison not executed yet. Anticipated gaps: cold-start and retry latency stacking, uneven enterprise audit features, and the reality that **gateway choice is a security choice**—dependency supply chain and patch cadence must be in the write-up, not an appendix.

## When to recommend it to a client

After the bake-off completes, when the client needs multi-vendor LLM routing with cost controls and is willing to operate a gateway tier (or buy managed). Point to the existing LiteLLM entry for single-vendor pilot depth.

## When NOT to recommend it

Do not crown a winner before the PoC. Skip when the client mandates a single hyperscaler managed gateway with contractual SLA and will not host third-party proxies.

## Who to ask

Owners of the LiteLLM trial entry for prior lab notes. CoE radar maintainers until comparison PoC owners are named.
