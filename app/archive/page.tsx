import { mergeMeta } from "@/lib/utils";
import { getAllArticles } from "@/sanity/fetch";
import Link from "next/link";

export const metadata = mergeMeta({ title: "Archive" });
export const dynamic = "force-static";

export default async function ArchivePage() {
	const articles = await getAllArticles();

	return (
		<div className="prose prose-gray mx-auto dark:prose-invert prose-a:font-normal prose-a:no-underline prose-a:transition-colors hover:prose-a:text-orange-700 dark:hover:prose-a:text-orange-300">
			<h1>Archive</h1>
			<p>Every article that The Benson Orbit has published.</p>

			<ul>
				{articles.map((article) => (
					<li key={article._id}>
						<Link href={`/${article.category}/${article.slug}`}>
							<strong className="underline">
								{new Date(article.date).toLocaleDateString("en-US", {
									dateStyle: "medium",
								})}
							</strong>
							: {article.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
