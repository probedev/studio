export interface Category {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  coverImageUrl: string;
  order: number;
}

export interface Photo {
  blobUrl: string;
  caption?: string;
  alt: string;
  order: number;
}

export interface Gallery {
  categoryId: string;
  photos: Photo[];
}
