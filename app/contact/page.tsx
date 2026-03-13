import Link from "next/link";
import { contactContent } from "@/content/pages";

export const metadata = {
  title: "Contact",
  description: contactContent.body,
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-medium mb-6">{contactContent.title}</h1>
      <p className="text-muted-foreground leading-relaxed mb-8">
        {contactContent.body}
      </p>
      <ul className="space-y-2">
        <li>
          <Link
            href={`mailto:${contactContent.email}`}
            className="text-primary hover:underline"
          >
            {contactContent.email}
          </Link>
        </li>
        <li>
          <Link
            href={contactContent.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Instagram
          </Link>
        </li>
      </ul>
    </div>
  );
}
