# Nova AI — Google Drive-powered chatbot

Phase 1 delivers the responsive React + Vite chat interface and a safe API boundary. The UI runs in demo mode until a backend AI provider is configured.

## Requirements
- Node.js 20 or newer
- Git
- A GitHub account
- A Netlify account

## Run locally
1. Download and unzip this project.
2. Open a terminal in the project folder.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL printed by Vite.

## Build check
Run `npm run build`. The generated website is in `dist/`.

## Deploy with GitHub + Netlify
1. Create a new, empty GitHub repository.
2. In this folder, run:
   - `git init`
   - `git add .`
   - `git commit -m "Initial chatbot frontend"`
   - `git branch -M main`
   - `git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git`
   - `git push -u origin main`
3. In Netlify, choose **Add new site → Import an existing project**.
4. Connect GitHub and select the repository.
5. Build command: `npm run build`; publish directory: `dist`.
6. Deploy. `netlify.toml` already contains those settings.

## Current behavior
- Responsive dark-mode chat UI with sidebar, starter prompts, message bubbles, typing state, and mobile layout.
- Messages are kept in browser memory only and are lost when the page is refreshed.
- The chat calls `/.netlify/functions/chat`. The included function intentionally returns a setup message until Phase 2 connects an AI provider.
- No API keys or Google credentials are required for Phase 1.

## Security rules for later phases
- Never place AI keys, Google private keys, or Supabase service-role keys in frontend code or `VITE_*` variables.
- Configure secrets in Netlify environment variables.
- Restrict the Google service account to the dedicated knowledge folder, and enforce the configured folder ID in backend code.
- Treat all retrieved document text as untrusted reference material, not as instructions.
- Add rate limiting and abuse controls before making the AI endpoint public.
