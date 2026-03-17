import type { HeroImage } from "./types";

/**
 * Home page hero: multiple full-screen images that auto-rotate every 5 seconds.
 * 1. Upload images in Vercel Blob browser (e.g. into a "hero" folder).
 * 2. Copy each file's URL from the Blob browser.
 * 3. Add one entry per image below (order: 0, 1, 2, ...).
 */
export const heroImages: HeroImage[] = [
    { blobUrl: "https://ribznvyguwds5wlw.public.blob.vercel-storage.com/hero/DSC00495.jpg", alt: "Maggie", order: 0 },
    { blobUrl: "https://ribznvyguwds5wlw.public.blob.vercel-storage.com/hero/DSC00609.jpg", alt: "Maggie", order: 1 },
    { blobUrl: "https://ribznvyguwds5wlw.public.blob.vercel-storage.com/hero/DSC_2156-2.jpg", alt: "Maggie", order: 2 },
    { blobUrl: "https://ribznvyguwds5wlw.public.blob.vercel-storage.com/hero/L1000059.jpg", alt: "Maggie", order: 3 },

];
