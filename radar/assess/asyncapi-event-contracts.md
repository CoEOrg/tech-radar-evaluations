---
name: AsyncAPI Event Contracts in Practice
quadrant: integration-platforms
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-asyncapi-event-contracts
status: active
tags: [asyncapi, events, contract-testing]
---

## What it is

Practical use of **AsyncAPI** to describe event-driven interfaces—with code generation and contract tests—where most shops already use OpenAPI for HTTP but stumble on async contracts.

## Why it's on our radar

Integration maturity requires symmetric contract discipline for events. Pairs naturally with the Kafka/NATS/Redpanda assess entry.

## What we tried

Not yet executed. **Proposed scope (medium):** one realistic AsyncAPI spec (order or inventory events), generated consumer/producer stubs where tooling allows, and CI contract verification against a test broker.

## What worked

OpenAPI fluency in the cluster lowers the learning curve for AsyncAPI structure. Growing tooling ecosystem for linting and documentation portals.

## What didn't

No internal sample spec yet. Gaps: tooling maturity lags OpenAPI, schema evolution practices are inconsistent, and some brokers need custom bindings not covered by generic generators.

## When to recommend it to a client

After the PoC, when they run multiple event consumers and need published schemas—not for single-producer fire-and-forget with one consumer.

## When NOT to recommend it

Do not force AsyncAPI when the client standardizes on proprietary schema registries without AsyncAPI export. Skip for batch file integrations with no streaming API.

## Who to ask

Integration architects on event-heavy engagements. CoE radar maintainers until PoC owner assigned.
