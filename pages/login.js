import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Layout title="Login">
      <div>
        <form
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
            }
          }}
        >
          <div>
            <div>
              <label>Login Username</label>
              <input
                placeholder="Username"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Login Password</label>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </Layout>
  );
}
