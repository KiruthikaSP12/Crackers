# Deployment

This app is ready to deploy as a single service.

## Render

1. Push this project to GitHub.
2. Create a new Render account or sign in.
3. Choose `New +` -> `Blueprint`.
4. Select your GitHub repository.
5. Render will detect `render.yaml` and create the web service automatically.
6. After the deploy finishes, open the generated Render URL.

## What changed

- The frontend now uses `VITE_API_BASE` when provided, otherwise `/api`.
- Vite proxies `/api` to `http://localhost:5000` during local development.
- The Express backend serves `Frontend/dist` in production, so one hosted service can run the entire app.

## Razorpay Setup

Add these environment variables in Render for online payments:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

After setting them, redeploy the service. The customer account page will show:

- `Razorpay UPI`
- `Razorpay Card`
- `Cash on Delivery`

Without the Razorpay keys, the site will continue to work, but only COD should be used.
