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
