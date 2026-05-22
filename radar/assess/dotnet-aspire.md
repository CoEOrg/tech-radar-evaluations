---
name: .NET Aspire
quadrant: languages-frameworks
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-dotnet-aspire
status: active
tags: [dotnet, aspire, distributed-apps]
---

## What it is

**.NET Aspire** for composing and running multi-service .NET applications in development—with service discovery, configuration, and observability hooks aimed at distributed apps on .NET 8+.

## Why it's on our radar

Microsoft positions Aspire as the default dev-time story for multi-service .NET systems. Our .NET engineers are already asked about it on proposals.

## What we tried

No cluster PoC yet. **Proposed scope (medium):** small multi-service integration sample (API + worker + cache or broker) with Aspire orchestration, documented path to production deployment the client would actually use.

## What worked

Strong fit when teams are all-in on .NET and want lighter local orchestration than full Kubernetes on laptops. Aligns with existing .NET delivery skills.

## What didn't

Not evaluated yet. Open questions: production story vs. dev-only convenience, overlap with Docker Compose teams already use, and client environments standardized on non-Microsoft runtimes.

## When to recommend it to a client

After the PoC, for .NET-heavy microservice integrations where engineers need fast local multi-service dev—not as a cross-language integration platform.

## When NOT to recommend it

Do not recommend before clarifying production hosting. Skip for polyglot systems where only one service is .NET.

## Who to ask

.NET practice leads when the sample solution is staffed.
