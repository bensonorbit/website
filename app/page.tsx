import { ArticleList } from "@/components/ArticleList";
import { Authors } from "@/components/Authors";
import { DateFormat } from "@/components/DateFormat";
import { NewsletterForm } from "@/components/NewsletterForm";
import { socials } from "@/lib/data";
import { mergeMeta } from "@/lib/utils";
import { LatestArticlesQueryResult } from "@/sanity.types";
import { getLatestArticles, getSettings } from "@/sanity/fetch";
import { Image } from "next-sanity/image";
import Link from "next/link";
import { JsonLd } from "react-schemaorg";
import { NewsMediaOrganization, WebSite } from "schema-dts";

export const metadata = mergeMeta({
	description: "The student-run newspaper of Benson Polytechnic High School",
});

export default async function HomePage() {
	const settings = await getSettings(); // Featured articles are defined in the studio
	const featuredArticles = settings?.featuredArticles || [];
	const heroArticle = featuredArticles[0]; // First featured article is the hero article
	const topArticles = featuredArticles.slice(1, 4); // Next 3 featured articles are top articles
	const moreFeaturedArticles = featuredArticles.slice(4); // Remaining featured articles are in the right column
	const articles = await getLatestArticles();
	const latestArticles = articles.filter(
		(article) =>
			!featuredArticles.some((featured) => featured._id === article._id),
	);

	return (
		<>
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

				{moreFeaturedArticles.length > 0 && (
					<Right>
						{moreFeaturedArticles.map((article) => (
							<FeaturedArticleCard article={article} key={article._id} />
						))}
					</Right>
				)}
			</div>

			<div className="flex flex-col gap-6 pt-8 xl:flex-row">
				<section>
					<h2 className="max-w-3xl border-b pb-3 font-sans font-medium tracking-wide uppercase">
						Latest
					</h2>
					<ArticleList articles={latestArticles} />
				</section>

				<div className="top-16 mx-auto flex max-w-xl grow basis-0 flex-col gap-4 xl:sticky">
					<section className="h-min rounded-sm border bg-gray-100 p-4 font-sans text-balance dark:bg-gray-900">
						<h2 className="text-xl font-bold tracking-tight xl:text-2xl">
							Stay updated on everything Benson.
						</h2>
						<p className="mt-1 text-lg text-gray-700 xl:text-xl dark:text-gray-300">
							Sign up for our newsletter to get the latest Orbit articles
							delivered to your inbox.
						</p>
						<NewsletterForm />
					</section>
				</div>
			</div>

			<JsonLd<WebSite>
				item={{
					"@context": "https://schema.org",
					"@type": "WebSite",
					name: "The Benson Orbit",
					url: "https://bensonorbit.com",
					alternateName: ["Benson Orbit", "The Orbit", "Orbit"],
				}}
			/>

			<JsonLd<NewsMediaOrganization>
				item={{
					"@context": "https://schema.org",
					"@type": "NewsMediaOrganization",
					name: "The Benson Orbit",
					description:
						"The student-run newspaper of Benson Polytechnic High School in Portland, Oregon.",
					url: "https://bensonorbit.com",
					logo: "https://bensonorbit.com/logo-1024.webp",
					contactPoint: {
						"@type": "ContactPoint",
						email: "contact@bensonorbit.com",
					},
					email: "contact@bensonorbit.com",
					sameAs: socials.map((social) => social.href),
				}}
			/>
		</>
	);
}

function Left(props: { children?: React.ReactNode }) {
	return (
		<section className="col-span-full pb-3 md:col-span-5 md:pr-3 md:pb-0 lg:col-span-4">
			{props.children}
		</section>
	);
}

function Middle(props: { children?: React.ReactNode }) {
	return (
		<section className="col-span-full flex flex-col justify-between border-t pt-3 md:col-span-3 md:border-t-0 md:border-l md:pt-0 md:pl-3 lg:col-span-2 lg:border-r lg:px-3 lg:last:border-r-0">
			{props.children}
		</section>
	);
}

