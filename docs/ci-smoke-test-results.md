# CI smoke test results

Record outcomes when you run [ci-smoke-test.md](ci-smoke-test.md).

| Date | Verifier | Local `npm run smoke-test` | Invalid PR CI failed | Valid PR merged | Deploy succeeded | Live site OK | Notes |
|------|----------|----------------------------|----------------------|-----------------|------------------|--------------|-------|
| 2026-05-22 | Automated (agent) | Pass | — | — | — | Pass (radar rendering confirmed by maintainer) | Local script added; GitHub PR branches require manual run in `CoEOrg` |

### Local automated run (2026-05-22)

- `npm run smoke-test` — invalid fixture rejected, `litellm.md` accepted, all entries validated  
- Production site — https://coeorg.github.io/tech-radar-evaluations/ — radar rings render after `svg` config fix (maintainer verified)

### Pending manual sign-off

- [ ] Invalid PR branch `smoke-test/invalid-entry` → **Validate radar entries** fails  
- [ ] Valid PR merged → **Deploy GitHub Pages** green  
- [ ] Optional: branch protection requires validation check on `main`
