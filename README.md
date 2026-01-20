# Pine Hills Lawn Services

Marketing site and lead capture for Pine Hills Lawn Services.

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run start
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in values.

- `NEXT_PUBLIC_SITE_URL`: canonical site URL (used for metadata and sitemap)
- `SAP_API_URL` / `SAP_API_KEY`: Service AutoPilot credentials
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SALES_EMAIL` / `SMTP_SECURE`: fallback email delivery
- `PLAUSIBLE_DOMAIN`: enable Plausible analytics script

## Service AutoPilot integration

The integration lives in `lib/sap.ts`.

- If `SAP_API_URL` and `SAP_API_KEY` are set, leads post to `${SAP_API_URL}/leads` with retries.
- If SAP vars are not set, the app emails the lead to `SALES_EMAIL` via SMTP.
- If neither are set in development, leads are stored in `.data/leads.json` and logged.

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Create a new Vercel project and import the repo.
3. Add your environment variables in the Vercel dashboard.
4. Deploy. Vercel will run `npm run build` automatically.

## Connecting to SAP

Once credentials are provided, set `SAP_API_URL` and `SAP_API_KEY` in your hosting
provider. The API expects a POST request to `/leads` with the lead payload.
