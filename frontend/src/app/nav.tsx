'use client';

import Link from 'next/link';
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
          <button ref={trigger} className={styles.signIn} type="button" aria-expanded={open} aria-controls="sign-in-options" onClick={() => setOpen(value => !value)}>
            Sign in <span aria-hidden="true">⌄</span>
          </button>
          <div className={styles.dropdownPanel} id="sign-in-options" hidden={!open}>
            <Link href="/register" onClick={() => setOpen(false)}>Register<small>Create a new account</small></Link>
            <Link href="/login" onClick={() => setOpen(false)}>Login<small>Already have an account?</small></Link>
          </div>
        </div>
      </div>
    </header>
  );
}
