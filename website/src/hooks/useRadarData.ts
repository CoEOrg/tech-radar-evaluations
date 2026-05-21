import {useEffect, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {RadarData} from '@site/src/types/radar-data';

type UseRadarDataResult = {
  data: RadarData | null;
  loading: boolean;
  error: string | null;
};

export function useRadarData(): UseRadarDataResult {
  const baseUrl = useBaseUrl('/');
  const [data, setData] = useState<RadarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`${baseUrl}radar-data.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load radar data (${response.status})`);
        }
        return response.json() as Promise<RadarData>;
      })
      .then((json) => {
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Failed to load radar data';
          setError(message);
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [baseUrl]);

  return {data, loading, error};
}
