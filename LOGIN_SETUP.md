# Plutar Login + Auto Access Setup

This project now uses:
- Email verification code login (no license key)
- Registered workspace access after email verification
- Google account login option
- Automatic paid-feature check from Stripe subscriptions

## 1) Create email sender (Resend)

1. Create a Resend account.
2. Verify your sending domain or a verified sender email.
3. Copy your API key.

## 2) Add Vercel environment variables

In Vercel Project -> Settings -> Environment Variables, add:

- `LOGIN_CODE_SECRET`  
  Long random secret string (example: 64+ chars).

- `RESEND_API_KEY`  
  From Resend dashboard.

- `LOGIN_FROM_EMAIL`  
  Verified sender, e.g. `login@plutar.net`.

- `STRIPE_SECRET_KEY`  
  Your Stripe secret key (starts with `sk_`).

- `GOOGLE_CLIENT_ID`  
  OAuth Client ID from Google Cloud for Google Sign-In.

- `OWNER_EMAIL`  
  Your owner email for admin access (optional but recommended).

- `ALLOW_REGISTERED_ACCESS`  
  Optional. Set to `true` (default) to allow verified Gmail/Google users into the workspace without paid Stripe status.
  Set to `false` if you want paid-only access.

## 3) Redeploy

After adding variables, redeploy the project in Vercel.

## 4) Test flow

1. Go to `https://www.plutar.net/get-started.html`
2. Click **Get Started** -> **Sign Up**.
3. Sign up with Gmail or Google account.
4. Login with Gmail/Google:
   - Enter Gmail/email
   - Click **Send Verification Code**
   - Enter code from email
   - Click **Verify & Continue**
5. Workspace access unlocks after verification.
6. Paid Stripe status unlocks member booking and premium AI mode.

## Notes

- No access keys are used anymore.
- Login is email-code based.
- Google sign in is supported via `/api/google-auth`.
- Paid status is checked against Stripe for paid-only features.
