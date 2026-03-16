import { getCategories, getHeroImages } from "@/lib/content";
import { CategoryCard } from "@/components/CategoryCard";
import { HeroCarousel } from "@/components/HeroCarousel";

export default function HomePage() {
  const categories = getCategories();
  const heroImages = getHeroImages();
  const firstCategory = categories[0];

  const hasHeroImages = heroImages.length > 0;

  return (
    <div>
      {/* Hero: multiple images carousel, or first category cover, or placeholder */}
      <section className="relative h-[85vh] min-h-[400px] w-full overflow-hidden">
        {hasHeroImages ? (
          <HeroCarousel images={heroImages} />
        ) : firstCategory?.coverImageUrl ? (
          <CategoryCard
            slug={firstCategory.slug}
            title={firstCategory.title}
            coverImageUrl={firstCategory.coverImageUrl}
            subtitle={firstCategory.subtitle}
            hero
          />
        ) : (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-lg">Add hero images in content/hero.ts or category covers in content/categories.ts</span>
          </div>
        )}
      </section>

      {/* Category grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="sr-only">Galleries</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat) => (
            <li key={cat.id}>
              <CategoryCard
                slug={cat.slug}
                title={cat.title}
                coverImageUrl={cat.coverImageUrl}
                subtitle={cat.subtitle}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
