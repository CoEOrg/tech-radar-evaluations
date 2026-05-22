---
name: FastAPI with Pydantic v2 and SQLModel
quadrant: languages-frameworks
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-fastapi-pydantic-sqlmodel
status: active
tags: [python, fastapi, pydantic, sqlmodel]
---

## What it is

A modern Python integration stack: **FastAPI** for HTTP APIs, **Pydantic v2** for validation and settings, and **SQLModel** for persistence—packaged as a reference template for small integration services.

## Why it's on our radar

Python remains common for integration microservices and data-facing APIs. Clients want opinionated, maintainable templates rather than ad hoc Flask scripts.

## What we tried

No published template yet. **Proposed scope (small):** CRUD + external HTTP client + structured logging sample with tests and container build, documented for handoff to juniors.

## What worked

FastAPI’s OpenAPI generation pairs with our spec-first developer-experience initiatives. Pydantic v2 performance and typing improve reviewability.

## What didn't

Template not built. Risks: async vs. sync misuse under load, ORM patterns that do not map to client DBA standards, and packaging/security updates left to each project without a platform baseline.

## When to recommend it to a client

After the template exists, for greenfield Python integration APIs with moderate complexity—not for heavy stream processing or teams standardized on Django monoliths.

## When NOT to recommend it

Avoid when the client mandates a different Python web framework by policy. Skip when they need JVM/.NET-only operations tooling.

## Who to ask

Python-capable integration engineers. Languages-frameworks quadrant leads.
