import RSS from "rss";
import { getAllArticles } from "@/sanity/fetch";

export const dynamic = "force-static";

export async function GET() {
	const url = process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: "http://localhost:3000";

	// TODO: Add image_url, must be JPG or PNG
	const feed = new RSS({
		title: "The Benson Orbit",
		description: "The student-run newspaper of Benson Polytechnic High School",
		feed_url: url + "/rss.xml",
		site_url: url,
		language: "en",
		categories: ["News"],
	});

	const articles = await getAllArticles();

	for (const article of articles) {
		feed.item({
			title: article.title,
			description: article.summary || "",
			url: url + article.url,
			date: article.date,
			categories: article.category ? [article.category] : undefined,
			author: article.authors?.length ? article.authors[0].name : undefined,
		});
	}

	return new Response(feed.xml({ indent: true }), {
		headers: { "Content-Type": "application/xml" },
	});
}
