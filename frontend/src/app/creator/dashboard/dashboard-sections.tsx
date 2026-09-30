'use client';

import Link from 'next/link';
import { useState } from 'react';
import { activities, applications, brands, campaigns, creator, formatDate, formatMoney, opportunities, socialAccounts } from './dashboard-data';
import styles from './dashboard.module.css';

const navigation = [
  ['Dashboard', 'dashboard'], ['Opportunities', 'opportunities'], ['Brands', 'brands'],
  ['Applications', 'applications'], ['Campaigns', 'campaigns'], ['Profile', 'profile'],
  ['Social Accounts', 'social-accounts'], ['Media Kit', 'media-kit'], ['Earnings', 'earnings'],
  ['Messages', 'messages'], ['Settings', 'settings'],
];

export function CreatorNavigation() {
  const [open, setOpen] = useState(false);
  return <aside className={styles.sidebar}>
    <div className={styles.brandRow}><Link href="/" className={styles.logo} aria-label="Wenza home">wenza</Link><span>Creator workspace</span></div>
    <button type="button" className={styles.menuToggle} aria-expanded={open} aria-controls="creator-navigation" onClick={() => setOpen(!open)}>Menu <span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav id="creator-navigation" aria-label="Creator navigation" className={styles.navigation} data-open={open} onKeyDown={event => {
      if (event.key === 'Escape') { setOpen(false); document.querySelector<HTMLButtonElement>(`button[aria-controls="creator-navigation"]`)?.focus(); }
    }}>
      {navigation.map(([label, route]) => <Link key={route} href={`/creator/${route}`} aria-current={route === 'dashboard' ? 'page' : undefined}>{label}</Link>)}
    </nav>
    <p className={styles.sidebarNote}>Your professional workspace</p>
  </aside>;
}

function SectionHeading({ id, title, href, linkText }: { id: string; title: string; href?: string; linkText?: string }) {
  return <div className={styles.sectionHeading}><h2 id={id}>{title}</h2>{href && <Link href={href}>{linkText}</Link>}</div>;
}

export function Overview() {
  const metrics = [
    { label: 'Active Applications', value: creator.activeApplications, href: 'applications' },
    { label: 'Active Campaigns', value: campaigns.length, href: 'campaigns' },
    { label: 'Available Earnings', value: formatMoney(creator.availableEarnings), href: 'earnings' },
    { label: 'Profile Views', value: creator.profileViews, href: 'profile' },
  ];
  return <section aria-label="Creator overview" className={styles.metrics}>
    {metrics.map(metric => <Link className={styles.metric} key={metric.label} href={`/creator/${metric.href}`}><span>{metric.label}</span><strong>{metric.value}</strong></Link>)}
  </section>;
}

export function RecommendedOpportunities() {
  return <section aria-labelledby="opportunities-title">
    <SectionHeading id="opportunities-title" title="Recommended Opportunities" href="/creator/opportunities" linkText="View All Opportunities" />
    <div className={styles.opportunityGrid}>{opportunities.map(opportunity => <article key={opportunity.id} className={styles.card}>
      <div className={styles.identity}><span className={styles.avatar} aria-hidden="true">{opportunity.initials}</span><span>{opportunity.brand}</span></div>
      <h3>{opportunity.title}</h3><p className={styles.description}>{opportunity.category} · {opportunity.location}</p>
      <dl className={styles.facts}><div><dt>Budget</dt><dd>{formatMoney(opportunity.budget)}</dd></div><div><dt>Deadline</dt><dd><time dateTime={opportunity.deadline}>{formatDate(opportunity.deadline)}</time></dd></div><div><dt>Type</dt><dd>{opportunity.type}</dd></div></dl>
      <Link href={`/creator/opportunities/${opportunity.id}`} className={styles.secondary} aria-label={`View opportunity: ${opportunity.title}`}>View Opportunity</Link>
    </article>)}</div>
  </section>;
}

