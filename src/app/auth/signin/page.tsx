'use client';

import { useEffect, useState, FormEvent, Suspense } from 'react';
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

  return (
    <div className="max-w-[400px] mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>

      <Suspense fallback={null}>
        {providers?.['credentials'] && (
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Sign in with Email</h2>
            <form onSubmit={handleCredentialsSignIn}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-2 w-full p-2 border border-gray-300 rounded"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-2 w-full p-2 border border-gray-300 rounded"
                  />
                </label>
              </div>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Sign in
              </button>
            </form>
          </div>
        )}
      </Suspense>

      {/* OAuth/Other Providers */}
      {providers && (
        <div>
          <h2 className="text-xl font-medium mb-4">Or sign in with</h2>
          {Object.values(providers)
            .filter((provider) => provider.id !== 'credentials')
            .map((provider) => (
              <div key={provider.id} className="mb-4">
                <button
                  onClick={() => signIn(provider.id)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