function Right(props: { children?: React.ReactNode }) {
	return (
		<section className="col-span-full flex flex-col pt-8 lg:col-span-2 lg:pt-0 lg:pl-3 lg:even:border-l">
			<h2 className="border-b pb-3 font-sans font-medium tracking-wide uppercase">
				Featured
			</h2>

			<div className="grid grid-cols-1 gap-6 pt-3 md:grid-cols-2 lg:grid-cols-1 lg:gap-0 lg:divide-y">
				{props.children}
			</div>
		</section>
	);
}

function HeroArticleCard(props: { article: LatestArticlesQueryResult[0] }) {
	const { article } = props;

	return (
		<article>
			<Link href={article.url} className="group flex flex-col text-balance">
				<Image
					alt={article.coverImage.alt || ""}
					src={article.coverImage.url!}
					width={800}
					height={550}
					className="rounded-sm drop-shadow-xs"
					placeholder="blur"
					blurDataURL={article.coverImage.lqip!}
					sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, (min-width: 768px) 65vw, 100vw"
					priority
				/>

				<h2 className="my-3 text-3xl font-bold group-hover:underline md:my-6 md:text-4xl">
					{article.title}
				</h2>

				<p className="text-xl text-gray-700 dark:text-gray-300">
					{article.summary}
				</p>

				<p className="mt-3 font-sans text-lg text-gray-600 md:mt-6 dark:text-gray-400">
					By{" "}
					<Authors
						authors={article.authors}
						max={4}
						className="font-semibold text-gray-700 dark:text-gray-300"
					/>{" "}
					&mdash;{" "}
					<DateFormat
						className="font-semibold text-gray-700 dark:text-gray-300"
						date={article.date}
					/>
				</p>
			</Link>
		</article>
	);
}

function TopArticleCard(props: { article: LatestArticlesQueryResult[0] }) {
	const { article } = props;

	return (
		<article className="h-full border-b py-3 first:pt-0 last:border-b-0 md:max-h-72 lg:last:pb-0">
			<Link
				href={article.url}
				className="group flex h-full min-h-52 flex-col justify-between text-balance"
			>
				<div className="relative h-3/5 min-h-48 md:min-h-0">
					<Image
						alt={article.coverImage.alt || ""}
						src={article.coverImage.url!}
						fill
						className="rounded-sm object-cover drop-shadow-xs"
						placeholder="blur"
						blurDataURL={article.coverImage.lqip!}
						sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 768px) 35vw, 100vw"
					/>
				</div>

				<h3 className="my-3 text-xl leading-6 font-bold group-hover:underline md:my-1">
					{article.title}
				</h3>

				<p className="text-lg text-gray-700 md:hidden dark:text-gray-300">
					{article.summary}
				</p>

				<p className="mt-2 font-sans text-gray-600 md:my-0 dark:text-gray-400">
					By{" "}
					<Authors
						authors={article.authors}
						max={2}
						className="font-medium text-gray-700 dark:text-gray-300"
					/>{" "}
					&mdash;{" "}
					<DateFormat
						date={article.date}
						style="medium"
						className="font-medium text-gray-700 dark:text-gray-300"
					/>
				</p>
			</Link>
		</article>
	);
}

function FeaturedArticleCard(props: { article: LatestArticlesQueryResult[0] }) {
	const { article } = props;

	return (
		<article className="first:pt-0 last:pb-0 lg:py-3">
			<Link
				href={article.url}
				className="group flex items-start justify-between gap-2 text-balance"
			>
				<div>
					<h3 className="text-lg leading-6 font-bold group-hover:underline">
						{article.title}
					</h3>
					<p className="mt-1 font-sans text-sm text-gray-600 dark:text-gray-400">
						By{" "}
						<Authors
							authors={article.authors}
							max={2}
							className="font-medium text-gray-700 dark:text-gray-300"
						/>{" "}
						&mdash;{" "}
						<DateFormat
							date={article.date}
							style="medium"
							className="text-gray-700 dark:text-gray-300"
						/>
					</p>
				</div>

				<Image
					alt={article.coverImage.alt || ""}
					src={article.coverImage.url!}
					width={90}
					height={90}
					className="rounded-sm drop-shadow-xs"
					placeholder="blur"
					blurDataURL={article.coverImage.lqip!}
					sizes="90px"
				/>
			</Link>
		</article>
	);
}
