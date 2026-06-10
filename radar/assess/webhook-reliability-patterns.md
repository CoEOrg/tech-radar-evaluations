---
name: Webhook Reliability Patterns
quadrant: integration-platforms
ring: assess
ring_changed: 2026-05-22
owners: [mmatuliak]
poc_repo: https://github.com/coeorg/radar-webhook-reliability-patterns
status: active
tags: [webhooks, outbox, idempotency, integration]
---

## What it is

Reference patterns for reliable outbound/inbound webhooks: **transactional outbox**, **idempotency keys**, **signature verification**, and **replay endpoints**—implemented in Node.js or .NET as a small, copy-pasteable sample.

## Why it's on our radar

Nearly every integration project needs this; nearly every project reinvents it badly. A reference implementation saves weeks and reduces incident risk on client go-lives.

## What we tried

Built a **local PoC**: publisher accepts `order.created` events, writes `events` + `outbox` in one SQLite transaction, and a background poller dispatches signed POSTs to the receiver. The receiver verifies `v1` HMAC signatures, rejects bad signatures with **401**, and deduplicates on `eventId` via a `processed_events` table.

Manual scenarios exercised via README curl recipes: happy-path delivery, simulated transient **500** with exponential backoff retry, duplicate delivery after retry (receiver returns `status: duplicate`), and invalid signature (publisher marks outbox **failed**, non-retryable). Stack: Node.js 18+, Express, better-sqlite3, built-in `fetch`.

## What worked

- **Transactional outbox** in a single DB transaction is easy to follow and maps cleanly to how teams already think about “write business data, then deliver.”
- **Publisher/receiver split** with `shared/webhookCrypto.js` makes the signing contract obvious and copy-pasteable.
- **Idempotency** on `eventId` handled duplicate deliveries from retries without double-processing.
- **Retry policy** (408/429/5xx retryable, 401 non-retryable) behaved predictably in manual runs.
- `timingSafeEqual` for signature comparison is a small but important detail to document for clients.

## What didn't

- **No operator replay API** yet—failed rows stay failed; recovery is manual, not an authenticated replay endpoint.
- **No automated test suite**—validation is curl-driven only.
- **Polling dispatcher** is fine for a sandbox; production would want CDC, a queue, or a dedicated outbox worker with observability.
- **No clock-skew tolerance** on webhook timestamps; skew between publisher and receiver is not handled.
- **Node.js only**—no .NET sample; teams on .NET must port patterns themselves.
- PoC is a **personal learning sandbox**, not yet exercised on a client engagement or production-like load.

## When to recommend it to a client

After the reference ships, for SaaS-to-SaaS or SaaS-to-internal integrations using webhooks—not when they already own an enterprise event backbone with ordering guarantees.

## When NOT to recommend it

Do not recommend hand-rolled webhooks when the client should use a managed event gateway with built-in replay and DLQ. Skip replay APIs without strong authentication and audit.

## Who to ask

Integration engineers on webhook-heavy projects. CoE radar maintainers until the reference repository exists.
