import { ArticleList } from "@/components/ArticleList";
import { CustomPortableText } from "@/components/CustomPortableText";
import { mergeMeta } from "@/lib/utils";
import { getAuthorBySlug } from "@/sanity/fetch";
import { toPlainText } from "next-sanity";
import { Image } from "next-sanity/image";
import { notFound } from "next/navigation";
import { ProfilePage } from "schema-dts";
import { JsonLd } from "react-schemaorg";

type Props = {
	params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";

export async function generateMetadata(props: Props) {
	const params = await props.params;
	const author = await getAuthorBySlug(params.slug);
	if (!author) notFound();

	const images = author.photo.url
		? { url: `${author.photo.url}?w=200&auto=format&fit=min` }
		: undefined;

	const description = author.bio && toPlainText(author.bio).slice(0, 200);

	return mergeMeta({
		title: author.name,
		description,
		openGraph: { type: "profile", images },
		twitter: { card: "summary" },
	});
}

export default async function AuthorPage(props: Props) {
	const params = await props.params;
	const author = await getAuthorBySlug(params.slug);
	if (!author) notFound();
	const firstName = author.name?.split(" ")[0] || "this author";

	return (
		<div className="mx-auto prose max-w-3xl prose-gray dark:prose-invert prose-a:transition-colors prose-a:hover:text-orange-700 dark:prose-a:hover:text-orange-300 prose-img:rounded-xs prose-img:drop-shadow-xs">
			<div className="flex flex-row items-center gap-4">
				{author.photo.url && (
					<Image
						src={author.photo.url}
						width={76}
						height={76}
						alt={author.name || "Photo of author"}
						className="not-prose rounded-full border drop-shadow-xs"
						placeholder="blur"
						blurDataURL={author.photo.lqip || undefined}
					/>
				)}

				<div>
					<h1 className="mt-0 mb-1">{author.name}</h1>
					<p className="lead mt-0 mb-0">{author.role}</p>
				</div>
			</div>

			<CustomPortableText value={author.bio} />

			{author.articles.length > 0 && (
				<>
					<h2 className="mb-0 py-3">Articles by {firstName}</h2>
					<ArticleList
						articles={author.articles}
						className="not-prose mx-auto border-t text-foreground"
					/>
				</>
			)}

			<JsonLd<ProfilePage>
				item={{
					"@context": "https://schema.org",
					"@type": "ProfilePage",
					mainEntity: {
						"@type": "Person",
						name: author.name,
						description: author.bio && toPlainText(author.bio).slice(0, 200),
						image: `${author.photo.url}?w=800&auto=format&fit=min`,
					},
				}}
			/>
		</div>
	);
}
