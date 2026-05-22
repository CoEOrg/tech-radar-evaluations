---
name: Saga Patterns (Choreography vs Orchestration)
quadrant: integration-platforms
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-saga-patterns
status: active
tags: [saga, temporal, distributed-transactions]
---

## What it is

Hands-on comparison of **choreography** (event-driven, decentralized compensations) versus **orchestration** (central workflow, often with **Temporal** or similar) for long-running distributed transactions across services.

## Why it's on our radar

On every architect’s “should know” list for years, yet many engineers still cannot implement sagas safely. Worth an internal upskilling PoC with client-ready narrative.

## What we tried

Not yet run. **Proposed scope (medium):** same business process (for example order fulfillment with payment and inventory) implemented both ways; document failure injection, compensation clarity, and operability.

## What worked

Temporal adoption in industry gives a concrete orchestration baseline. Event-driven teams already have Kafka skills to attempt choreography.

## What didn't

No side-by-side code yet. Anticipated issues: debugging choreographed flows, timer and human-task handling in pure events, and licensing/ops cost for workflow engines.

## When to recommend it to a client

After the PoC, when they have multi-step business processes spanning services and need explicit compensation—not for two-service CRUD with synchronous REST only.

## When NOT to recommend it

Do not jump to Temporal when a database outbox plus single consumer suffices. Avoid choreography without idempotent consumers and clear ownership of compensating events.

## Who to ask

Senior integration architects. CoE radar maintainers for scheduling the PoC.
