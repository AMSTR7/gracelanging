Grace Christian landing page — GitHub / Netlify source package

This folder is ready to upload to the GitHub repository:
https://github.com/AMSTR7/gracelanging

Netlify settings when the repository root is the Base directory:
Build command: pnpm --filter @workspace/grace-landing run build
Publish directory: artifacts/grace-landing/dist/public

The root netlify.toml already contains these settings and the SPA fallback redirect.
