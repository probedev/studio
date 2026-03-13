import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  slug: string;
  title: string;
  coverImageUrl: string;
  subtitle?: string;
  hero?: boolean;
}

export function CategoryCard({
  slug,
  title,
  coverImageUrl,
  subtitle,
  hero = false,
}: CategoryCardProps) {
  const href = `/gallery/${slug}`;

  if (hero) {
    return (
      <Link href={href} className="block absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-none">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : null}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 md:p-10">
          <span className="text-white text-2xl md:text-4xl font-medium drop-shadow-lg">
            {title}
          </span>
          {subtitle ? (
            <span className="text-white/90 text-lg mt-1 drop-shadow">
              {subtitle}
            </span>
          ) : null}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group block overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      <div className="relative aspect-[4/3] bg-muted">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            {title}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        {subtitle ? (
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        ) : null}
      </div>
    </Link>
  );
}
