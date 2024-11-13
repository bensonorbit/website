import { getArticleBySlug } from "@/sanity/fetch";

export const dynamic = "force-static";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ category: string; slug: string }> },
) {
	const { slug } = await params;
	const article = await getArticleBySlug(slug);
	if (!article) return new Response("Article not found", { status: 404 });

	return Response.json({
		version: "1.0",
		type: "link",
		title: article.title,
		provider_name: "The Benson Orbit",
		provider_url: "https://bensonorbit.com",
		author_name: article.authors?.[0].name,
		author_url: article.authors?.[0]
			? `https://bensonorbit.com/authors/${article.authors[0].slug}`
			: undefined,
	});
}
