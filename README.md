# Grace Christian Landing Page

Production-ready Grace Christian landing page.

## Deploy on Netlify

This repository includes `netlify.toml`, so Netlify can detect the build settings automatically.

- **Base directory:** leave blank (repository root)
- **Build command:** `pnpm --filter @workspace/grace-landing run build`
- **Publish directory:** `artifacts/grace-landing/dist/public`

The site is a static Vite build and includes SPA fallback redirects, PWA metadata, sitemap, and robots configuration.

## Direct Netlify upload

For a no-build upload, use the compiled files from `grace-netlify-production.zip`.
