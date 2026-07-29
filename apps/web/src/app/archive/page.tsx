import Link from "next/link";

import { DateFormat } from "@/components/date-format";
import { fullUrl, mergeMeta } from "@/lib/utils";
import { getAllArticles } from "@/sanity/fetch";

export const metadata = mergeMeta({
  alternates: {
    canonical: fullUrl("/archive"),
  },
  description: "Every article that The Benson Orbit has published.",
  title: "Archive",
});
export default async function ArchivePage() {
  const articles = await getAllArticles();

  return (
    <div className="mx-auto prose prose-gray dark:prose-invert prose-a:font-normal prose-a:decoration-border prose-a:underline-offset-4 prose-a:hover:text-foreground prose-a:hover:decoration-primary prose-a:focus-visible:text-foreground prose-a:focus-visible:decoration-primary">
      <h1>Archive</h1>
      <p>Every article that The Benson Orbit has published.</p>

      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <Link href={article.url}>
              <strong>
                <DateFormat date={article.date} dateStyle="medium" />
              </strong>
              : {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
