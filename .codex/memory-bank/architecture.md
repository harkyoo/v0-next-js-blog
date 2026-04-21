# Architecture

## Overview

This project is a content-driven blog built with Next.js App Router, React, TypeScript, MDX content files, and Tailwind CSS.

The application currently centers on a single blog experience:

- `/` redirects to `/blog`
- `/blog` renders the blog index
- blog content is sourced from local files in `content/posts`

## Top-Level Structure

- `app/`: App Router entrypoints, layouts, global CSS, and route composition
- `components/`: reusable UI building blocks and blog-specific presentation components
- `content/posts/`: MDX blog posts with frontmatter metadata
- `lib/`: content-loading utilities, shared types, and common helpers
- `hooks/`: shared React hooks
- `public/`: static assets such as icons, placeholder images, and post thumbnails
- `styles/`: additional global styling assets

## Routing

### `app/layout.tsx`

Defines the root HTML shell, metadata, global CSS import, and conditional Vercel Analytics in production.

### `app/page.tsx`

Redirects the home route to `/blog` using `next/navigation`.

### `app/blog/layout.tsx`

Wraps blog pages with:

- a sticky header
- a simple navigation bar
- a footer

### `app/blog/page.tsx`

Builds the main blog index page by:

- loading all posts with `getAllPosts()`
- loading all tags with `getAllTags()`
- rendering `PostList`

## Content Model

Blog posts live in `content/posts/` as `.mdx` files.

Frontmatter is typed in `lib/types.ts`:

- `title`
- `slug`
- `summary`
- `date`
- `tags`
- `thumbnail`
- optional `relatedPosts`

The runtime `Post` object also includes:

- raw `content`
- computed `readingTime`

## Data Flow

### `lib/posts.ts`

This is the core content access layer.

Responsibilities:

- locate post files from `content/posts`
- parse frontmatter with `gray-matter`
- compute reading time with `reading-time`
- normalize slug handling for `.md` and `.mdx`
- sort posts by descending publish date
- derive the global tag list
- derive related posts from either explicit frontmatter or shared tags

Current loading is filesystem-based and synchronous, which fits the current static/local-content model.

## Rendering Layer

### Blog listing

`components/blog/post-list.tsx` is a client component that manages:

- text search state
- selected tag state
- in-memory filtering of the post list

It renders blog cards and empty-state UI based on filtered results.

### MDX rendering

`components/blog/mdx-content.tsx` renders MDX content with `next-mdx-remote/rsc` and maps standard HTML elements to styled React components.

This file is the main presentation boundary for post body content and typography.

## Component Organization

### `components/blog/`

Contains domain-specific blog components such as:

- post list and post card UI
- related posts
- search bar
- tag filter
- MDX content renderer

### `components/ui/`

Contains a broad reusable UI kit, likely generated or adapted from a shadcn-style component library.

These components support future expansion, though many are not necessarily used by the current blog routes.

## Styling

- `app/globals.css` provides the main global styling entrypoint for the App Router app
- `styles/globals.css` also exists and may reflect older or supplemental styling work
- Tailwind CSS is used across layouts and components via utility classes

If styling changes behave unexpectedly, check both global CSS files and confirm which one is actively imported.

## Assets

Static files are served from `public/`, including:

- site icons
- placeholder assets
- blog thumbnail images in `public/images/`

Frontmatter thumbnails currently point into this asset space.

## Operational Notes

- Package manager lockfile is `pnpm-lock.yaml`
- The dev command is `pnpm dev`
- The app is currently optimized around local content rather than an external CMS or API
- The root route intentionally redirects, so the primary user-facing entry is `/blog`

## Likely Extension Points

- add dynamic blog post detail routes if not yet implemented
- add pagination, sorting, or richer taxonomy pages
- replace synchronous filesystem loading with a build-time content pipeline if content volume grows
- consolidate styling if both global CSS files are no longer needed
