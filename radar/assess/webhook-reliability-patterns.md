---
name: Webhook Reliability Patterns
quadrant: integration-platforms
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-webhook-reliability-patterns
status: active
tags: [webhooks, outbox, idempotency, integration]
---

## What it is

Reference patterns for reliable outbound/inbound webhooks: **transactional outbox**, **idempotency keys**, **signature verification**, and **replay endpoints**—implemented in Node.js or .NET as a small, copy-pasteable sample.

## Why it's on our radar

Nearly every integration project needs this; nearly every project reinvents it badly. A reference implementation saves weeks and reduces incident risk on client go-lives.

## What we tried

Not yet built. **Proposed scope (small):** one reference service demonstrating outbox dispatch, HMAC verification, idempotent receiver, and operator replay API with tests.

## What worked

Patterns are well documented in industry literature; clients recognize the vocabulary. Fits engagements connecting SaaS products without enterprise buses.

## What didn't

No reference repo yet. Common failures we expect to document: at-least-once delivery without idempotency, clock skew on signatures, and replay endpoints without auth becoming abuse vectors.

## When to recommend it to a client

After the reference ships, for SaaS-to-SaaS or SaaS-to-internal integrations using webhooks—not when they already own an enterprise event backbone with ordering guarantees.

## When NOT to recommend it

Do not recommend hand-rolled webhooks when the client should use a managed event gateway with built-in replay and DLQ. Skip replay APIs without strong authentication and audit.

## Who to ask

Integration engineers on webhook-heavy projects. CoE radar maintainers until the reference repository exists.
