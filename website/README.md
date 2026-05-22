# Tech Radar website (Docusaurus)

Static site for the SoftServe technology radar. Markdown entries live in `../radar/`; build scripts at the repo root produce `../generated/radar-data.json`.

## Local development

From the **repository root** (recommended):

```bash
npm install
npm start
```

`prestart` generates radar JSON, syncs it to `static/radar-data.json`, and generates entry detail pages under `docs/entries/` before the dev server starts.

If the radar diagram is empty, ensure `website/static/radar-data.json` exists (`npm run prepare:radar` from the repo root) and check the browser console for script load errors.

From `website/` only:

```bash
npm install
npm start
```

## Production build

From the repository root:

```bash
npm run build
```

`prebuild` runs data generation and sync, then builds Docusaurus into `website/build/`.

Output is deployed to GitHub Pages via CI (step 12).

## Site URL

When GitHub Pages is enabled for `CoEOrg/tech-radar-evaluations`:

`https://coeorg.github.io/tech-radar-evaluations/`

(Adjust host casing if your GHE Pages URL differs.)
