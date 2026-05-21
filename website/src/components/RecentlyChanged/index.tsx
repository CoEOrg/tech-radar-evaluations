import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import type {RecentlyChanged as RecentlyChangedItem} from '@site/src/types/radar-data';
import {docRouteForSlug} from '@site/src/lib/radar-viz';

import styles from './styles.module.css';

type RecentlyChangedProps = {
  items: RecentlyChangedItem[];
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

export default function RecentlyChanged({items}: RecentlyChangedProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="recently-changed-heading">
      <Heading as="h2" id="recently-changed-heading" className={styles.title}>
        Recently changed
      </Heading>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.slug} className={styles.item}>
            <Link className={styles.name} to={docRouteForSlug(item.slug)}>
              {item.name}
            </Link>
            <span className={`${styles.badge} ${ringClass(item.ring)}`}>
              {item.ringLabel}
            </span>
            <span className={styles.meta}>{item.quadrantLabel}</span>
            <span className={styles.meta}>{item.ring_changed}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
