import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import type {ReactNode} from 'react';

import styles from './styles.module.css';

export type EntryDetailHeaderProps = {
  name: string;
  ring: string;
  ringLabel: string;
  quadrant: string;
  quadrantLabel: string;
  owners: string[];
  pocRepo: string;
  status: string;
  ringChanged: string;
};

const RING_BADGE_CLASS: Record<string, string | undefined> = {
  adopt: styles.ringAdopt,
  trial: styles.ringTrial,
  assess: styles.ringAssess,
  hold: styles.ringHold,
};

function ringClass(ring: string): string {
  return RING_BADGE_CLASS[ring] ?? '';
}

function ownerProfileUrl(username: string): string {
  return `https://github.com/${username}`;
}

function pocRepoLabel(url: string): string {
  try {
    const {pathname} = new URL(url);
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
  } catch {
    /* use full url below */
  }
  return url;
}

export default function EntryDetailHeader({
  name,
  ring,
  ringLabel,
  quadrantLabel,
  owners,
  pocRepo,
  status,
  ringChanged,
}: EntryDetailHeaderProps): ReactNode {
  const isArchived = status === 'archived';

  return (
    <header className={styles.header}>
      <div className={styles.badges}>
        <span className={`${styles.badge} ${ringClass(ring)}`}>{ringLabel}</span>
        <span className={styles.quadrantBadge}>{quadrantLabel}</span>
        {isArchived ? (
          <span className={styles.archivedBadge}>Archived</span>
        ) : null}
      </div>

      <Heading as="h1" className={styles.title}>
        {name}
      </Heading>

      <p className={styles.meta}>
        Ring since <time dateTime={ringChanged}>{ringChanged}</time>
      </p>

      <div className={styles.actions}>
        <Link
          className="button button--primary button--lg"
          href={pocRepo}
          target="_blank"
          rel="noopener noreferrer">
          View PoC repository ({pocRepoLabel(pocRepo)})
        </Link>
      </div>

      {owners.length > 0 ? (
        <div className={styles.owners}>
          <span className={styles.ownersLabel}>Owners</span>
          <ul className={styles.ownerList}>
            {owners.map((owner) => (
              <li key={owner}>
                <Link href={ownerProfileUrl(owner)} target="_blank" rel="noopener noreferrer">
                  @{owner}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
