/** Shape of `generated/radar-data.json` (copied to `static/radar-data.json` at build). */

export type RadarQuadrant = {
  id: string;
  label: string;
  index: number;
};

export type RadarRing = {
  id: string;
  label: string;
  index: number;
};

export type RadarEntry = {
  slug: string;
  name: string;
  quadrant: string;
  quadrantIndex: number;
  quadrantLabel: string;
  ring: string;
  ringIndex: number;
  ringLabel: string;
  ring_changed: string;
  owners: string[];
  poc_repo: string;
  status: string;
  tags: string[];
  path: string;
  summary: string;
  docRoute: string;
};

export type RecentlyChanged = {
  slug: string;
  name: string;
  ring: string;
  ringLabel: string;
  quadrant: string;
  quadrantLabel: string;
  ring_changed: string;
  path: string;
};

export type VizEntry = {
  label: string;
  quadrant: number;
  ring: number;
  active: boolean;
  moved: number;
  link: string;
};

export type RadarData = {
  generatedAt: string;
  quadrants: RadarQuadrant[];
  rings: RadarRing[];
  entries: RadarEntry[];
  recentlyChanged: RecentlyChanged[];
  viz: {
    date: string;
    entries: VizEntry[];
  };
};
