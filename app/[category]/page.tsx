import { mergeMeta } from "@/lib/utils";
import { getArticlesByCategory } from "@/sanity/fetch";
import { categories } from "@/lib/data";
import { ArticleList } from "@/components/ArticleList";

type Props = {
	params: Promise<{ category: keyof typeof categories }>;
};

export function generateStaticParams() {
	return Object.keys(categories).map((category) => ({ category }));
}

export async function generateMetadata(props: Props) {
	const { category } = await props.params;
	return mergeMeta({ title: categories[category] });
}

export const dynamicParams = false;
export const dynamic = "force-static";

export default async function CategoryPage(props: Props) {
	const { category } = await props.params;
	const title = categories[category];
	const articles = await getArticlesByCategory(category);

	return (
		<>
			<h2 className="max-w-3xl border-b pb-3 text-3xl font-bold md:text-4xl">
				{title}
			</h2>
			{articles.length ? (
				<ArticleList articles={articles} />
			) : (
				<p className="pt-3">
					We haven't published anything in that category yet.
				</p>
			)}
		</>
	);
}
