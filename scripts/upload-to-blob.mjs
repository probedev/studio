#!/usr/bin/env node
/**
 * Upload images from a local folder to Vercel Blob and print URLs.
 * Usage: BLOB_READ_WRITE_TOKEN=xxx node scripts/upload-to-blob.mjs ./path/to/images
 * Then paste the URLs into content/galleries.ts or content/categories.ts.
 */

import { put } from "@vercel/blob";
import { readdir } from "fs/promises";
import { join, extname } from "path";
import { createReadStream } from "fs";

const token = process.env.BLOB_READ_WRITE_TOKEN;
const dir = process.argv[2] || ".";

if (!token) {
  console.error("Set BLOB_READ_WRITE_TOKEN (e.g. from Vercel dashboard → Storage → your store).");
  process.exit(1);
}

const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

async function getImagePaths(dirPath, base = dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const paths = [];
  for (const e of entries) {
    const full = join(dirPath, e.name);
    if (e.isDirectory()) {
      paths.push(...(await getImagePaths(full, base)));
    } else if (IMG_EXT.has(extname(e.name).toLowerCase())) {
      paths.push(full);
    }
  }
  return paths;
}

async function main() {
  const absoluteDir = join(process.cwd(), dir);
  const paths = await getImagePaths(absoluteDir);
  if (paths.length === 0) {
    console.log("No images found in", absoluteDir);
    return;
  }
  console.log("Uploading", paths.length, "images…");
  const prefix = "galleries";
  for (const filePath of paths) {
    const name = filePath.replace(absoluteDir, "").replace(/^[/\\]/, "").replace(/[/\\]/g, "-");
    const blob = await put(`${prefix}/${name}`, createReadStream(filePath), {
      access: "public",
      token,
    });
    console.log(blob.url);
  }
  console.log("\nDone. Add these URLs to content/galleries.ts (photos[].blobUrl) or content/categories.ts (coverImageUrl).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
