import BrowserOnly from '@docusaurus/BrowserOnly';
import type {ReactNode} from 'react';
import {useRadarData} from '@site/src/hooks/useRadarData';
import TechRadar from '@site/src/components/TechRadar';
import RecentlyChanged from '@site/src/components/RecentlyChanged';

import styles from './styles.module.css';

function RadarHomeContent(): ReactNode {
  const {data, loading, error} = useRadarData();

  if (loading) {
    return <p className={styles.status}>Loading radar…</p>;
  }

  if (error || !data) {
    return (
      <p className={styles.error} role="alert">
        {error ?? 'Radar data is unavailable. Run npm run build from the repository root.'}
      </p>
    );
  }

  return (
    <>
      <TechRadar data={data} />
      <RecentlyChanged items={data.recentlyChanged} />
    </>
  );
}

export default function RadarHome(): ReactNode {
  return (
    <BrowserOnly fallback={<p className={styles.status}>Loading radar…</p>}>
      {() => <RadarHomeContent />}
    </BrowserOnly>
  );
}
