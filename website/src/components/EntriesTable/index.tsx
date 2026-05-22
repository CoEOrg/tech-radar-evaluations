import {useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import type {RadarEntry} from '@site/src/types/radar-data';

import styles from './styles.module.css';

type EntriesTableProps = {
  entries: RadarEntry[];
  rings: {id: string; label: string}[];
  quadrants: {id: string; label: string}[];
};

type SortKey = 'name' | 'ring' | 'quadrant' | 'ring_changed' | 'status';
type SortDir = 'asc' | 'desc';

const RING_BADGE_CLASS: Record<string, string | undefined> = {
  adopt: styles.ringAdopt,
  trial: styles.ringTrial,
  assess: styles.ringAssess,
  hold: styles.ringHold,
};

function ringClass(ring: string): string {
  return RING_BADGE_CLASS[ring] ?? '';
}

function compareEntries(a: RadarEntry, b: RadarEntry, key: SortKey, dir: SortDir): number {
  let result = 0;
  switch (key) {
    case 'name':
      result = a.name.localeCompare(b.name, undefined, {sensitivity: 'base'});
      break;
    case 'ring':
      result = a.ringIndex - b.ringIndex || a.name.localeCompare(b.name);
      break;
    case 'quadrant':
      result =
        a.quadrantIndex - b.quadrantIndex || a.name.localeCompare(b.name);
      break;
    case 'ring_changed':
      result = a.ring_changed.localeCompare(b.ring_changed);
      break;
    case 'status':
      result = a.status.localeCompare(b.status) || a.name.localeCompare(b.name);
      break;
    default:
      break;
  }
  return dir === 'asc' ? result : -result;
}

function matchesSearch(entry: RadarEntry, query: string): boolean {
  if (!query) {
    return true;
  }
  const haystack = [
    entry.name,
    entry.summary,
    entry.quadrantLabel,
    entry.ringLabel,
    ...entry.tags,
    ...entry.owners,
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
}

function SortHeader({
  label,
  sortKey,
  activeKey,
  sortDir,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}) {
  const active = activeKey === sortKey;
  const indicator = active ? (sortDir === 'asc' ? ' ▲' : ' ▼') : '';

  return (
    <th scope="col">
      <button
        type="button"
        className={styles.sortButton}
        onClick={() => onSort(sortKey)}
        aria-sort={active ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}>
        {label}
        {indicator}
      </button>
    </th>
  );
}

export default function EntriesTable({entries, rings, quadrants}: EntriesTableProps) {
  const [ringFilter, setRingFilter] = useState('all');
  const [quadrantFilter, setQuadrantFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'ring_changed' ? 'desc' : 'asc');
    }
  };

  const searchLower = search.trim().toLowerCase();

  const visible = useMemo(() => {
    const filtered = entries.filter((entry) => {
      if (ringFilter !== 'all' && entry.ring !== ringFilter) {
        return false;
      }
      if (quadrantFilter !== 'all' && entry.quadrant !== quadrantFilter) {
        return false;
      }
      if (statusFilter !== 'all' && entry.status !== statusFilter) {
        return false;
      }
      return matchesSearch(entry, searchLower);
    });

    return [...filtered].sort((a, b) => compareEntries(a, b, sortKey, sortDir));
  }, [entries, ringFilter, quadrantFilter, statusFilter, searchLower, sortKey, sortDir]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters} role="search">
        <label className={styles.filterField}>
          <span className={styles.filterLabel}>Search</span>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Name, tags, owners, summary…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <label className={styles.filterField}>
          <span className={styles.filterLabel}>Ring</span>
          <select
            className={styles.select}
            value={ringFilter}
            onChange={(e) => setRingFilter(e.target.value)}>
            <option value="all">All rings</option>
            {rings.map((ring) => (
              <option key={ring.id} value={ring.id}>
                {ring.label}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.filterField}>
          <span className={styles.filterLabel}>Quadrant</span>
          <select
            className={styles.select}
            value={quadrantFilter}
            onChange={(e) => setQuadrantFilter(e.target.value)}>
            <option value="all">All quadrants</option>
            {quadrants.map((quadrant) => (
              <option key={quadrant.id} value={quadrant.id}>
                {quadrant.label}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.filterField}>
          <span className={styles.filterLabel}>Status</span>
          <select
            className={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </label>
      </div>

      <p className={styles.count} aria-live="polite">
        Showing {visible.length} of {entries.length} entries
      </p>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <SortHeader
                label="Name"
                sortKey="name"
                activeKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
              <SortHeader
                label="Ring"
                sortKey="ring"
                activeKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
              <SortHeader
                label="Quadrant"
                sortKey="quadrant"
                activeKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
              <SortHeader
                label="Ring changed"
                sortKey="ring_changed"
                activeKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
              <SortHeader
                label="Status"
                sortKey="status"
                activeKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
              <th scope="col">Owners</th>
              <th scope="col">Summary</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.empty}>
                  No entries match the current filters.
                </td>
              </tr>
            ) : (
              visible.map((entry) => (
                <tr key={entry.slug}>
                  <td>
                    <Link className={styles.nameLink} to={entry.docRoute}>
                      {entry.name}
                    </Link>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${ringClass(entry.ring)}`}>
                      {entry.ringLabel}
                    </span>
                  </td>
                  <td>{entry.quadrantLabel}</td>
                  <td>
                    <time dateTime={entry.ring_changed}>{entry.ring_changed}</time>
                  </td>
                  <td className={styles.statusCell}>{entry.status}</td>
                  <td className={styles.ownersCell}>
                    {entry.owners.map((owner) => (
                      <a
                        key={owner}
                        href={`https://github.com/${owner}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        @{owner}
                      </a>
                    ))}
                  </td>
                  <td className={styles.summaryCell}>{entry.summary}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
