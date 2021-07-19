import React, { useState } from 'react';
import Layout from '../components/Layout';

function register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  console.log(username);
  console.log(password);

  return (
    <Layout title="Register">
      <div>
        <form
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
          }}
        >
          <div>
            <div>
              <label>Username</label>
              <input
                required
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Password</label>
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

export default register;
