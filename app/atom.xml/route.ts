import { Feed } from "feed";

import { getCurrentYear } from "@/lib/time";
import { getAllArticles } from "@/sanity/fetch";

export async function GET() {
  const url = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";
  const [year, articles] = await Promise.all([
    getCurrentYear(),
    getAllArticles(),
  ]);
  const updated = new Date(articles[0]?.date ?? "2024-01-01T00:00:00.000Z");

  const feed = new Feed({
    copyright: `${year} The Benson Orbit. All rights reserved.`,
    description: "The student-run newspaper of Benson Polytechnic High School",
    favicon: `${url}/favicon.ico`,
    feedLinks: {
      atom: `${url}/atom.xml`,
    },
    id: url,
    language: "en",
    link: url,
    title: "The Benson Orbit",
    updated,
  });

  for (const article of articles) {
    if (!article.primaryCategory) {
      continue;
    }

    feed.addItem({
      author: article.authors?.map((author) => ({
        link: `${url}/authors/${author.slug}`,
        name: author.name,
      })),
      category: [
        {
          name: article.primaryCategory.title,
          term: article.primaryCategory.slug,
        },
      ],
      date: new Date(article.date),
      description: article.summary || "",
      link: url + article.url,
      title: article.title,
    });
  }

  return new Response(feed.atom1(), {
    headers: { "Content-Type": "application/atom+xml" },
  });
}
