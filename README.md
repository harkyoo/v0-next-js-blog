# v0-next-js-blog

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo.

[Continue working on v0 →](https://v0.app/chat/projects/prj_UktXkPt8cwSOANgk6T6hRpujXz41)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## GitHub Pages Deployment

This project is configured to deploy a static export to GitHub Pages with GitHub Actions.

- `main` is the source branch
- the workflow builds the site and publishes the generated `out/` directory to the `deploy` branch
- `next.config.mjs` automatically adds the repository base path during GitHub Actions builds so project pages work under `https://<user>.github.io/<repo>/`

After pushing the workflow to GitHub, set Pages to publish from:

- Branch: `deploy`
- Folder: `/ (root)`

You can also trigger the workflow manually from the Actions tab with `workflow_dispatch`.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/harkyoo/v0-next-js-blog" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
