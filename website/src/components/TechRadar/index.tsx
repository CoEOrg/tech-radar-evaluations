import {useCallback, useEffect, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {RadarData} from '@site/src/types/radar-data';
import {buildRadarConfig, loadScript, resolveSiteUrl} from '@site/src/lib/radar-viz';

import styles from './styles.module.css';

const SVG_ID = 'tech-radar-svg';

type TechRadarProps = {
  data: RadarData;
};

function TechRadarChart({data}: TechRadarProps) {
  const baseUrl = useBaseUrl('/');
  const resolveUrl = useCallback(
    (path: string) => resolveSiteUrl(baseUrl, path),
    [baseUrl],
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      setError(null);
      const d3Src = resolveSiteUrl(baseUrl, 'js/d3.v7.min.js');
      const radarSrc = resolveSiteUrl(baseUrl, 'js/radar-0.12.js');

      try {
        await loadScript(d3Src);
        await loadScript(radarSrc);
        if (cancelled) {
          return;
        }

        const svg = document.getElementById(SVG_ID);
        if (svg) {
          svg.innerHTML = '';
        }

        const config = buildRadarConfig(data, resolveUrl, SVG_ID);

        if (!window.radar_visualization) {
          throw new Error('radar_visualization is not available');
        }

        window.radar_visualization(config);
      } catch (err: unknown) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Failed to render radar';
          setError(message);
        }
      }
    }

    render();

    return () => {
      cancelled = true;
      const svg = document.getElementById(SVG_ID);
      if (svg) {
        svg.innerHTML = '';
      }
    };
  }, [data, baseUrl, resolveUrl]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.svgHost}>
      <svg id={SVG_ID} />
    </div>
  );
}

export default function TechRadar({data}: TechRadarProps) {
  return (
    <section className={styles.wrapper} aria-label="Technology radar">
      <TechRadarChart data={data} />
    </section>
  );
}
