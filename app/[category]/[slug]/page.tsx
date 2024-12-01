import { notFound, redirect } from "next/navigation";
import { CustomPortableText } from "@/components/CustomPortableText";
import { getArticleBySlug } from "@/sanity/fetch";
import { DateFormat } from "@/components/DateFormat";
import { ArticleImage } from "@/components/ArticleImage";
import { mergeMeta } from "@/lib/utils";
import { Fancybox } from "@/components/Fancybox";
import { Authors } from "@/components/Authors";
import { categories } from "@/lib/data";

type Props = {
	params: Promise<{ category: string; slug: string }>;
};

type Author = {
	name: string;
	slug: string | null;
};

export const dynamic = "force-static";

export async function generateMetadata(props: Props) {
	const params = await props.params;
	const article = await getArticleBySlug(params.slug);
	if (!article) notFound();
	const url = `${article.coverImage.url}?w=1200&h=630&fit=crop`;
	const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
	const category = (article.category as keyof typeof categories) || "commons";

	return mergeMeta({
		title: article.title,
		description: article.summary,
		authors: article.authors?.map((author: Author) => ({
			name: author.name,
			url: `/authors/${author.slug}`,
		})),
		openGraph: {
			type: "article",
			publishedTime: article.date,
			authors: article.authors?.map((author: Author) => author.name),
			images: {
				url,
				alt: article.coverImage.alt || undefined,
			},
			section: categories[category],
		},
		alternates: {
			types: {
				"application/json+oembed": `https://${domain}/${article.category}/${article.slug}/oembed`,
				"application/rss+xml": "/rss.xml",
			},
		},
	});
}

export default async function ArticlePage(props: Props) {
	const params = await props.params;
	const article = await getArticleBySlug(params.slug);
	if (!article) notFound();
	if (article.category !== params.category)
		redirect(`/${article.category}/${article.slug}`);

	return (
		<article className="mx-auto prose prose-gray dark:prose-invert prose-a:transition-colors prose-a:hover:text-orange-700 dark:prose-a:hover:text-orange-300 prose-img:rounded-xs prose-img:drop-shadow-xs prose-img:hover:cursor-zoom-in">
			<h1 className="mb-0 text-balance">{article.title}</h1>
			<p className="lead my-2 text-balance">{article.summary}</p>

			<p className="mt-0 text-lg">
				By{" "}
				<Authors
					authors={article.authors}
					link
					className="font-semibold no-underline"
				/>{" "}
				&mdash;{" "}
				<strong>
					<DateFormat date={article.date} />
				</strong>
			</p>

			<ArticleImage isCover {...article.coverImage} />
			<CustomPortableText value={article.content} />

			<Fancybox />
		</article>
	);
}
