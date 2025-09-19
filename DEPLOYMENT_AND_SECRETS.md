# Deployment & Secrets Checklist

This project includes CI workflows and deploy templates. **You must set secrets in GitHub (or your host) before deploying.**

## Required secrets (GitHub or host)
- RENDER_SERVICE_ID — Render service ID (for triggering deploy via API)
- RENDER_API_KEY — Render API key with deploy permission
- VERCEL_TOKEN — Vercel token (for vercel-action)
- VERCEL_ORG_ID — Vercel organization id
- VERCEL_PROJECT_ID — Vercel project id
- DOCKERHUB_USERNAME — DockerHub username (for pushing images)
- DOCKERHUB_TOKEN — DockerHub access token
- DOCKERHUB_REPO — DockerHub repo name to push image into
- SUPABASE_DB_URL — Direct Postgres connection URL for applying migrations (optional)
- NEXT_PUBLIC_SUPABASE_URL — Supabase URL (set in frontend environment)
- NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase anon key (set in frontend environment)
- OPENAI_API_KEY — OpenAI API key (for backend server-side AI calls)
- NEXT_PUBLIC_API_URL — Public URL of deployed backend (set in frontend environment)

## How to use the provided workflows
1. Push to `main` branch to trigger backend & frontend deploy workflows (if secrets are set).
2. Use the "Apply Supabase Migrations" workflow to run SQL files against your Supabase Postgres DB (requires SUPABASE_DB_URL).
3. If using Render: set RENDER_SERVICE_ID and RENDER_API_KEY in GitHub Secrets, then push to main to trigger deploy-backend-render.yml which calls Render's deploy API.

## Security
- NEVER commit secrets into the repo.
- Use GitHub Secrets or your hosting provider's secret storage.
- Locally, use `.env.local` (added to .gitignore) and DO NOT push to GitHub.
