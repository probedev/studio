"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Photo } from "@/content/types";

interface GalleryGridProps {
  photos: Photo[];
  categoryTitle: string;
}

export function GalleryGrid({ photos, categoryTitle }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const open = lightboxIndex !== null;
  const currentPhoto = open && photos[lightboxIndex] ? photos[lightboxIndex] : null;

  if (photos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">
        <p>No photos in this gallery yet. Add Blob URLs to <code className="bg-muted px-1 rounded">content/galleries.ts</code>.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 pb-16">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <li key={`${photo.blobUrl}-${index}`}>
              <button
                type="button"
                className="w-full text-left rounded-lg overflow-hidden border bg-card shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="relative aspect-[4/3] bg-muted">
                  <Image
                    src={photo.blobUrl}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                {photo.caption ? (
                  <div className="p-3 text-sm text-muted-foreground">
                    {photo.caption}
                  </div>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={open} onOpenChange={(o) => !o && setLightboxIndex(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full p-0 overflow-hidden border-0 bg-black/95">
          {currentPhoto ? (
            <>
              <DialogTitle className="sr-only">
                {currentPhoto.alt}
              </DialogTitle>
              <div className="relative w-full h-[80vh] min-h-[300px]">
                <Image
                  src={currentPhoto.blobUrl}
                  alt={currentPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="95vw"
                />
              </div>
              {currentPhoto.caption ? (
                <p className="text-center text-white/90 text-sm p-4">
                  {currentPhoto.caption}
                </p>
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
