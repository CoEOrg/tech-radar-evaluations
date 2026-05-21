---
name: GitHub Actions
quadrant: developer-experience
ring: adopt
ring_changed: 2026-01-15
owners: [coe-radar-maintainer, devops-lead]
poc_repo: https://github.com/your-org/radar-github-actions-poc
status: active
tags: [ci-cd, automation, github]
---

## What it is

GitHub Actions is GitHub’s built-in CI/CD platform. Workflows run in hosted or self-hosted runners and integrate with the same repository that holds application code, infrastructure definitions, and radar entries.

## Why it's on our radar

Most delivery teams already host code on GitHub Enterprise. Standardizing on Actions reduces the number of Jenkins or Azure DevOps agents we maintain and makes “build on every PR” the default for new repositories.

## What we tried

We migrated three internal platform repositories from Jenkins to Actions over six weeks: unit tests, container builds, security scans, and deployment to a non-production environment. Runners used organization-level secrets and reusable workflow templates.

## What worked

Faster feedback on pull requests (median under eight minutes for test workflows), simpler onboarding for engineers who only need YAML in-repo, and good integration with GitHub Environments for approval gates. Reusable workflows let us enforce org standards without copying boilerplate.

## What didn't

Self-hosted runner capacity planning was harder than expected for GPU-heavy jobs. Debugging flaky third-party actions still requires reading raw logs; there is no single “pipeline dashboard” comparable to mature Jenkins plugins. Very large monorepos occasionally hit workflow concurrency limits without careful matrix design.

## When to recommend it to a client

Recommend when the client’s source of truth is already GitHub (Cloud or Enterprise), they want PR-driven CI/CD without a separate orchestration product, and compliance allows GitHub-hosted runners or they can operate self-hosted runners.

## When NOT to recommend it

Avoid as the primary CI/CD story when the client is standardized on GitLab or Azure DevOps with no appetite to change, when they need complex mainframe or on-prem-only build farms Actions cannot reach, or when regulatory policy forbids cloud-hosted build infrastructure entirely.

## Who to ask

The platform team owns reusable workflow templates. Delivery leads who completed the Jenkins migration pilots can speak to day-to-day authoring and troubleshooting.
