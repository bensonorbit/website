import { ArticleList } from "@/components/ArticleList";
import { CustomPortableText } from "@/components/CustomPortableText";
import { mergeMeta } from "@/lib/utils";
import { getAuthorBySlug } from "@/sanity/fetch";
import { Image } from "next-sanity/image";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";

export async function generateMetadata(props: Props) {
	const params = await props.params;
	const author = await getAuthorBySlug(params.slug);
	if (!author) notFound();

	return mergeMeta({
		title: author.name,
		openGraph: {
			type: "profile",
		},
	});
}

export default async function AuthorPage(props: Props) {
	const params = await props.params;
	const author = await getAuthorBySlug(params.slug);
	if (!author) notFound();
	const firstName = author.name?.split(" ")[0] || "this author";

	return (
		<div className="prose prose-gray mx-auto max-w-3xl dark:prose-invert prose-a:transition-colors hover:prose-a:text-orange-700 prose-img:rounded-sm prose-img:drop-shadow-sm dark:hover:prose-a:text-orange-300">
			<div className="flex flex-row items-center gap-4">
				{author.photo.url && (
					<Image
						src={author.photo.url}
						width={76}
						height={76}
						alt={author.name || "Photo of author"}
						className="not-prose rounded-full border drop-shadow-sm"
						placeholder="blur"
						blurDataURL={author.photo.lqip || undefined}
					/>
				)}

				<div>
					<h1 className="mb-1 mt-0">{author.name}</h1>
					<p className="lead my-0">{author.role}</p>
				</div>
			</div>

			<CustomPortableText value={author.bio} />

			{author.articles.length > 0 && (
				<>
					<h2 className="mb-0 py-3">Articles by {firstName}</h2>
					<ArticleList
						articles={author.articles}
						className="not-prose text-foreground mx-auto border-t"
					/>
				</>
			)}
		</div>
	);
}
