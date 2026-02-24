# Plutar Login + Auto Access Setup

This project now uses:
- Email verification code login (no license key)
- Automatic paid-access check from Stripe subscriptions

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

- `OWNER_EMAIL`  
  Your owner email for admin access (optional but recommended).

## 3) Redeploy

After adding variables, redeploy the project in Vercel.

## 4) Test flow

1. Go to `https://www.plutar.net/get-started.html`
2. Click **Login**.
3. In app access portal:
   - Enter email
   - Click **Send Verification Code**
   - Enter code from email
   - Click **Verify & Continue**
4. If Stripe subscription is active for that email, access unlocks automatically.

## Notes

- No access keys are used anymore.
- Login is email-code based.
- Paid status is checked against Stripe at login time.
