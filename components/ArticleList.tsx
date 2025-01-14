import { Authors } from "@/components/Authors";
import { DateFormat } from "@/components/DateFormat";
import { LatestArticlesQueryResult } from "@/sanity.types";
import { Image } from "next-sanity/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export function ArticleList(props: {
	articles: LatestArticlesQueryResult;
	className?: string;
}) {
	return (
		<div className={twMerge("flex max-w-3xl flex-col", props.className)}>
			{props.articles.map((article) => (
				<Article key={article._id} article={article} />
			))}
		</div>
	);
}

function Article({ article }: { article: LatestArticlesQueryResult[0] }) {
	return (
		<article className="group">
			<Link
				href={article.url}
				className="group flex flex-col gap-3 border-b py-3 text-balance group-last:border-b-0 md:flex-row md:gap-6"
			>
				<Image
					src={article.coverImage.url!}
					alt={article.coverImage.alt || ""}
					className="h-full rounded-sm drop-shadow-xs md:max-w-48"
					width={400}
					height={250}
					sizes="(min-width: 768px) 200px, 100vw"
				/>

				<div>
					<h3 className="text-xl font-bold group-hover:underline">
						{article.title}
					</h3>

					<p className="my-1 text-lg text-gray-700 dark:text-gray-300">
						{article.summary}
					</p>

					<p className="font-sans text-gray-600 dark:text-gray-400">
						<Authors
							authors={article.authors}
							max={4}
							className="font-semibold text-gray-700 dark:text-gray-300"
						/>
						<DateFormat
							date={article.date}
							className="font-semibold text-gray-700 dark:text-gray-300"
						/>
					</p>
				</div>
			</Link>
		</article>
	);
}
