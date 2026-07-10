import { DateFormat } from "@/components/DateFormat";
import { mergeMeta } from "@/lib/utils";
import { getAllArticles } from "@/sanity/fetch";
import Link from "next/link";

export const metadata = mergeMeta({
	title: "Archive",
	description: "Every article that The Benson Orbit has published.",
});
export const dynamic = "force-static";

export default async function ArchivePage() {
	const articles = await getAllArticles();

	return (
		<div className="mx-auto prose prose-gray dark:prose-invert prose-a:font-normal prose-a:no-underline prose-a:transition-colors prose-a:hover:text-primary">
			<h1>Archive</h1>
			<p>Every article that The Benson Orbit has published.</p>

			<ul>
				{articles.map((article) => (
					<li key={article._id}>
						<Link href={`/${article.category}/${article.slug}`}>
							<strong className="underline">
								<DateFormat date={article.date} style="medium" />
							</strong>
							: {article.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
