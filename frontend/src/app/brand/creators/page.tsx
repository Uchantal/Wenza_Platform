import type { Metadata } from 'next';
import Nav from '../../nav';
import Discovery from './discovery';
import styles from './creators.module.css';

export const metadata: Metadata = { title: 'Creators | Wenza', description: 'Discover creators for your campaigns and partnerships.' };

export default function CreatorsPage() {
  return <div className={styles.page}>
    <Nav />
    <main className={styles.content}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Brand workspace</p>
        <h1>Creators</h1>
        <p>Discover verified creators for your campaigns and partnerships.</p>
        <small>Preview with sample creators and illustrative metrics.</small>
      </header>
      <Discovery />
    </main>
  </div>;
}
