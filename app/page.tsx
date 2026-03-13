import Link from "next/link";
import { getCategories } from "@/lib/content";
import { CategoryCard } from "@/components/CategoryCard";

export default function HomePage() {
  const categories = getCategories();
  const firstCategory = categories[0];

  return (
    <div>
      {/* Hero: full-screen cover from first category or placeholder */}
      <section className="relative h-[85vh] min-h-[400px] w-full overflow-hidden">
        {firstCategory?.coverImageUrl ? (
          <CategoryCard
            slug={firstCategory.slug}
            title={firstCategory.title}
            coverImageUrl={firstCategory.coverImageUrl}
            subtitle={firstCategory.subtitle}
            hero
          />
        ) : (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-lg">Add categories and cover images in content</span>
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