export function HiringBrands() {
  return <section aria-labelledby="brands-title">
    <SectionHeading id="brands-title" title="Brands Hiring Creators" href="/creator/brands" linkText="View All Brands" />
    <div className={styles.opportunityGrid}>{brands.map(brand => <article className={styles.card} key={brand.id}>
      <div className={styles.identity}><span className={styles.avatar} aria-hidden="true">{brand.initials}</span><div><h3>{brand.name}</h3><p>{brand.industry}</p></div></div>
      <p className={styles.description}>{brand.verified ? 'Verified' : 'Not verified'} · {brand.activeOpportunities} active opportunities</p>
      <Link className={styles.secondary} href={`/creator/brands/${brand.id}`} aria-label={`View brand: ${brand.name}`}>View Brand</Link>
    </article>)}</div>
  </section>;
}

export function RecentApplications() {
  return <section className={styles.panel} aria-labelledby="applications-title">
    <SectionHeading id="applications-title" title="Recent Applications" href="/creator/applications" linkText="View Applications" />
    <ul className={styles.rows}>{applications.map(application => <li key={application.id}><div><h3>{application.title}</h3><p>{application.brand}</p></div><span className={styles.status}>{application.status}</span></li>)}</ul>
  </section>;
}

export function ActiveCampaigns() {
  return <section className={styles.panel} aria-labelledby="campaigns-title">
    <SectionHeading id="campaigns-title" title="Active Campaigns" href="/creator/campaigns" linkText="View Campaigns" />
    <ul className={styles.campaigns}>{campaigns.map(campaign => <li key={campaign.id}><div className={styles.campaignHeading}><h3>{campaign.title}</h3><span className={styles.status}>{campaign.status}</span></div><p>{campaign.brand}</p><p className={styles.deadline}>Next: {campaign.nextDeliverable} · <time dateTime={campaign.deadline}>{formatDate(campaign.deadline)}</time></p></li>)}</ul>
  </section>;
}

export function RecentActivity() {
  return <section className={styles.panel} aria-labelledby="activity-title"><SectionHeading id="activity-title" title="Recent Activity" /><ul className={styles.activity}>{activities.map(activity => <li key={activity.id}><p>{activity.text}</p><time dateTime={activity.date}>{formatDate(activity.date)}</time></li>)}</ul></section>;
}

export function ProfilePanels() {
  const connectedCount = socialAccounts.filter(account => account.connected).length;
  const profileItems = [
    { label: 'Contact Information', status: creator.contactComplete ? 'Complete' : 'Not added' },
    { label: 'Social Accounts', status: `${connectedCount} connected` },
    { label: 'Media Kit', status: creator.mediaKitComplete ? 'Complete' : 'Not added' },
    { label: 'Identity Verification', status: creator.verificationStatus },
    { label: 'Payout Details', status: creator.payoutConfigured ? 'Complete' : 'Not added' },
  ];
  return <div className={styles.profileColumn}>
    <section className={styles.completion} aria-labelledby="completion-title">
      <h2 id="completion-title">Profile completion</h2><div className={styles.progressLabel}><span>Professional profile</span><strong>{creator.profileCompletion}%</strong></div>
      <progress value={creator.profileCompletion} max={100} aria-label="Profile completion">{creator.profileCompletion}%</progress>
      <p>Still to complete</p><ul><li>Verification details</li><li>Payout details</li></ul>
      <Link href="/creator/profile" className={styles.primary}>Complete Profile</Link>
    </section>
    <section className={styles.panel} aria-labelledby="profile-title"><SectionHeading id="profile-title" title="Profile Status" /><dl className={styles.profileStatus}>{profileItems.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.status}</dd></div>)}</dl><Link href="/creator/profile" className={styles.secondary}>Manage Profile</Link></section>
    <section className={styles.panel} aria-labelledby="social-title"><SectionHeading id="social-title" title="Social Accounts" /><dl className={styles.profileStatus}>{socialAccounts.map(account => <div key={account.platform}><dt>{account.platform}</dt><dd>{account.connected ? 'Connected' : 'Not connected'}</dd></div>)}</dl><Link href="/creator/social-accounts" className={styles.secondary}>Manage Social Accounts</Link></section>
  </div>;
}
