---
name: Jenkins Shared Libraries
quadrant: developer-experience
ring: hold
ring_changed: 2025-11-01
owners: [legacy-platform-admin]
poc_repo: https://github.com/your-org/radar-jenkins-shared-libraries
status: active
tags: [jenkins, groovy, legacy]
---

## What it is

Jenkins shared libraries package Groovy pipeline steps and utilities so many Jenkins jobs reuse the same build, test, and deploy logic. They were the primary way we standardized CI/CD before repository-native workflows became common.

## Why it's on our radar

A large footprint of historical jobs still calls shared libraries. We need an explicit hold stance so new programs do not expand Groovy pipeline debt while migrations proceed.

## What we tried

We audited library usage across org Jenkins controllers, tagged consumers by criticality, and migrated two greenfield repos to GitHub Actions without shared libraries. Maintenance continued only for security patches on remaining controllers.

## What worked

Shared libraries remain adequate for brownfield Jenkins that cannot move soon. Centralized version pins reduced surprise breaking changes when we limited new features.

## What didn't

Groovy pipeline debugging is slow for engineers used to YAML in-repo. Library versioning across controllers caused drift. Onboarding cost for new hires is high compared to Actions or GitLab CI in-repo configs.

## When to recommend it to a client

Only when the client is committed to Jenkins long term and already operates shared libraries with governance—typically extending existing estates, not greenfield.

## When NOT to recommend it

Do not start new shared libraries or major Groovy investment. Prefer GitHub Actions, GitLab CI, or Azure Pipelines in-repo unless a written exception documents why Jenkins must stay.

## Who to ask

Legacy platform administration maintains controllers and library releases. Teams with open migration tickets can share cutover timelines.
