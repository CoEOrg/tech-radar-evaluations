---
name: Temporal.io
quadrant: integration-platforms
ring: trial
ring_changed: 2026-05-25
owners: [rgavrysh]
poc_repo: https://github.com/coeorg/radar-temporal-io
status: active
tags: [workflow, orchestration, durable-execution, saga, integration-platforms]
---

## What it is

[Temporal](https://temporal.io/) is an open-source **durable workflow orchestration** platform: developers define long-running business processes as code (Workflows) and ordinary functions as Activities, while the Temporal service persists execution state, handles retries, timers, signals, and versioning. Workers run your code; the cluster records history so processes survive process restarts, deploys, and infrastructure failures.

You are largely correct to compare it with **Azure Logic Apps**, **AWS Step Functions**, and similar **managed workflow** products: all coordinate multi-step, stateful processes across services. Temporal differs in being **code-first** (SDKs in Go, Java, TypeScript, Python, .NET) with strong guarantees around exactly-once workflow semantics and explicit compensation patterns—closer to a **workflow engine for microservices** than a visual integration designer. It complements (rather than replaces) event buses: many teams use Temporal for orchestration and Kafka/NATS for choreography and fan-out.

## Why it's on our radar

Custom Integrations engagements increasingly need **reliable, long-running** processes—order fulfillment, provisioning, human approvals, scheduled retries—without bolting state into databases and cron jobs. Clients ask about Step Functions and Logic Apps; we need a **vendor-neutral, code-centric** option we can run on Kubernetes or consume as **Temporal Cloud**, plus a credible PoC narrative for architects.

Temporal is mature in the industry (not “emerging AI”); placing it in **Trial** reflects intent to pursue a real PoC and limited production pilots, not a first-pass literature review.

## What we tried

PoC **not started yet**. **Proposed scope (medium):** one end-to-end workflow (for example order or onboarding) with at least two Activities, a timer or sleep, failure injection with retries, and a compensation path; deploy Temporal Server locally or on a lab cluster (or Temporal Cloud trial), implement workers in a language the team already delivers (.NET or TypeScript are likely candidates), and document operability (visibility, upgrades, namespace strategy).

Success criteria: team can explain when to choose Temporal vs Logic Apps/Step Functions vs event-only sagas, and we have a linked PoC repository with runnable samples.

## What worked

Strong industry adoption for **orchestrated sagas** and human-in-the-loop workflows. Clear programming model (Workflow vs Activity separation) and built-in durability remove much homemade “state table + poller” glue. Open-source server and managed cloud reduce lock-in compared to a single hyperscaler workflow SKU. Aligns with the separate **Saga Patterns** assess entry—Temporal is the concrete orchestration engine we would use in that comparison.

## What didn't

No hands-on delivery evidence in our org yet. Anticipated friction: **operational footprint** of self-hosted Temporal (Cassandra/PostgreSQL history store, cluster sizing, upgrades) vs paying for Temporal Cloud; **learning curve** for deterministic workflow code (no arbitrary I/O in workflow functions); and **client procurement** when they mandate Azure Logic Apps or AWS-native Step Functions for compliance. Versioning and workflow patching need discipline so deploys do not break in-flight runs.

## When to recommend it to a client

After the PoC, when they need **long-running, stateful orchestration** across multiple services with retries, timers, and compensations; when their team prefers **workflows-as-code** in CI/CD over GUI-only designers; and when they can host Temporal (or buy Temporal Cloud) and operate workers in their language of choice.

Pair with clear boundaries: use for process coordination, not as a message broker or API gateway.

## When NOT to recommend it

Do not propose Temporal for **short, synchronous** chains that fit in a single service or a simple queue consumer. Skip when the client **requires** a hyperscaler-native visual workflow (Logic Apps, Step Functions) under enterprise architecture standards with no self-hosted alternative. Avoid when a **database outbox + single consumer** or lightweight scheduler is enough. Do not use as a substitute for **event streaming** platforms—use Kafka/NATS/etc. for log-based integration and Temporal where central orchestration and durable timers matter.

## Who to ask

rgavrysh is driving the proposed PoC. Integration-platforms quadrant leads and anyone who has run Step Functions or Logic Apps on recent engagements should review the entry after the PoC runs.
