# Photography Studio Portfolio

A clean, full-screen photography portfolio built with Next.js, Tailwind CSS, and shadcn/ui. Content is file-based; images are stored in **Vercel Blob** for high resolution without repo bloat.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Vercel Blob** for image storage
- **Vercel** for deployment

## Development workflow

**No local dev server.** Work by pushing to Git and reviewing on Vercel:

1. Edit content or code in your editor.
2. Commit and push to GitHub.
3. Vercel builds and deploys automatically. Review on your **production URL** or the **preview URL** from the commit (Vercel posts it on the repo or in the Vercel dashboard).

Use this loop for all changes: push → wait for deploy → review in the browser. Optional: run `npm run dev` locally only when you want fast feedback without pushing.

## One-time setup: deploy to Vercel

1. **Push to GitHub**  
   Create a repo and push this project.

2. **Import in Vercel**  
   [vercel.com/new](https://vercel.com/new) → Import your GitHub repo.

3. **Configure environment**  
   In the Vercel project → Settings → Environment Variables, add:
   - `BLOB_READ_WRITE_TOKEN` — from your Vercel Blob store (Dashboard → Storage → your store → .env snippet).

4. **Deploy**  
   Trigger a deployment (or push a commit). Your site is live at `*.vercel.app` (and any custom domain you add).

## Local setup (optional)

If you ever want to run the site locally:

```bash
npm install
cp .env.local.example .env.local
```

Add `BLOB_READ_WRITE_TOKEN` to `.env.local` (create a Blob store in [Vercel Dashboard → Storage](https://vercel.com/dashboard/stores)). Then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating photos and content

### 1. Upload images to Vercel Blob

**Option A — Vercel Dashboard**  
Storage → your store → Upload. Copy each file’s URL.

**Option B — Script (bulk upload)**  
From the project root:

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx node scripts/upload-to-blob.mjs ./path/to/your/images
```

The script prints one URL per line. Use these in your content files.

### 2. Edit content in the repo

- **Categories** (home grid + hero): edit `content/categories.ts`.  
  Set `coverImageUrl` to a Blob URL; adjust `title`, `subtitle`, `slug`, `order`.

- **Gallery photos**: edit `content/galleries.ts`.  
  For each category, add objects to `photos`: `{ blobUrl: "https://...", alt: "...", caption: "...", order: 0 }`.

- **About / Contact**: edit `content/pages.ts` (text, email, Instagram link).

### 3. Deploy and review

Commit and push. Vercel builds and deploys automatically. Review the updated site on your Vercel URL.

## Project structure

```
├── app/
│   ├── layout.tsx      # Root layout, nav, footer
│   ├── page.tsx        # Home: hero + category grid
│   ├── gallery/[categorySlug]/page.tsx
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── ui/             # shadcn (Button, Sheet, Dialog)
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CategoryCard.tsx
│   └── GalleryGrid.tsx # Grid + lightbox
├── content/
│   ├── types.ts
│   ├── categories.ts
│   ├── galleries.ts
│   └── pages.ts
├── lib/
│   ├── content.ts      # getCategories, getGalleryBySlug, etc.
│   └── utils.ts
├── scripts/
│   └── upload-to-blob.mjs
└── next.config.ts      # images.remotePatterns for Blob host
```

## Image optimization

`next/image` is used for all Blob images. `next.config.ts` allows the Blob host (`**.public.blob.vercel-storage.com`). For very large libraries, consider adding `BLOB_STORE_HOSTNAME` and using it in `remotePatterns` if you need a single fixed host.

## License

Private / personal use. Customize as you like.
