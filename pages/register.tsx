import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/LogReg.module.css';

function Register() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Layout title="Register">
      <div className={styles.container}>
        <h2 style={{ fontFamily: 'Julius Sans One', textAlign: 'center' }}>
          Register
        </h2>
        <form
          className={styles.form}
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch('/api/register', {
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
            if (result.success) {
              alert('User Created!');
            }
            router.push({
              pathname: '/',
            });
          }}
        >
          <div>
            <div className={styles.control}>
              <label className={styles.label}>Username</label>
              <input
                className={styles.input}
                required
                placeholder="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className={styles.control}>
              <label className={styles.label}>Password</label>
              <input
                className={styles.input}
                type="password"
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

export default Register;
