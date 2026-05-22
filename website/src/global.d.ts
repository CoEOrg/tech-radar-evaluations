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
  /** radar-0.12.js reads `svg` and assigns it to internal svg_id */
  svg: string;
  width: number;
  height: number;
  scale?: number;
  colors?: {
    background?: string;
    grid?: string;
    inactive?: string;
  };
  font_family?: string;
  legend_column_width?: number;
  title?: string;
  quadrants: {name: string}[];
  rings: {name: string; color: string}[];
  print_layout?: boolean;
  links_in_new_tabs?: boolean;
  date?: string;
  entries: RadarVisualizationEntry[];
};

declare global {
  interface Window {
    radar_visualization?: (config: RadarVisualizationConfig) => void;
  }
}

export {};
