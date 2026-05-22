---
name: Backstage (Internal Developer Portal)
quadrant: developer-experience
ring: assess
ring_changed: 2026-05-22
owners: [coe-radar-maintainer]
poc_repo: https://github.com/CoEOrg/backstage-dev-portal-poc
status: active
tags: [backstage, portal, techdocs, priority-backlog, in-progress]
---

## What it is

[Backstage](https://backstage.io/) as an internal developer portal: software catalog, TechDocs, plugins, and auth integration. The cluster PoC in [CoEOrg/backstage-dev-portal-poc](https://github.com/CoEOrg/backstage-dev-portal-poc) is the working copy for standing up that portal and, over time, hosting this tech radar alongside other CoE repositories—not only a static GitHub Pages site.

## Why it's on our radar

Management connects developer experience investments to delivery leverage. A running Backstage instance forces real decisions on plugin selection, GitHub catalog ingestion, and auth. The end state is a reusable “Backstage in 30 days” client deliverable template documented from our own build.

## What we tried

**In progress** (started 2026; active PoC repository). The team has begun the internal developer portal effort in [backstage-dev-portal-poc](https://github.com/CoEOrg/backstage-dev-portal-poc) rather than only planning it. Current focus areas:

- Bootstrap and run Backstage locally or in a lab environment from the PoC repo
- Wire GitHub (CoEOrg) catalog ingestion for selected repositories
- Stand up TechDocs for radar and related documentation
- Capture setup, plugin, and auth decisions in-repo as we go

Still outstanding for the meta-PoC: production-grade SSO integration, full radar surfacing inside Backstage (today the public site remains on GitHub Pages), and the packaged client runbook.

## What worked

Having a dedicated PoC repository keeps experiments out of the evaluations monorepo and gives reviewers a single place for Docker/Helm, catalog config, and app scaffolding. Backstage’s catalog and TechDocs model still fit our radar markdown and PoC repo links as first-class catalog entities once ingestion is configured.

## What didn't

The portal is not yet the primary radar surface; GitHub Pages still serves [the live site](https://coeorg.github.io/tech-radar-evaluations/). Early setup cost is real—Node/Yarn app lifecycle, plugin version alignment, and choosing between local, Docker, and Kubernetes paths. Auth integration and “golden path” templates for client handoff are not finished.

## When to recommend it to a client

After we complete enough of the PoC to publish a runbook—when the client has dozens of services, wants a software catalog, and can fund platform engineering to run Backstage. Until then, cite this entry as **active internal learning**, not a proven delivery default.

## When NOT to recommend it

Do not recommend as production-ready based on this entry alone while the PoC is incomplete. Avoid when the client needs only a static documentation site, lacks IdP integration capacity, or requires a fully SaaS portal with no self-hosting.

## Who to ask

Contributors with commit access to [CoEOrg/backstage-dev-portal-poc](https://github.com/CoEOrg/backstage-dev-portal-poc) and CoE radar maintainers. Developer-experience quadrant leads for prioritization and client-template decisions.
