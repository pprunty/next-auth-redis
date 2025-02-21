import NextAuth, { type NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import redis from "./redis";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import Resend from "next-auth/providers/resend";

// Define the Basic (credentials) provider
const Basic = Credentials({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email", placeholder: "user@example.com" },
    password: { label: "Password", type: "password" },
  },
  authorize(c) {
    if (c.password !== "password") return null;
    return {
      id: "test",
      name: "Test User",
      email: "test@example.com",
    };
  },
});

const providers: NextAuthOptions["providers"] = [
  // Configure Google provider (ensure you provide your clientId and clientSecret)
  Google,
  // Configure GitHub provider (ensure you provide your clientId and clientSecret)
  GitHub,
  // Resend for SMTP API and Magic Links
  Resend,
  // Add the Basic (credentials) provider
  Basic,
];

export const providerMap = providers
  .map((provider) => ({ id: provider.id, name: provider.name }))
  .filter((provider) => provider.id !== "credentials");

/*
Google:
https://authjs.dev/guides/configuring-google
[origin]/api/auth/callback/google

GitHub:
https://authjs.dev/guides/configuring-github
https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app
[origin]/api/auth/callback/github

*/
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  adapter: UpstashRedisAdapter(redis),
//   pages: {
//     signIn: "/auth/signin",
//   },
});
