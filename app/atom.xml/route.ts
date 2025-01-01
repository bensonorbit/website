import { Feed } from "feed";
import { getAllArticles } from "@/sanity/fetch";
import { categories } from "@/lib/data";

export const dynamic = "force-static";

export async function GET() {
	const url = process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: "http://localhost:3000";

	const feed = new Feed({
		title: "The Benson Orbit",
		description: "The student-run newspaper of Benson Polytechnic High School",
		id: url,
		link: url,
		favicon: url + "/favicon.ico",
		language: "en",
		copyright: "2025 The Benson Orbit. All rights reserved.",
		feedLinks: {
			atom: url + "/atom.xml",
		},
	});

	const articles = await getAllArticles();

	for (const article of articles) {
		feed.addItem({
			title: article.title,
			description: article.summary || "",
			link: url + article.url,
			date: new Date(article.date),
			author: article.authors?.map((author) => ({
				name: author.name,
				link: url + `/authors/${author.slug}`,
			})),
			category: [
				{
					term: article.category || "news",
					name: categories[article.category || "news"],
				},
			],
		});
	}

	return new Response(feed.atom1(), {
		headers: { "Content-Type": "application/atom+xml" },
	});
}
