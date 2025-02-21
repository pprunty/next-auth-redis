'use client';

import { useEffect, useState, FormEvent } from 'react';
import { getProviders, signIn } from 'next-auth/react';

interface Provider {
  id: string;
  name: string;
  type?: string;
}

export default function SignInPage() {
  // Local state to store providers fetched from NextAuth
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null,
  );
  // States for the credentials (basic) form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Fetch providers on mount
  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  // Handler for the credentials sign in
  const handleCredentialsSignIn = async (e: FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/',
    });
    if (res?.error) {
      setError('Invalid credentials');
    } else {
      // On success, redirect to callbackUrl or home page
      window.location.href = res?.url || '/';
    }
  };

  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '2rem' }}>
      <h1>Sign In</h1>

      {/* Credentials (Basic) Sign In */}
      {providers['credentials'] && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>Sign in with Email</h2>
          <form onSubmit={handleCredentialsSignIn}>
            <div style={{ marginBottom: '1rem' }}>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.5rem',
                  }}
                />
              </label>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.5rem',
                  }}
                />
              </label>
            </div>
            {error && (
              <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
            )}
            <button type="submit" style={{ padding: '0.75rem 1.5rem' }}>
              Sign in
            </button>
          </form>
        </div>
      )}

      {/* OAuth/Other Providers */}
      <div>
        <h2>Or sign in with</h2>
        {Object.values(providers)
          .filter((provider) => provider.id !== 'credentials')
          .map((provider) => (
            <div key={provider.id} style={{ marginBottom: '1rem' }}>
              <button
                onClick={() => signIn(provider.id)}
                style={{ padding: '0.75rem 1.5rem' }}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
