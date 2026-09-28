'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './nav.module.css';

const links = [
  { href: '/#creators', label: 'Creators' },
  { href: '/#brands', label: 'Brands' },
  { href: '/#opportunities', label: 'Opportunities' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (!dropdown.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <a className={styles.logo} href="/" aria-label="Wenza home">wenza</a>
      <nav aria-label="Main navigation">
        <ul className={styles.links}>
          {links.map(({ href, label }) => <li key={href}><a href={href}>{label}</a></li>)}
        </ul>
      </nav>
      <div className={styles.actions}>
        <a className={styles.join} href="/register">Join network</a>
        <div className={styles.dropdown} ref={dropdown} onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
        }}>
          <div className={styles.signInGroup}>
            <a className={styles.signIn} href="/login">Sign in</a>
            <button ref={trigger} className={styles.dropdownToggle} type="button" aria-label="Sign in options" aria-expanded={open} aria-controls="sign-in-options" onClick={() => setOpen(value => !value)}><span aria-hidden="true">⌄</span></button>
          </div>
          {open && <div className={styles.dropdownPanel} id="sign-in-options"><a href="/login" onClick={() => setOpen(false)}>Login<small>Already have an account?</small></a></div>}
        </div>
      </div>
    </header>
  );
}
