import NextAuth from 'next-auth';
import { UpstashRedisAdapter } from '@auth/upstash-redis-adapter';
import redis from './redis';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import Resend from 'next-auth/providers/resend';
import Apple from "next-auth/providers/apple"
import Instagram from "next-auth/providers/instagram"

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
  adapter: UpstashRedisAdapter(redis),
  session: { strategy: "jwt" },
  pages: {
    signIn: '/auth/signin',
  },
});
