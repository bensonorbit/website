import { Feed } from "feed";

import { categories } from "@/lib/data";
import { getAllArticles } from "@/sanity/fetch";

export const dynamic = "force-static";

export async function GET() {
  const url = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";
  const year = new Date().getFullYear();

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
  });

  const articles = await getAllArticles();

  for (const article of articles) {
    feed.addItem({
      author: article.authors?.map((author) => ({
        link: `${url}/authors/${author.slug}`,
        name: author.name,
      })),
      category: [
        {
          name: categories[article.category || "news"],
          term: article.category || "news",
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
