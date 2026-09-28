'use client';

import { useState, type KeyboardEvent } from 'react';
import styles from './landing.module.css';

export function HeroHeading() {
  const [audience, setAudience] = useState('Creators');
  return <div className={styles.heroHeading}>
    <h1 id="hero-title">The Goldmine<br />For <span>{audience}</span></h1>
    <div className={styles.audiences} aria-label="Choose your audience">
      {['Creators', 'Brands', 'Communities'].map((name, index) => <button key={name} type="button" aria-pressed={audience === name} onClick={() => setAudience(name)}>{`0${index + 1} / ${name}`}</button>)}
    </div>
  </div>;
}

const benefits = [
  [
    { title: 'No More Missed Messages due to Flooded DMs', text: 'Brands know exactly where to find you, so replies are fast and bookings happen quicker.', icon: '43-478-imgCheckCircle.svg', size: 32 },
    { title: 'Get Paid Without Chasing Brands', text: 'Opportunities come to you, so you spend less time pitching and more time creating.', icon: '43-478-imgFrame.svg', size: 48 },
    { title: 'Small Following, Real Income', text: 'Get verified by how active and genuine you are, not by how many followers you have.', icon: '43-478-imgFrame1.svg', size: 48 },
  ],
  [
    { title: "Stop Guessing Who's Actually Trustworthy", text: 'Find reliable creators who genuinely fit your campaign, not just big follower counts.', icon: '43-264-imgCheckCircle1.svg', size: 32 },
    { title: 'No More Cold Outreach', text: 'Post a gig and let the right creators come to you.', icon: '43-264-imgBriefcaseBusiness.svg', size: 24 },
    { title: 'Know Before You Pay', text: "See a creator's real activity and reputation before a single dollar moves.", icon: '43-264-imgUsers.svg', size: 24 },
  ],
  [
    { title: 'Never Miss What They Recommend', text: 'See everything your favorite creator or brand sells or supports, all in one place.', icon: '43-324-imgFrame2.svg', size: 48 },
    { title: 'Support with Confidence', text: 'Send a gift, buy something from their wishlist, or join their community.', icon: '43-324-imgFrame3.svg', size: 48 },
    { title: 'Get Closer, Be More Than a Follower', text: "Access exclusive updates you won't see anywhere else.", icon: '43-324-imgGroup.svg', size: 26 },
  ],
];

export function Benefits() {
  const [selected, setSelected] = useState(0);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % 3;
    else if (event.key === 'ArrowLeft') next = (index + 2) % 3;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = 2;
    else return;
    event.preventDefault();
    setSelected(next);
    document.getElementById(`benefit-tab-${next}`)?.focus();
  }
  return <>
    <div className={styles.tabs} role="tablist" aria-label="Benefits by audience">
      {['For Creators', 'For Brands', 'For Community'].map((label, index) => <button key={label} type="button" role="tab" id={`benefit-tab-${index}`} aria-controls="benefit-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => navigate(event, index)}>{label}</button>)}
    </div>
    <div className={styles.benefitGrid} role="tabpanel" id="benefit-panel" aria-labelledby={`benefit-tab-${selected}`} tabIndex={0}>
      {(benefits[selected] ?? []).map(benefit => <article className={styles.benefitCard} key={benefit.title}>
        <div className={styles.benefitIcon}><img src={`/images/figma/${benefit.icon}`} alt="" width={benefit.size} height={benefit.size} style={{ width: `${benefit.size / 48 * 100}%`, height: `${benefit.size / 48 * 100}%` }} /></div>
        <div><h3>{benefit.title}</h3><p>{benefit.text}</p></div>
      </article>)}
    </div>
  </>;
}
