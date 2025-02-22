# next-auth-redis

- [ ] Get Google OAuth working (patrickprunty.business@gmail.com)
  - [ ] Document how-to
- [ ] Create Resend account
  - [ ] Improve form input styling for Resend on /auth/signin
  - [ ] Integrate Resend authentication with Magic Link
  - [ ] Create Resend service and API for sending emails using templates
  - [ ] Document how-to
- [ ] Integrate SwaggerAPI on backend APIs
  - [ ] Protect /docs endpoint using admin RBAC
- [ ] Integrate passkey authentication with next-auth
  - [ ] Document how-to
- [ ] PWA enablement via script and config.ts

Swagger issue = https://github.com/swagger-api/swagger-ui/issues/10212

- [ ] Setup Supabase account
- [ ] Update next-auth adaptor to be Supabase
- [ ] Get GitHub OAuth working with Supabase

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
