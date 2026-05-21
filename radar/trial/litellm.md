---
name: LiteLLM
quadrant: ai-emerging
ring: trial
ring_changed: 2026-03-15
owners: [jane.doe, mike.smith]
poc_repo: https://github.com/your-org/radar-litellm
status: active
tags: [llm-gateway, python, openai-compatible]
---

## What it is

LiteLLM is a Python proxy that exposes many LLM providers behind a single OpenAI-compatible API. It supports routing, budgets, virtual keys, and observability hooks for teams that need one integration surface across vendors.

## Why it's on our radar

Several client conversations asked for multi-provider LLM routing with per-team cost controls. We need a gateway pattern that does not lock delivery to a single hyperscaler API shape.

## What we tried

We deployed LiteLLM in front of OpenAI, Anthropic, and a local Ollama instance with budget limits per virtual key. Two prototype assistants and one batch summarization job called the proxy for four weeks in a shared lab tenant.

## What worked

OpenAI-compatible clients worked with minimal code changes. Per-key budgets stopped runaway spend in tests. Provider failover configuration was straightforward for the happy path.

## What didn't

Cold-start latency stacked when chaining retries across providers. Operational dashboards required extra tooling beyond the proxy itself. Some enterprise SSO and audit requirements were not met out of the box and needed compensating controls.

## When to recommend it to a client

Recommend for pilots that need a single API in front of multiple LLM vendors, especially when teams already speak “OpenAI SDK” and want cost caps per application or tenant.

## When NOT to recommend it

Do not position as the long-term enterprise AI platform without a security and SRE review. Skip when the client mandates a single-vendor managed gateway with contractual SLAs, or when they cannot host Python services in their environment.

## Who to ask

Jane Doe built the initial PoC. Mike Smith integrated it into the Acme Corp prototype in Q1.
