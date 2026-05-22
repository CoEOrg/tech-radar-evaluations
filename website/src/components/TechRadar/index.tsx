import {useCallback, useEffect, useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useColorMode} from '@docusaurus/theme-common';
import type {RadarData} from '@site/src/types/radar-data';
import {
  buildRadarConfig,
  computeRadarScale,
  loadScript,
  RADAR_LAYOUT_HEIGHT,
  RADAR_LAYOUT_WIDTH,
  resolveSiteUrl,
} from '@site/src/lib/radar-viz';

import styles from './styles.module.css';

const SVG_ID = 'tech-radar-svg';

type TechRadarProps = {
  data: RadarData;
};

function TechRadarChart({data}: TechRadarProps) {
  const baseUrl = useBaseUrl('/');
  const {colorMode} = useColorMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const resolveUrl = useCallback(
    (path: string) => resolveSiteUrl(baseUrl, path),
    [baseUrl],
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const updateScale = () => {
      setScale(computeRadarScale(container.clientWidth));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

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

        const config = buildRadarConfig(
          data,
          resolveUrl,
          SVG_ID,
          scale,
          colorMode,
        );

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
  }, [data, baseUrl, resolveUrl, scale, colorMode]);

  const displayWidth = Math.round(RADAR_LAYOUT_WIDTH * scale);
  const displayHeight = Math.round(RADAR_LAYOUT_HEIGHT * scale);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div
      ref={containerRef}
      className={styles.svgHost}
      style={{minHeight: displayHeight}}>
      <svg
        id={SVG_ID}
        className={styles.radarSvg}
        style={{width: displayWidth, height: displayHeight}}
      />
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
