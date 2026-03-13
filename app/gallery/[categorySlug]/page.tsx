import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug, getGalleryBySlug } from "@/lib/content";
import { GalleryGrid } from "@/components/GalleryGrid";

interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

export function generateStaticParams() {
  return getCategories().map((c) => ({ categorySlug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return { title: "Gallery" };
  return { title: `${category.title} | Studio` };
}

export default async function GalleryPage({ params }: PageProps) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const gallery = getGalleryBySlug(categorySlug);

  if (!category) notFound();

  return (
    <div className="min-h-screen">
      <header className="container mx-auto px-4 py-8 text-center md:py-12">
        <h1 className="text-3xl md:text-4xl font-medium">{category.title}</h1>
        {category.subtitle ? (
          <p className="text-muted-foreground mt-2">{category.subtitle}</p>
        ) : null}
      </header>
      <GalleryGrid photos={gallery?.photos ?? []} categoryTitle={category.title} />
    </div>
  );
}
