import type { Metadata } from 'next';
import { ActiveCampaigns, CreatorNavigation, HiringBrands, Overview, ProfilePanels, RecentActivity, RecentApplications, RecommendedOpportunities } from './dashboard-sections';
import { creator } from './dashboard-data';
import styles from './dashboard.module.css';

export const metadata: Metadata = { title: 'Creator Dashboard | Wenza', description: 'Manage your opportunities, profile and creator activity.' };

export default function CreatorDashboard() {
  return <div className={styles.workspace}>
    <a className={styles.skipLink} href="#dashboard-content">Skip to dashboard</a>
    <CreatorNavigation />
    <main id="dashboard-content" className={styles.main} tabIndex={-1}>
      <header className={styles.welcome}><p className={styles.eyebrow}>Dashboard</p><h1>Welcome back, {creator.displayName}</h1><p>Manage your opportunities, profile and creator activity.</p><small>Sample workspace · Fictional brands and illustrative activity.</small></header>
      <Overview />
      <div className={styles.dashboardGrid}>
        <div className={styles.primaryColumn}>
          <RecommendedOpportunities />
          <HiringBrands />
          <RecentApplications />
          <ActiveCampaigns />
          <RecentActivity />
        </div>
        <ProfilePanels />
      </div>
    </main>
  </div>;
}
