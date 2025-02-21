import NextAuth from 'next-auth';
import { UpstashRedisAdapter } from '@auth/upstash-redis-adapter';
import redis from './redis';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import Resend from 'next-auth/providers/resend';
import Apple from 'next-auth/providers/apple';
import Instagram from 'next-auth/providers/instagram';
import 'next-auth/jwt';

// Define the Basic (credentials) provider
const Basic = Credentials({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    // Replace the following logic with your own user verification:
    if (
      credentials &&
      credentials.email === 'user@example.com' &&
      credentials.password === 'password123'
    ) {
      return { id: '1', name: 'Test User', email: 'user@example.com' };
    }
    return null;
  },
});

/*
Google:
https://authjs.dev/guides/configuring-github
[origin]/api/auth/callback/google

GitHub:
https://authjs.dev/guides/configuring-github
[origin]/api/auth/callback/github

*/
export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV === 'development',
  providers: [
    // Configure Google provider (ensure you provide your clientId and clientSecret)
    Google,
    // Configure GitHub provider (ensure you provide your clientId and clientSecret)
    GitHub,
    Instagram,
    Apple,
    // Resend for SMTP API and Magic Links
    Resend,
    // Add the Basic (credentials) provider
    Basic,
  ],
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === 'update') token.name = session.user.name;
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken;
      return session;
    },
  },
  adapter: UpstashRedisAdapter(redis),
  session: {
    // Use JWT for session management.
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    // Configure the session cookie to be secure and HTTP-only in production.
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      },
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
