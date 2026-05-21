import type {RadarData} from '@site/src/types/radar-data';
import type {RadarVisualizationEntry} from '@site/src/global';

const RING_COLORS = ['#5ba300', '#009eb0', '#c7ba00', '#e09b96'];

export function docRouteForSlug(slug: string): string {
  return `/docs/entries/${slug}`;
}

export function resolveSiteUrl(baseUrl: string, path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const prefix = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${prefix}${normalized}`;
}

export function buildVizEntries(
  data: RadarData,
  resolveUrl: (path: string) => string,
): RadarVisualizationEntry[] {
  const byLabel = new Map(data.entries.map((entry) => [entry.name, entry]));

  return data.viz.entries.map((vizEntry) => {
    const entry = byLabel.get(vizEntry.label);
    const link = entry ? resolveUrl(entry.docRoute) : vizEntry.link;

    return {
      label: vizEntry.label,
      quadrant: vizEntry.quadrant,
      ring: vizEntry.ring,
      moved: vizEntry.moved,
      active: vizEntry.active,
      link,
    };
  });
}

export function buildRadarConfig(
  data: RadarData,
  resolveUrl: (path: string) => string,
  svgId: string,
) {
  const quadrants = [...data.quadrants]
    .sort((a, b) => a.index - b.index)
    .map((q) => ({name: q.label}));

  const rings = [...data.rings]
    .sort((a, b) => a.index - b.index)
    .map((ring, index) => ({
      name: ring.label.toUpperCase(),
      color: RING_COLORS[index] ?? '#888',
    }));

  return {
    svg_id: svgId,
    width: 1200,
    height: 900,
    scale: 1,
    links_in_new_tabs: false,
    print_layout: false,
    title: `Tech Radar ${data.viz.date}`,
    quadrants,
    rings,
    entries: buildVizEntries(data, resolveUrl),
  };
}

export function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );
    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () =>
        reject(new Error(`Failed to load ${src}`)),
      );
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}
