import Link from "next/link";

import { DateFormat } from "@/components/date-format";
import { Prose } from "@/components/prose";
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
    <Prose>
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
    </Prose>
  );
}
