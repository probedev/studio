# Step-by-step: First version on Git + Vercel, then load images and categories

Follow these in order.

---

## Part 1: Get the first version live on Vercel

### Step 1 — Create a GitHub repo

1. Go to [github.com/new](https://github.com/new).
2. Choose a name (e.g. `photography-studio` or `my-photos`).
3. Leave “Add a README” **unchecked** (you already have a repo).
4. Click **Create repository**.

### Step 2 — Push this project to GitHub

In Terminal, from your project folder (the one that contains `package.json`):

```bash
cd "/Users/greggheil/Library/Mobile Documents/com~apple~CloudDocs/Studio"
git init
git add .
git commit -m "Initial commit: photography studio portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and the repo name you chose.

### Step 3 — Create a Vercel Blob store

1. Go to [vercel.com](https://vercel.com) and sign in (use “Continue with GitHub” if you use GitHub).
2. Open the dashboard, then click **Storage** in the top nav (or go to [vercel.com/dashboard/stores](https://vercel.com/dashboard/stores)).
3. Click **Create Database** or **Create Store** and choose **Blob**.
4. Name it (e.g. `studio-images`) and create it.
5. Open the new store. In the **Quick start** or **.env** section, copy the value that looks like `vercel_blob_rw_xxxxxxxxxxxx`. You’ll use this in the next part.

### Step 4 — Deploy the site on Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Click **Import** next to your GitHub repo (the one you pushed in Step 2).
3. Leave **Framework Preset** as Next.js and **Root Directory** blank. Click **Deploy**.
4. After the first deploy finishes, go to your project on Vercel → **Settings** → **Environment Variables**.
5. Add one variable:
   - **Name:** `BLOB_READ_WRITE_TOKEN`
   - **Value:** the token you copied from the Blob store in Step 3
6. Save, then go to **Deployments**, open the **⋯** on the latest deployment, and click **Redeploy** (so the build uses the new env var).

### Step 5 — Open your live site

1. In the Vercel project, open the **Domains** tab or the main project page.
2. Click your production URL (e.g. `your-project.vercel.app`).
3. You should see the first version: hero placeholder, three category cards (Travel, Portraits, Street), and nav to About and Contact.

---

## Part 2: Load images and set up categories

### Step 6 — Upload images to Vercel Blob

**Option A — Vercel Dashboard (good for a few images)**

1. Go to [vercel.com/dashboard/stores](https://vercel.com/dashboard/stores) and open your Blob store.
2. Click **Upload** and choose one or more image files.
3. After each upload, copy the file’s **URL** (e.g. `https://xxxxx.public.blob.vercel-storage.com/your-file.jpg`). You’ll paste these into the content files next.

**Option B — Bulk upload from your computer (good for many images)**

1. In Terminal, from your project folder:

   ```bash
   cd "/Users/greggheil/Library/Mobile Documents/com~apple~CloudDocs/Studio"
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx node scripts/upload-to-blob.mjs ./path/to/your/photos
   ```

   Replace `vercel_blob_rw_xxxxx` with your real token and `./path/to/your/photos` with the folder that contains your images (e.g. `~/Pictures/Paris`).

2. The script prints one URL per line. Copy or save those URLs for the next steps.

### Step 7 — Set category cover images (home page grid and hero)

1. Open **`content/categories.ts`** in your editor.
2. For each category you want to show a cover image, set `coverImageUrl` to one of your Blob URLs. Example:

   ```ts
   {
     id: "travel",
     title: "Travel",
     subtitle: "Places and moments",
     slug: "travel",
     coverImageUrl: "https://xxxxx.public.blob.vercel-storage.com/paris-cover.jpg",
     order: 0,
   },
   ```

3. You can change `title`, `subtitle`, and `order`, or add/remove categories (keep `id`, `slug`, and `order` consistent with `content/galleries.ts`).

### Step 8 — Add photos to each gallery

1. Open **`content/galleries.ts`** in your editor.
2. For each category, fill the `photos` array with objects that have:
   - **`blobUrl`** — one of your Blob image URLs
   - **`alt`** — short description for accessibility (e.g. `"View of the Eiffel Tower"`)
   - **`caption`** — optional; shown under the image in the grid and in the lightbox
   - **`order`** — number to control order (0, 1, 2, …)

   Example:

   ```ts
   {
     categoryId: "travel",
     photos: [
       { blobUrl: "https://xxxxx.public.blob.vercel-storage.com/photo1.jpg", alt: "Paris street", caption: "Paris, 2023", order: 0 },
       { blobUrl: "https://xxxxx.public.blob.vercel-storage.com/photo2.jpg", alt: "Mountain view", caption: "Alps", order: 1 },
     ],
   },
   ```

3. Repeat for `portraits` and `street` (or whatever category IDs you have in `categories.ts`).

### Step 9 — (Optional) Edit About and Contact text

1. Open **`content/pages.ts`** in your editor.
2. Update **`aboutContent`**: `title`, `body`.
3. Update **`contactContent`**: `title`, `body`, `email`, `instagram` (your real email and Instagram URL).

### Step 10 — Deploy and review

1. Save all files, then in Terminal:

   ```bash
   cd "/Users/greggheil/Library/Mobile Documents/com~apple~CloudDocs/Studio"
   git add .
   git commit -m "Add images and categories"
   git push
   ```

2. Wait a minute for Vercel to build and deploy.
3. Open your Vercel URL again. You should see your cover images on the home page and your photos in each gallery (click a category to open its gallery and use the lightbox by clicking a photo).

---

## Quick reference

| Goal                         | File to edit              |
|-----------------------------|---------------------------|
| Category titles, covers     | `content/categories.ts`   |
| Photos in each gallery      | `content/galleries.ts`   |
| About / Contact text & links| `content/pages.ts`       |

| Step              | Where / command                                      |
|-------------------|------------------------------------------------------|
| Upload images     | Vercel Dashboard → Storage → your Blob store, or `scripts/upload-to-blob.mjs` |
| See Blob token    | Vercel Dashboard → Storage → your store → .env      |
| Add token to site | Vercel project → Settings → Environment Variables   |

After any change to `content/*` or code: **commit → push → wait for deploy → review on your Vercel URL.**
