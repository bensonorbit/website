import { ArticleList } from "@/components/ArticleList";
import { Authors } from "@/components/Authors";
import { DateFormat } from "@/components/DateFormat";
import { LatestArticlesQueryResult } from "@/sanity.types";
import { getLatestArticles, getSettings } from "@/sanity/fetch";
import { Image } from "next-sanity/image";
import Link from "next/link";

export default async function HomePage() {
	const articles = await getLatestArticles();
	const heroArticle = articles[0]; // First article is the hero article
	const topArticles = articles.slice(1, 4); // Next 3 articles are top articles
	const latestArticles = articles.slice(4); // The rest are latest articles
	const settings = await getSettings(); // Featured articles are defined in the studio
	const featuredArticles = settings?.featuredArticles || [];

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "The Benson Orbit",
		url: "https://bensonorbit.com",
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<div className="grid grid-cols-8">
				{heroArticle && (
					<Left>
						<HeroArticleCard article={heroArticle} />
					</Left>
				)}

				{topArticles.length > 0 && (
					<Middle>
						{topArticles.map((article) => (
							<TopArticleCard article={article} key={article._id} />
						))}
					</Middle>
				)}

				{featuredArticles.length > 0 && (
					<Right>
						{featuredArticles.map((article) => (
							<FeaturedArticleCard article={article} key={article._id} />
						))}
					</Right>
				)}
			</div>

			{latestArticles.length > 0 && (
				<>
					<h2 className="max-w-3xl border-b pb-3 pt-8 font-medium">Latest</h2>
					<ArticleList articles={latestArticles} />
				</>
			)}
		</>
	);
}

function Left(props: { children?: React.ReactNode }) {
	return (
		<section className="col-span-full pb-3 md:col-span-5 md:pb-0 md:pr-3 lg:col-span-4">
			{props.children}
		</section>
	);
}

function Middle(props: { children?: React.ReactNode }) {
	return (
		<section className="col-span-full flex flex-col justify-between border-t pt-3 md:col-span-3 md:border-l md:border-t-0 md:pl-3 md:pt-0 lg:col-span-2 lg:border-r lg:px-3 lg:last:border-r-0">
			{props.children}
		</section>
	);
}

function Right(props: { children?: React.ReactNode }) {
	return (
		<section className="col-span-full flex flex-col pt-8 lg:col-span-2 lg:pl-3 lg:pt-0 lg:even:border-l">
			<h2 className="border-b pb-3 font-medium">Featured</h2>

			<div className="grid grow grid-cols-1 gap-6 pt-3 md:grid-cols-3 lg:grid-cols-1 lg:gap-0">
				{props.children}
			</div>
		</section>
	);
}

function HeroArticleCard(props: { article: LatestArticlesQueryResult[0] }) {
	const { article } = props;

	return (
		<article className="h-full">
			<Link
				href={article.url}
				className="group flex h-full flex-col text-balance"
			>
				<Image
					alt={article.coverImage.alt!}
					src={article.coverImage.url!}
					width={800}
					height={550}
					className="min-h-64 rounded-sm drop-shadow-sm"
					placeholder="blur"
					blurDataURL={article.coverImage.lqip!}
					sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, (min-width: 768px) 65vw, 100vw"
					priority
				/>

				<h2 className="my-3 text-3xl font-bold group-hover:underline md:my-6 md:text-4xl">
					{article.title}
				</h2>

				<p className="text-xl">{article.summary}</p>

				<p className="mt-3 text-lg md:mt-6">
					By{" "}
					<Authors
						authors={article.authors}
						max={4}
						className="font-semibold"
					/>{" "}
					&mdash;{" "}
					<span className="font-semibold">
						<DateFormat date={article.date} />
					</span>
				</p>
			</Link>
		</article>
	);
}

function TopArticleCard(props: { article: LatestArticlesQueryResult[0] }) {
	const { article } = props;

	return (
		<article className="h-full max-h-72 border-b py-3 first:pt-0 last:border-b-0 lg:last:pb-0">
			<Link
				href={article.url}
				className="group flex h-full min-h-52 flex-col justify-between text-balance"
			>
				<div className="relative h-3/5 min-h-48 md:min-h-0">
					<Image
						alt={article.coverImage.alt!}
						src={article.coverImage.url!}
						fill
						className="rounded-sm object-cover drop-shadow-sm"
						placeholder="blur"
						blurDataURL={article.coverImage.lqip!}
						sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 768px) 35vw, 100vw"
					/>
				</div>

				<h3 className="my-3 text-xl font-bold leading-6 group-hover:underline md:my-0">
					{article.title}
				</h3>

				<p className="text-lg md:hidden">{article.summary}</p>

				<p className="mt-2 md:my-0">
					By{" "}
					<Authors authors={article.authors} max={2} className="font-medium" />{" "}
					&mdash;{" "}
					<span className="font-medium">
						<DateFormat date={article.date} style="medium" />
					</span>
				</p>
			</Link>
		</article>
	);
}

function FeaturedArticleCard(props: { article: LatestArticlesQueryResult[0] }) {
	const { article } = props;

	return (
		<article className="h-full first:pt-0 last:pb-0 lg:border-b lg:py-3 lg:last:border-b-0">
			<Link
				href={article.url}
				className="group flex items-start justify-between gap-2 text-balance"
			>
				<div>
					<h3 className="text-lg font-bold leading-6 group-hover:underline">
						{article.title}
					</h3>
					<p className="mt-1 text-sm">
						By <Authors authors={article.authors} max={1} /> &mdash;{" "}
						<DateFormat date={article.date} style="medium" />
					</p>
				</div>

				<Image
					alt={article.coverImage.alt!}
					src={article.coverImage.url!}
					width={128}
					height={128}
					className="size-full w-20 rounded-sm drop-shadow-sm lg:w-32"
					placeholder="blur"
					blurDataURL={article.coverImage.lqip!}
					sizes="90px"
				/>
			</Link>
		</article>
	);
}
