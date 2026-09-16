import type { Metadata } from 'next';
import Nav from '../nav';
import Form from './form';
import styles from './register.module.css';

export const metadata: Metadata = {
  title: 'Register | Wenza',
  description: 'Join Wenza as a creator or brand.',
};

export default function RegisterPage() {
  return (
    <main className={styles.page}>
      <Nav />
      <section className={styles.register} aria-labelledby="register-title">
        <div className={styles.card}>
          <h1 id="register-title">Join the network</h1>
          <p>Create your Wenza account.</p>
          <Form />
          <p className={styles.caption}>Already have an account? <a href="/login">Login</a></p>
        </div>
      </section>
    </main>
  );
}
