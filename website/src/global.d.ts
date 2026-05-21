export type RadarVisualizationEntry = {
  label: string;
  quadrant: number;
  ring: number;
  moved: number;
  active?: boolean;
  link?: string;
};

export type RadarVisualizationConfig = {
  repo_url?: string;
  svg_id: string;
  width: number;
  height: number;
  scale?: number;
  colors?: {
    background?: string;
    grid?: string;
    inactive?: string;
  };
  font_family?: string;
  title?: string;
  quadrants: {name: string}[];
  rings: {name: string; color: string}[];
  print_layout?: boolean;
  links_in_new_tabs?: boolean;
  entries: RadarVisualizationEntry[];
};

declare global {
  interface Window {
    radar_visualization?: (config: RadarVisualizationConfig) => void;
  }
}

export {};
