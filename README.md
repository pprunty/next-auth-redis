# next-auth-redis

This is a Next.js starter template to help accelerate your SaaS journey.

# 1. Deploy to Vercel

# 2. Setup OAuth Providers

## Google

## Apple

## Instagram

## GitHub

1. Navigate to: https://github.com/settings/applications/new or go developer settings -> apps -> oauth
2. Create new app <name_of_app>
3. Add homepage URL [origin] from Vercel or custom domain
4. Add callback url [origin]/api/auth/callback/github
5. GitHub webhook URL (unchecked)
6. Review app here https://github.com/settings/apps/<name_of_app>

Reference:

https://authjs.dev/guides/configuring-github
https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

# Add environment variables to Vercel

---

- TailwindCSS

# Authentication

`next-auth@beta`

- basic auth (email, password)
- passswordless one-time-password (SMTP)
- Magic Links (via SMPT)
- OAuth2 using Google, Apple, Instagram and GitHub

# Upstash Redis

Used as dedicated database versus cache. You can change the adapter easily by updating ... and following
the instructions detailed by `next-auth` [here]().
