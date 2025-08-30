# Privacy Hub (Next.js 15 + Tailwind + shadcn/ui)

A single website to host **multiple Privacy Policies** — one URL per app:

- `https://your-domain.com/privacy/my-awesome-app`
- `https://your-domain.com/privacy/another-app`

## Stack

- **Next.js 15** (App Router, SSR forced)  
- **React 19**  
- **Tailwind CSS** + **shadcn/ui** (pre-wired components + theming)  
- Markdown files per app (`/content/privacy/*.md`)  
- **SEO**: `generateMetadata`, `robots.txt`, `sitemap.xml`, canonical URLs

> Server-side rendering is enforced via `export const dynamic = "force-dynamic"` on pages under `/app`.

## Quick Start

```bash
# 1) Install deps
pnpm install   # or npm install / yarn

# 2) Dev
pnpm dev       # http://localhost:3000

# 3) Build & start
pnpm build && pnpm start
```

## Configure your canonical base URL

Set `NEXT_PUBLIC_SITE_URL` to your domain for proper canonical/OG/sitemap:

```bash
export NEXT_PUBLIC_SITE_URL="https://privacy.your-domain.com"
pnpm dev
```

## Add / batch-generate Privacy Policies

Edit `apps.json` and run:

```bash
pnpm generate:privacy
```

This uses `/templates/privacy-template.md` + Mustache to create files in `/content/privacy/`.
You can also hand-edit Markdown files there.

## Routing

- **List**: `/privacy`  
- **Detail**: `/privacy/[slug]` (Markdown-driven)  

## Deploy

Best deployed on **Vercel**. Set `NEXT_PUBLIC_SITE_URL` in Project → Settings → Environment Variables.

## Notes

- Tailwind + shadcn/ui are preconfigured. Add more UI components when needed.  
- If you prefer static generation for SEO/perf, remove `export const dynamic = "force-dynamic"` and optionally add `generateStaticParams`.
