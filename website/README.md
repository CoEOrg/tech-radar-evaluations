# Tech Radar website (Docusaurus)

Static site for the SoftServe technology radar. Markdown entries live in `../radar/`; build scripts at the repo root produce `../generated/radar-data.json`.

## Local development

From the repository root:

```bash
node scripts/build-radar-data.mjs
cp generated/radar-data.json website/static/radar-data.json
cd website && npm install && npm start
```

Root-level npm scripts (step 7) will automate data generation before `build`.

## Production build

```bash
cd website && npm run build
```

Output is in `website/build/`, deployed to GitHub Pages via CI (step 12).

## Site URL

When GitHub Pages is enabled for `CoEOrg/tech-radar-evaluations`:

`https://coeorg.github.io/tech-radar-evaluations/`

(Adjust host casing if your GHE Pages URL differs.)
