import type { Metadata } from 'next';
import Nav from '../nav';
import Form from './form';
import styles from '../register/register.module.css';

export const metadata: Metadata = { title: 'Login | Wenza', description: 'Log in to your Wenza account.' };

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <Nav />
      <section className={styles.register} aria-labelledby="login-title">
        <div className={styles.card}>
          <h1 id="login-title">Login</h1>
          <Form />
          <p className={styles.caption}>New to Wenza? <a href="/register">Join the network</a></p>
        </div>
      </section>
    </main>
  );
}
