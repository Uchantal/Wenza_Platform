'use client';

import Link from 'next/link';
import { useState } from 'react';
import Dropdown from '../../dropdown';
import { creators, formatFollowerCount, type Creator } from './creators';
import styles from './creators.module.css';

const filterOptions = {
  category: [...new Set(creators.map(creator => creator.category))].sort(),
  country: [...new Set(creators.map(creator => creator.country))].sort(),
  platform: [...new Set(creators.flatMap(creator => creator.platforms.map(platform => platform.name)))].sort(),
  reach: ['Under 50K', '50K–250K', 'Over 250K'],
  engagement: ['3% or more', '5% or more', '7% or more'],
  creatorType: ['Creator', 'Influencer', 'Creator & Influencer'],
  status: ['Active', 'Verified'],
};
const labels = { category: 'Category', country: 'Country', platform: 'Platform', reach: 'Reach', engagement: 'Engagement', creatorType: 'Creator Type', status: 'Status' };
type FilterKey = keyof typeof filterOptions;
type Filters = Record<FilterKey, string>;
const emptyFilters: Filters = { category: '', country: '', platform: '', reach: '', engagement: '', creatorType: '', status: '' };
const sortOptions = ['Recommended', 'Highest engagement', 'Largest reach', 'Recently active'];

function filterCreators(items: Creator[], query: string, filters: Filters) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return items.filter(creator => {
    const searchable = [creator.displayName, creator.category, creator.country, ...creator.tags].join(' ').toLowerCase();
    if (!words.every(word => searchable.includes(word))) return false;
    if (filters.category && creator.category !== filters.category) return false;
    if (filters.country && creator.country !== filters.country) return false;
    if (filters.platform && !creator.platforms.some(platform => platform.name === filters.platform)) return false;
    if (filters.creatorType === 'Creator & Influencer' && creator.creatorTypes.length !== 2) return false;
    if (filters.creatorType === 'Creator' && !creator.creatorTypes.includes('Creator')) return false;
    if (filters.creatorType === 'Influencer' && !creator.creatorTypes.includes('Influencer')) return false;
    if (filters.status === 'Active' && !creator.active) return false;
    if (filters.status === 'Verified' && !creator.verified) return false;
    if (filters.reach === 'Under 50K' && creator.combinedFollowers >= 50000) return false;
    if (filters.reach === '50K–250K' && (creator.combinedFollowers < 50000 || creator.combinedFollowers > 250000)) return false;
    if (filters.reach === 'Over 250K' && creator.combinedFollowers <= 250000) return false;
    if (filters.engagement && creator.engagementRate < Number.parseFloat(filters.engagement)) return false;
    return true;
  });
}

function sortCreators(items: Creator[], sort: string) {
  return [...items].sort((a, b) => {
    if (sort === 'Highest engagement') return b.engagementRate - a.engagementRate;
    if (sort === 'Largest reach') return b.combinedFollowers - a.combinedFollowers;
    if (sort === 'Recently active') return b.lastActiveAt.localeCompare(a.lastActiveAt);
    return 0;
  });
}

function CreatorCard({ creator }: { creator: Creator }) {
  const [inviteMessage, setInviteMessage] = useState('');
  return <article className={styles.card} aria-labelledby={`creator-${creator.id}`}>
    <header className={styles.identity}>
      {creator.profileImage ? <img className={styles.avatar} src={creator.profileImage} alt={`${creator.displayName} profile`} width={48} height={48} /> : <span className={styles.avatar} aria-hidden="true">{creator.displayName.split(' ').map(part => part[0]).join('')}</span>}
      <div><h2 id={`creator-${creator.id}`}>{creator.displayName}</h2><p>{creator.category} · {creator.country}</p></div>
    </header>
    <p className={styles.status}>{creator.verified ? 'Verified' : 'Not verified'} <span aria-hidden="true">·</span> {creator.active ? 'Active' : 'Inactive'}</p>
    <p className={styles.creatorType}>{creator.creatorTypes.join(' & ')}</p>
    <dl className={styles.metrics}>
      <div><dt>Combined reach</dt><dd>{formatFollowerCount(creator.combinedFollowers)}</dd></div>
      <div><dt>Engagement</dt><dd>{creator.engagementRate}%</dd></div>
    </dl>
    <ul className={styles.platforms} aria-label={`${creator.displayName} platform followers`}>
      {creator.platforms.map(platform => <li key={platform.name}><span>{platform.name}</span><strong>{formatFollowerCount(platform.followers)}</strong></li>)}
    </ul>
    <ul className={styles.tags} aria-label="Specialties">{creator.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
    <div className={styles.cardActions}>
      <Link href={`/brand/creators/${creator.id}`} className={styles.secondary} aria-label={`View ${creator.displayName}'s profile`}>View Profile</Link>
      <button className={styles.primary} type="button" aria-label={`Invite ${creator.displayName}`} onClick={() => setInviteMessage('Invitations are not available yet. No invitation was sent.')}>Invite</button>
    </div>
    {inviteMessage && <p className={styles.notice} role="status">{inviteMessage}</p>}
  </article>;
}

export default function Discovery() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState('Recommended');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeCount = Object.values(filters).filter(Boolean).length;
  const results = sortCreators(filterCreators(creators, query, filters), sort);
  function clearFilters() { setFilters(emptyFilters); setQuery(''); }
  return <>
    <section className={styles.filterArea} aria-label="Find creators">
      <div className={styles.searchRow}>
        <div className={styles.search}><label htmlFor="creator-search">Search creators</label><input id="creator-search" type="search" placeholder="Search creators by name, category or keyword" value={query} onChange={event => setQuery(event.target.value)} /></div>
        <button type="button" className={styles.filterToggle} aria-expanded={filtersOpen} aria-controls="creator-filters" onClick={() => setFiltersOpen(!filtersOpen)}>Filters{activeCount ? ` (${activeCount})` : ''}</button>
      </div>
      <div id="creator-filters" className={styles.filters} data-open={filtersOpen}>
        {(Object.keys(filterOptions) as FilterKey[]).map(key => <div key={key} className={styles.field}>
          <label htmlFor={`filter-${key}`}>{labels[key]}</label>
          <Dropdown id={`filter-${key}`} name={key} placeholder={labels[key]} required={false} value={filters[key]} onChange={value => setFilters(previous => ({ ...previous, [key]: value }))} options={[{ value: '', label: 'All' }, ...filterOptions[key].map(value => ({ value, label: value }))]} />
        </div>)}
      </div>
      {(activeCount > 0 || query) && <button className={styles.clear} type="button" onClick={clearFilters}>Clear filters</button>}
    </section>
    <div className={styles.toolbar}>
      <p role="status" aria-live="polite"><strong>{results.length}</strong> {results.length === 1 ? 'creator' : 'creators'} found</p>
      <div className={styles.sort}><label htmlFor="creator-sort">Sort by</label><Dropdown id="creator-sort" name="sort" placeholder="Sort by" required={false} value={sort} onChange={setSort} options={sortOptions.map(value => ({ value, label: value }))} /></div>
    </div>
    <p className={styles.reachNote}>Combined reach sums platform followers; it is not a unique audience count.</p>
    {results.length ? <section className={styles.grid} aria-label="Creator results">{results.map(creator => <CreatorCard key={creator.id} creator={creator} />)}</section> : <section className={styles.empty}><h2>No creators found</h2><p>Try a different search or clear your filters.</p><button type="button" className={styles.secondary} onClick={clearFilters}>Clear filters</button></section>}
  </>;
}
