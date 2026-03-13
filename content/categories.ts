import type { Category } from "./types";

// Replace coverImageUrl with your Vercel Blob URLs after uploading.
// Use placeholder or leave empty to show a fallback until you add images.
export const categories: Category[] = [
  {
    id: "travel",
    title: "Travel",
    subtitle: "Places and moments",
    slug: "travel",
    coverImageUrl: "",
    order: 0,
  },
  {
    id: "portraits",
    title: "Portraits",
    subtitle: "People and expressions",
    slug: "portraits",
    coverImageUrl: "",
    order: 1,
  },
  {
    id: "street",
    title: "Street",
    subtitle: "Urban life",
    slug: "street",
    coverImageUrl: "",
    order: 2,
  },
];
