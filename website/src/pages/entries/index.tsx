import BrowserOnly from '@docusaurus/BrowserOnly';
import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {useRadarData} from '@site/src/hooks/useRadarData';
import EntriesTable from '@site/src/components/EntriesTable';

import styles from './styles.module.css';

function EntriesPageContent(): ReactNode {
  const {data, loading, error} = useRadarData();

  if (loading) {
    return <p className={styles.status}>Loading entries…</p>;
  }

  if (error || !data) {
    return (
      <p className={styles.error} role="alert">
        {error ?? 'Radar data is unavailable. Run npm run prepare:radar from the repository root.'}
      </p>
    );
  }

  return (
    <EntriesTable
      entries={data.entries}
      rings={data.rings}
      quadrants={data.quadrants}
    />
  );
}

export default function EntriesPage(): ReactNode {
  return (
    <Layout
      title="All entries"
      description="Sortable list of all technologies on the SoftServe Tech Radar.">
      <main className="container margin-vert--lg">
        <header className={styles.header}>
          <Heading as="h1">All entries</Heading>
          <p className={styles.lead}>
            Sort and filter every technology on the radar. Click a name to open the full
            evaluation.
          </p>
        </header>
        <BrowserOnly fallback={<p className={styles.status}>Loading entries…</p>}>
          {() => <EntriesPageContent />}
        </BrowserOnly>
      </main>
    </Layout>
  );
}
