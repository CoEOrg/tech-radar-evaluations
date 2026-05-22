---
name: Open-Source API Gateways (Kong, Tyk, KrakenD, Zuplo)
quadrant: integration-platforms
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/coeorg/radar-api-gateway-open-source
status: active
tags: [api-gateway, kong, tyk, krakend, cost]
---

## What it is

Assessment of API gateway options **outside** the “big four” enterprise suites (MuleSoft, Apigee, etc.) that sibling clusters already cover—focused on **Kong OSS**, **Tyk**, **KrakenD**, and **Zuplo** when clients want cost-conscious or cloud-native edge gateways.

## Why it's on our radar

Clients say “we do not want a Mule license” and need credible open-source or lighter-commercial answers. Our cluster should complement sibling CoEs, not compete with their MuleSoft/Apigee depth.

## What we tried

No structured comparison yet. **Proposed scope (medium):** same API surface deployed behind two gateways, evaluate policy authoring, observability plugins, Kubernetes fit, and licensing.

## What worked

Kong and Tyk have long community track records; KrakenD is often chosen for performance-sensitive edge; Zuplo targets developer-centric SaaS edge. Hypothesis: each wins on different topology (K8s ingress vs. centralized management plane).

## What didn't

Comparison incomplete. Risks: underestimating enterprise features (developer portals, monetization, WAF integration) that clients still ask for, and recommending OSS without a managed ops story.

## When to recommend it to a client

After the PoC, when budget or cloud-native preference rules out enterprise suites **and** the client can operate gateway infrastructure—or buy managed tiers explicitly.

## When NOT to recommend it

Do not position OSS gateways as full replacements for sibling-cluster specialties without architecture review. Avoid when the client requires a single vendor SLA across ESB, API, and integration monitoring.

## Who to ask

Integration-platforms leads; coordinate with sibling cluster SMEs to avoid duplicate or conflicting guidance.
