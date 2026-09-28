import Link from 'next/link';
import Nav from './nav';
import { Benefits, HeroHeading } from './landing-interactions';
import styles from './landing.module.css';

function Actions() {
  return <div className={styles.actions}>
    <a className={styles.primary} href="/register">Join network <img src="/images/figma/4-16-imgArrowRight.svg" alt="" width={14} height={14} /></a>
    <a className={styles.secondary} href="#creators">Find creators</a>
  </div>;
}

const creators = [
  { name: 'MrBeast', description: 'Most Subscribed YouTuber', image: '4-43-imgEllipse2.png' },
  { name: 'Khaby Lame', description: 'Most Followed TikToker', image: '4-43-imgEllipse3.png' },
  { name: 'Marques Brownlee', description: 'Premier Tech Reviewer', image: '4-43-imgEllipse4.png' },
  { name: 'Kai Cenat', description: 'Top Twitch Streamer', image: '4-43-imgEllipse5.png' },
];

const paths = [
  { name: 'Creators', id: 'creator-path', icon: '4-49-imgSparkle.svg', steps: ['Join the platform', 'Get Verified', 'Start Making Money'] },
  { name: 'Brands', id: 'brands', icon: '4-49-imgBuilding.svg', steps: ['Join the platform', 'Get Verified (as a business)', 'Explore Creators (with the help of AI)'] },
  { name: 'Community', id: 'community', icon: '4-49-imgUsers.svg', steps: ['Join the platform', 'Browse Creators', 'Enjoy the Exclusives'] },
];

const footerGroups = [
  { title: 'Platform', items: [{ label: 'Creators', href: '#creators' }, { label: 'Brands', href: '#brands' }, { label: 'Community', href: '#community' }, { label: 'Pricing' }] },
  { title: 'Company', items: [{ label: 'About Us', href: '#about' }, { label: 'Careers' }, { label: 'Newsroom' }, { label: 'Contact' }] },
  { title: 'Security & Trust', items: [{ label: 'Verification System' }, { label: 'Platform Guard' }, { label: 'Privacy Shield' }, { label: 'Terms of Service' }] },
];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <Nav />
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.tag}>One trusted platform for everyone</p>
          <HeroHeading />
          <p className={styles.intro}>Creators, Brands, and Their Communities,<br className={styles.desktopBreak} /> Together on One Trusted Platform.</p>
          <Actions />
        </div>
        <img className={styles.heroImage} src="/images/figma/4-16-imgImagePng2K202609150824461.png" alt="Wenza storefront, brand deals, target views, payments, and digital monetization tools" width={816} height={816} fetchPriority="high" />
      </section>

      <section className={styles.philosophy} id="about" aria-labelledby="philosophy-title">
        <div className={styles.statement}>
          <p className={styles.tag}>Our Philosophy</p>
          <h2 id="philosophy-title">wenza has a place for you.</h2>
          <p>Whether you make content, want to work with creators, or just want to support someone you follow, Wenza has a place for you.</p>
        </div>
        <div className={styles.creators} id="creators">
          {creators.map(creator => <article key={creator.name} className={styles.creator}>
            <img className={styles.portrait} src={`/images/figma/${creator.image}`} alt={creator.name} width={218} height={218} loading="lazy" />
            <h3>{creator.name}<img className={styles.verified} src="/images/figma/4-43-imgVerifiedAccount.png" alt="Verified" width={25} height={33} loading="lazy" /></h3>
            <p>{creator.description}</p>
          </article>)}
        </div>
      </section>

      <section className={styles.how} id="opportunities" aria-labelledby="how-title">
        <div className={styles.sectionHeading}><p className={styles.tag}>How it works</p><h2 id="how-title">Three paths, one platform</h2></div>
        <div className={styles.paths}>
          {paths.map(path => <article className={styles.path} key={path.id} id={path.id}>
            <div className={styles.pathIcon}><img src={`/images/figma/${path.icon}`} alt="" width={24} height={24} loading="lazy" /></div>
            <h3>{path.name}</h3>
            <ol>{path.steps.map(step => <li key={step}>{step}</li>)}</ol>
          </article>)}
        </div>
      </section>

      <section className={styles.mission} aria-labelledby="mission-title">
        <p className={styles.tag}>Our Mission</p>
        <h2 id="mission-title">We&apos;re in the business of making the hard parts easy.</h2>
        <Benefits />
      </section>

      <section className={styles.closing} aria-labelledby="join-title">
        <p className={styles.tag}>Secure your invite</p>
        <h2 id="join-title">Wanna be part of the network ?</h2>
        <Actions />
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <a href="/" className={styles.footerLogo} aria-label="Wenza home">wenza<span>.</span></a>
            <p>Connecting creators, brands, and communities under a single unified, trusted platform.</p>
          </div>
          <div className={styles.footerGroups}>{footerGroups.map(group => <div className={styles.footerGroup} key={group.title}>
            <h3>{group.title}</h3>
            {group.items.map(item => 'href' in item ? <a key={item.label} href={item.href}>{item.label}</a> : <span key={item.label}>{item.label}</span>)}
          </div>)}</div>
        </div>
        <div className={styles.footerBottom}><p>© 2026 Wenza platform Inc. All rights reserved.</p><nav className={styles.socials} aria-label="Wenza social media">
          <Link href="https://x.com/wenzaapp" aria-label="Wenza on X">X</Link>
          <Link href="https://www.instagram.com/wenzahq" aria-label="Wenza on Instagram">Instagram</Link>
          <Link href="https://facebook.com/wenzaapp" aria-label="Wenza on Facebook">Facebook</Link>
          <span>YouTube</span>
        </nav></div>
      </footer>
    </main>
  );
}
