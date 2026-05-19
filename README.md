# EFAS — Expert for Awareness and Security

Philippine cybersecurity awareness platform: verified scam alerts, articles, Athena AI, fact-check, quiz, and emergency contacts.

## Local development

```bash
npm install
cp .env.example .env
# Add your Groq API key to .env (see https://console.groq.com/)
npm run dev
```

## Deploy to Vercel

### Option A — GitHub (recommended)

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the repo.
3. Vercel should auto-detect **Vite** with:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Under **Environment Variables**, add:
   - **Name:** `VITE_GROQ_API_KEY`
   - **Value:** your Groq API key
   - Enable for **Production**, **Preview**, and **Development** if you use Athena on previews.
5. Click **Deploy**.

`vercel.json` in the repo configures SPA routing so routes like `/articles/3` and `/athena` work on refresh.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
# Follow prompts; link to existing project or create new

# Set env var (production)
vercel env add VITE_GROQ_API_KEY

# Deploy to production
vercel --prod
```

### After deploy

- Open your `*.vercel.app` URL and test navigation, Athena, and Fact Check.
- If Athena says the API key is missing, confirm `VITE_GROQ_API_KEY` is set in Vercel and **redeploy** (env changes need a new build).

### Security note

`VITE_GROQ_API_KEY` is embedded in the client bundle. Anyone can view it in the browser. For a public demo this is acceptable; for production, consider a server-side proxy or Vercel serverless function to call Groq instead of exposing the key.
