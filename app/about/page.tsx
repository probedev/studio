import { aboutContent } from "@/content/pages";

export const metadata = {
  title: "About",
  description: aboutContent.body,
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-medium mb-6">{aboutContent.title}</h1>
      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
        {aboutContent.body}
      </p>
    </div>
  );
}
