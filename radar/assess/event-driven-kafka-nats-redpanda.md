---
name: Event-Driven Platforms (Kafka, NATS, Redpanda)
quadrant: integration-platforms
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-event-driven-kafka-nats-redpanda
status: active
tags: [kafka, nats, redpanda, events, priority-backlog]
---

## What it is

Comparison of event streaming/messaging platforms—**Apache Kafka**, **NATS**, and **Redpanda**—on a realistic integration scenario (for example order events from e-commerce to multiple downstream consumers).

## Why it's on our radar

Event-driven architecture is core to our integration business. Clients need a credible “when do we pick what” guide, not a vendor brochure. This quadrant must stay strong so the radar does not read as AI-only.

## What we tried

No comparative build yet. **Proposed scope (large):** implement the **same** scenario on **two** of the three platforms (not all three—that is a year-long effort). Capture ops model, ordering guarantees, operational cost, and team skills.

## What worked

Kafka remains the default mental model for many enterprises; NATS excels at simplicity and certain edge/topologies; Redpanda markets Kafka API compatibility with different ops. Prior project anecdotes inform hypothesis tables only until the PoC runs.

## What didn't

Decision guide not published. Risk: comparing without matching SLA, retention, and exactly-once requirements—apples-to-oranges conclusions that mislead architects.

## When to recommend it to a client

After the PoC, when event volume, ordering, and operational ownership are understood—pair with the AsyncAPI assess entry for contract discipline.

## When NOT to recommend it

Do not recommend a platform from this entry before the guide exists. Skip when a simple queue or workflow engine (not a log-based bus) is sufficient.

## Who to ask

Integration-platforms quadrant leads and engineers with recent Kafka or NATS delivery experience.
