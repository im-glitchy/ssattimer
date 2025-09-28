# SSAT Timer

This repo contains a Next.js app (SSAT Timer). The project includes a GitHub Actions workflow to build the project, run `next export`, and publish the resulting `out/` static site to the `gh-pages` branch for GitHub Pages.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Build & export (for GitHub Pages)

```bash
npm ci
npm run build
# `next.config.js` should include `output: 'export'` so `npm run build` produces the static `./out` folder
# ./out contains static site
```

## Deployment

- The workflow at `.github/workflows/deploy-gh-pages.yml` will run on `push` to `main`, build the project, export it to `out/`, and publish to the `gh-pages` branch.

If you have problems with asset paths on GitHub Pages (site served under `https://USERNAME.github.io/REPO-NAME/`), you may need to set `basePath` and `assetPrefix` in `next.config.js`. Example:

```js
// next.config.js
module.exports = {
  basePath: '/REPO-NAME',
  assetPrefix: '/REPO-NAME/',
};
```

## Notes

- If your app uses Next.js server-only features (App Router server components that need server runtime, API routes, or middleware), `next export` may not work — use Vercel instead.
