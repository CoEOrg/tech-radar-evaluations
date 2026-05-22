---
name: Spec-First API (OpenAPI, Spectral, Prism, Schemathesis)
quadrant: developer-experience
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-spec-first-api-openapi
status: active
tags: [openapi, contract-testing, ci, spectral]
---

## What it is

End-to-end **spec-first** HTTP API delivery: draft OpenAPI, lint with Spectral, mock with Prism, implement against the contract, verify with Schemathesis (or equivalent), and publish documentation from the same spec.

## Why it's on our radar

Few teams run the full stack despite widespread OpenAPI literacy. A real small API built spec-first—with CI wired—becomes a reusable project template for integration engagements.

## What we tried

Not yet built in our cluster. **Proposed scope (medium):** pick a small API the group actually needs, execute the full workflow, and ship a template repository with CI gates and contributor docs.

## What worked

Prior engagements show contract tests catch breaking changes earlier than integration tests alone when consumers are numerous. Prism accelerates parallel frontend and partner development.

## What didn't

Template does not exist yet. Known friction: keeping spec and implementation in sync when agents or fast fixes bypass the spec, Spectral rule tuning time, and teams that treat OpenAPI as post-hoc documentation only.

## When to recommend it to a client

After the template PoC, for public or partner APIs with multiple consumers and CI maturity—not for internal-only CRUD with one consumer.

## When NOT to recommend it

Do not mandate the full toolchain for tiny services where spec overhead exceeds value. Skip when the client cannot run containerized CI jobs for mocks and contract tests.

## Who to ask

Developer-experience quadrant leads when the template API is chosen. CoE radar maintainers until then.
