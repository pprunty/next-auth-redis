// src/auth.ts
import NextAuth from 'next-auth';
import { UpstashRedisAdapter } from '@auth/upstash-redis-adapter';
import redis from './redis';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import Resend from 'next-auth/providers/resend';
import Apple from 'next-auth/providers/apple';
import Instagram from 'next-auth/providers/instagram';
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import client from "./mongodb";

// import Passkey from "next-auth/providers/passkey"

// Define the Basic (credentials) provider
const Basic = Credentials({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    // Replace with your own user verification logic:
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
  providers: [
    Google,
    GitHub,
    Instagram,
    Apple,
    Resend,
    // Passkey,
    Basic,
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach the user id (from token.sub) to session.user.
      // Using the non-null assertion since we expect token.sub to be defined.
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user }) {
      // If the user object is returned at sign in, add the id to the token.
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async redirect({ baseUrl }) {
      // Always redirect to the baseUrl ("/" in this case)
      return baseUrl;
    },
  },
  adapter: UpstashRedisAdapter(redis),
  // adapter: MongoDBAdapter(client),
  pages: {
    signIn: '/auth/signin',
  },
  session: { strategy: 'jwt' },
  experimental: { enableWebAuthn: true },
});
