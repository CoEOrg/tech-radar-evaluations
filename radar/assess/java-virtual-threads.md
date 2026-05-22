---
name: Java Virtual Threads
quadrant: languages-frameworks
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-java-virtual-threads
status: active
tags: [java, jdk21, virtual-threads, performance]
---

## What it is

**Virtual threads** (JDK 21+) for I/O-heavy integration workloads—contrasted with traditional platform thread pools on realistic HTTP and messaging client scenarios.

## Why it's on our radar

Virtual threads change how Java integration services scale concurrent outbound calls without massive thread pools. Clients on JDK 21+ will ask for guidance backed by numbers.

## What we tried

No benchmark yet. **Proposed scope (medium):** realistic integration workload (many parallel HTTP/SOAP/DB calls) with platform threads vs. virtual threads; capture latency, memory, and code complexity.

## What worked

Industry benchmarks show simpler concurrency code for I/O-bound paths when pinning and synchronized blocks are controlled.

## What didn't

Benchmark not run. Pitfalls: pinning through legacy JDBC drivers, mixed CPU-bound work on virtual threads, and clients still on JDK 17 LTS without a migration plan.

## When to recommend it to a client

After benchmarks, for new JDK 21+ services that are I/O-bound integration hubs—not for CPU-heavy transformation engines without profiling.

## When NOT to recommend it

Do not recommend virtual threads while critical libraries pin carriers. Skip when the client cannot move off JDK 17 in the contract window.

## Who to ask

Java integration architects. Languages-frameworks quadrant leads.
