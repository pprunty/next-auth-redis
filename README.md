# next-auth-redis

- [ ] Get Google OAuth working (patrickprunty.business@gmail.com)
  - [ ] Document how-to
- [ ] Figure out how to extend user account schema to include admin / create make superuser
- [ ] Create Resend account
  - [ ] Improve form input styling for Resend on /auth/signin
  - [ ] Integrate Resend authentication with Magic Link
  - [ ] Create Resend service and API for sending emails using templates
  - [ ] Document how-to
- [x] Integrate SwaggerAPI on backend APIs
  - [ ] Protect /docs endpoint using admin RBAC/middleware/something else (https://chatgpt.com/share/67b9f7b6-5f14-8009-8fa9-7b20faf32a15)
- [ ] Integrate passkey authentication with next-auth
  - [ ] Document how-to
- [ ] PWA enablement via script and config.ts
  - [x] Add pwa.js script
  - [ ] Include manifest.json updates in pwa.js script
  - [ ] Integrate next-pwa library in next.config.ts

Swagger issue = https://github.com/swagger-api/swagger-ui/issues/10212
swagger fixed at 0.4.0 to avoid https://www.reddit.com/r/nextjs/comments/1bkswd8/enoent_no_such_file_or_directory_lstat/

- [ ] Setup Supabase/Prisma account
- [ ] Update next-auth adaptor to be Supabase/Prisma
- [ ] Get OAuth + everything working with Supabase/Prisma

# Deploying to Vercel

# Authentication

## NextAuth Integration

## Resend

## Passkey

## OAuth

### Google

### Apple

### Instagram

### GitHub

1. Navigate to: https://github.com/settings/applications/new or go developer settings -> apps -> oauth
2. Create new app <name_of_app>
3. Add homepage URL [origin] from Vercel or custom domain
4. Add callback url [origin]/api/auth/callback/github
5. GitHub webhook URL (unchecked)
6. Review app here https://github.com/settings/apps/<name_of_app>

Reference:

https://authjs.dev/guides/configuring-github
https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

# PWA Enablement

Simply place an icon.webp|jpg|png in the public/ directory.

# SwaggerAPI documentation

---

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
