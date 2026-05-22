---
name: Trunk-Based Development with Feature Flags
quadrant: developer-experience
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-trunk-based-feature-flags
status: active
tags: [trunk-based, feature-flags, openfeature]
---

## What it is

Trunk-based delivery practices combined with feature flags via **OpenFeature** and one provider—**Unleash** (open-source) or a commercial option such as LaunchDarkly or ConfigCat—with reference implementations in two stack languages used by the cluster.

## Why it's on our radar

Boring but perennially relevant: clients want shorter-lived branches and safer releases. We need opinionated, copy-paste patterns—not another theoretical trunk-based slide deck.

## What we tried

No reference repos yet. **Proposed scope (small):** sample service in two languages with OpenFeature SDK, flag-driven rollout, and CI showing trunk merge policy plus flag cleanup discipline.

## What worked

OpenFeature decouples application code from vendor SDKs, which helps when clients already own a flag vendor. Trunk-based fits GitHub Actions–centric workflows we already adopt.

## What didn't

Not implemented yet. Typical failures: flag debt (long-lived flags nobody removes), inconsistent naming conventions across teams, and providers chosen for UI polish but weak SDK support in .NET or Node versions the client uses.

## When to recommend it to a client

After reference repos exist, for product teams releasing weekly or faster with mature CI—not for teams still on long-lived release branches without automated test gates.

## When NOT to recommend it

Do not recommend flags to hide unfinished work on main without strong testing. Avoid vendor-specific SDK lock-in when the client mandated OpenFeature abstraction—document the mapping explicitly.

## Who to ask

Developer-experience leads and platform engineering when the dual-language samples are built.
