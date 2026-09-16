'use client';

import { useState, type FormEvent } from 'react';
import styles from '../register/register.module.css';

export default function LoginForm() {
  const [message, setMessage] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Login is not connected yet. Your information has not been sent or saved.');
  }
  return (
    <form className={styles.form} onSubmit={submit}>
      <label htmlFor="login-email">Email address</label>
      <input id="login-email" name="email" type="email" autoComplete="username" required maxLength={254} />
      <label htmlFor="login-password">Password</label>
      <input id="login-password" name="password" type="password" autoComplete="current-password" required />
      <button className={styles.submit} type="submit">Login</button>
      <p className={styles.message} role="status">{message}</p>
    </form>
  );
}
