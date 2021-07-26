import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/LogReg.module.css';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Layout title="Login">
      <div className={styles.container}>
        <h2 style={{ fontFamily: 'Julius Sans One', textAlign: 'center' }}>
          Login
        </h2>
        <form
          className={styles.form}
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                password: password,
              }),
            });
            const result = await response.json();
            if (!result.success) {
              setUsername('');
              setPassword('');
              alert('Invalid credentials!');
              router.push({
                pathname: '/register',
              });
            } else {
              alert('Login successful!');
              router.push({
                pathname: '/',
              });
            }
          }}
        >
          <div>
            <div className={styles.control}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                className={styles.input}
                type="text"
                id="username"
                placeholder="username"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className={styles.control}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                className={styles.input}
                type="password"
                id="password"
                required
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <button className={styles.inputBtn}>Submit</button>
        </form>
      </div>
    </Layout>
  );
}
