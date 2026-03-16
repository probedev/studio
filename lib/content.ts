import { categories } from "@/content/categories";
import { galleries } from "@/content/galleries";
import type { Category, Gallery } from "@/content/types";

export function getCategories(): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getGalleryByCategoryId(categoryId: string): Gallery | undefined {
  const gallery = galleries.find((g) => g.categoryId === categoryId);
  if (!gallery) return undefined;
  return {
    ...gallery,
    photos: [...gallery.photos].sort((a, b) => a.order - b.order),
  };
}

export function getGalleryBySlug(slug: string): Gallery | undefined {
  const category = getCategoryBySlug(slug);
  if (!category) return undefined;
  return getGalleryByCategoryId(category.id);
}
