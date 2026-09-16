'use client';

import { useState, type FormEvent } from 'react';
import styles from './register.module.css';

function Password({ confirm = false }: { confirm?: boolean }) {
  const [visible, setVisible] = useState(false);
  const id = confirm ? 'confirm-password' : 'password';
  const label = confirm ? 'Confirm password' : 'Password';
  return (
    <div className={styles.password}>
      <label className={styles.hidden} htmlFor={id}>{label}</label>
      <input id={id} name={id} type={visible ? 'text' : 'password'} autoComplete="new-password" placeholder={label} required minLength={8} maxLength={128} aria-describedby="password-help" onInput={event => event.currentTarget.setCustomValidity('')} />
      <button type="button" onClick={() => setVisible(!visible)} aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`} aria-pressed={visible} aria-controls={id}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>{visible && <path d="m3 3 18 18"/>}</svg>
      </button>
    </div>
  );
}

export default function Form() {
  const [message, setMessage] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const confirm = form.elements.namedItem('confirm-password') as HTMLInputElement;
    if (data.get('password') !== data.get('confirm-password')) {
      confirm.setCustomValidity('Passwords do not match.');
      confirm.reportValidity();
      return;
    }
    setMessage('Registration is not connected yet. Your information has not been sent or saved.');
  }
  return (
    <form className={styles.form} onSubmit={submit}>
      <label className={styles.hidden} htmlFor="full-name">Full name</label>
      <input id="full-name" name="fullName" autoComplete="name" placeholder="Full name" required maxLength={150} pattern=".*\S.*" aria-describedby="name-help" />
      <small id="name-help">Use your full name as shown on your identity documents for later identity and payment verification.</small>
      <label className={styles.hidden} htmlFor="username">Social media username</label>
      <input id="username" name="username" autoComplete="username" placeholder="Social media username" required maxLength={100} pattern="@?[^\s@]+" aria-describedby="username-help" />
      <small id="username-help">Use the username from your main creator social media account.</small>
      <label className={styles.hidden} htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="email" placeholder="Email address" required maxLength={254} />
      <Password />
      <Password confirm />
      <small id="password-help">Use at least 8 characters.</small>
      <button className={styles.submit} type="submit">Register</button>
      <p className={styles.caption}>Or sign up with</p>
      <div className={styles.providers}>
        <button type="button" className={styles.google} aria-label="Sign in with Google (coming soon)" disabled title="Google sign-in is not connected yet">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"/><path d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"/><path d="M6.41 13.92A6 6 0 0 1 6.1 12c0-.67.11-1.32.31-1.92V7.49H3.07A10 10 0 0 0 2 12c0 1.61.39 3.14 1.07 4.51l3.34-2.59Z"/><path d="M12 5.96c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.93 5.49l3.34 2.59C7.2 7.72 9.4 5.96 12 5.96Z"/></svg>
        </button>
        <button type="button" className={styles.facebook} aria-label="Sign in with Facebook (coming soon)" disabled title="Facebook sign-in is not connected yet">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4A25 25 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9Z"/></svg>
        </button>
        <button type="button" className={styles.apple} aria-label="Sign in with Apple (coming soon)" disabled title="Apple sign-in is not connected yet">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.8 1.5c.2 1.5-.5 3-1.4 3.9-.9 1-2.3 1.6-3.7 1.5-.2-1.4.5-2.8 1.4-3.8 1-1 2.4-1.6 3.7-1.6ZM20.8 17.4c-.5 1.2-.8 1.7-1.5 2.8-1 1.4-2.3 3.1-4 3.1-1.5 0-1.9-1-4-1s-2.6 1-4 1c-1.6 0-2.8-1.5-3.8-2.9C.8 16.4.4 10.8 3 8.3c1.6-1.5 4-1.8 5.8-1 1 .4 1.6.7 2.4.7.7 0 1.3-.3 2.4-.7 1.6-.6 3.8-.8 5.5.5.5.4.9.8 1.3 1.3-3.3 1.8-2.8 6.5.4 8.3Z"/></svg>
        </button>
        <button type="button" className={styles.instagram} aria-label="Sign in with Instagram (not connected)" disabled title="Instagram integration is not connected">
          <svg className={styles.instagramIcon} viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle className={styles.dot} cx="17.5" cy="6.5" r="1"/></svg>
        </button>
        <button type="button" className={styles.tiktok} aria-label="Sign in with TikTok (not connected)" disabled title="TikTok sign-in is not connected">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2h3a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.7V16a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3Z"/></svg>
        </button>
      </div>
      <p className={styles.message} role="status">{message}</p>
    </form>
  );
}
