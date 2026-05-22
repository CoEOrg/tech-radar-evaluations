---
name: Testcontainers for Integration Testing
quadrant: developer-experience
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-testcontainers-integration
status: active
tags: [testing, testcontainers, integration]
---

## What it is

[Testcontainers](https://testcontainers.com/) patterns for integration tests that spin up real databases, brokers, and emulators in CI instead of heavy shared environments or brittle mocks.

## Why it's on our radar

Underused in our delivery stack despite high payoff on projects with messy external dependencies (databases, Kafka, cloud emulators). A small reference pays back quickly in proposal credibility.

## What we tried

No cluster reference implementation yet. **Proposed scope (small):** one service test suite using Testcontainers for its critical dependencies, documented CI resource needs and parallelization limits.

## What worked

Industry standard for JVM and growing adoption in .NET and Node. Reduces “works on shared QA” flakiness when containers are allowed in CI.

## What didn't

Not documented for our stacks yet. Pain points: CI runner Docker privileges, slower pipelines without careful lifecycle, and teams that duplicate compose files instead of reusable modules.

## When to recommend it to a client

After our reference exists, when they run CI on container-capable runners and integration tests currently skip real infrastructure.

## When NOT to recommend it

Skip when CI forbids Docker, or when the client’s test strategy is entirely contract-test and mock based by policy.

## Who to ask

Engineers who own integration test strategy on active engagements. CoE radar maintainers until the reference repo is created.
