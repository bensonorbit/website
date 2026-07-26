import { Image } from "next-sanity/image";
import Link from "next/link";
import { JsonLd } from "react-schemaorg";
import type { NewsMediaOrganization, WebSite } from "schema-dts";

import { ArticleList } from "@/components/article-list";
import { Authors } from "@/components/authors";
import { DateFormat } from "@/components/date-format";
import { ExternalLinkIcon } from "@/components/icons";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { socials } from "@/lib/data";
import { fullUrl, mergeMeta } from "@/lib/utils";
import { getLatestArticles, getSettings } from "@/sanity/fetch";
import type { LatestArticlesQueryResult } from "@/sanity/types";

export const metadata = mergeMeta({
  description: "The student-run newspaper of Benson Polytechnic High School",
  openGraph: {
    title: "The Benson Orbit",
  },
  title: {
    absolute: "The Benson Orbit | Benson Polytechnic High School Newspaper",
  },
});

export default async function HomePage() {
  const [settings, articles] = await Promise.all([
    getSettings(),
    getLatestArticles(),
  ]);

  // Featured articles are defined in the studio
  const featuredArticles = settings?.featuredArticles || [];

  // First featured article is the hero article
  const heroArticle = featuredArticles.at(0);

  // Next 3 featured articles are top articles
  const topArticles = featuredArticles.slice(1, 4);

  // Remaining featured articles are in the right column
  const moreFeaturedArticles = featuredArticles.slice(4);

  const latestArticles = articles.filter(
    (article) =>
      !featuredArticles.some((featured) => featured._id === article._id)
  );

  return (
    <>
      <h1 className="sr-only">The Benson Orbit</h1>

      <div className="grid grid-cols-8">
        {heroArticle && (
          <Left>
            <HeroArticle article={heroArticle} />
          </Left>
        )}

        {topArticles.length > 0 && (
          <Middle>
            {topArticles.map((article) => (
              <TopArticle article={article} key={article._id} />
            ))}
          </Middle>
        )}

        {moreFeaturedArticles.length > 0 && (
          <Right>
            {moreFeaturedArticles.map((article) => (
              <FeaturedArticle article={article} key={article._id} />
            ))}
          </Right>
        )}
      </div>

      <div className="flex flex-col gap-6 pt-8 lg:flex-row">
        {latestArticles.length > 0 && (
          <section>
            <h2 className="max-w-3xl border-b pb-3 font-sans font-medium tracking-wide uppercase">
              Latest
            </h2>
            <ArticleList articles={latestArticles} />
          </section>
        )}

        <aside className="sticky top-23 mx-auto h-fit w-full max-w-lg grow basis-0">
          <SocialMediaFollowCard />
        </aside>
      </div>

      <JsonLd<WebSite>
        item={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          alternateName: ["Benson Orbit", "The Orbit", "Orbit"],
          name: "The Benson Orbit",
          url: fullUrl(),
        }}
      />

      <JsonLd<NewsMediaOrganization>
        item={{
          "@context": "https://schema.org",
          "@type": "NewsMediaOrganization",
          contactPoint: {
            "@type": "ContactPoint",
            email: "contact@bensonorbit.com",
          },
          description:
            "The student-run newspaper of Benson Polytechnic High School in Portland, Oregon.",
          email: "contact@bensonorbit.com",
          logo: fullUrl("/logo-1024.webp"),
          name: "The Benson Orbit",
          sameAs: socials.map((social) => social.href),
          url: fullUrl(),
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

function HeroArticle(props: { article: LatestArticlesQueryResult[0] }) {
  const { article } = props;
  const { coverImage } = article;
  const imageUrl = coverImage.url;

  if (!imageUrl) {
    return null;
  }

  return (
    <article>
      <Link href={article.url} className="group flex flex-col text-balance">
        <Image
          alt={coverImage.alt || ""}
          src={imageUrl}
          width={800}
          height={550}
          className="rounded-sm drop-shadow-xs"
          placeholder="blur"
          blurDataURL={coverImage.lqip || undefined}
          sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, (min-width: 768px) 65vw, 100vw"
          preload
          fetchPriority="high"
        />

        <h2 className="my-3 text-3xl font-bold group-hover:underline md:my-6 md:text-4xl">
          {article.title}
        </h2>

        <p className="text-xl text-gray-700 dark:text-gray-300">
          {article.summary}
        </p>

        <p className="mt-3 font-sans text-lg text-gray-600 md:mt-6 dark:text-gray-400">
          <Authors
            authors={article.authors}
            max={4}
            className="font-semibold text-gray-700 dark:text-gray-300"
          />
          <DateFormat
            className="font-semibold text-gray-700 dark:text-gray-300"
            date={article.date}
          />
        </p>
      </Link>
    </article>
  );
}

function TopArticle(props: { article: LatestArticlesQueryResult[0] }) {
  const { article } = props;
  const { coverImage } = article;
  const imageUrl = coverImage.url;

  if (!imageUrl) {
    return null;
  }

  return (
    <article className="h-full border-b py-3 first:pt-0 last:border-b-0 md:max-h-72 lg:last:pb-0">
      <Link
        href={article.url}
        className="group flex h-full min-h-52 flex-col justify-between text-balance"
      >
        <div className="relative h-3/5 min-h-48 md:min-h-0">
          <Image
            alt={coverImage.alt || ""}
            src={imageUrl}
            fill
            className="rounded-sm object-cover drop-shadow-xs"
            placeholder="blur"
            blurDataURL={coverImage.lqip || undefined}
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
          <Authors
            authors={article.authors}
            max={2}
            className="font-medium text-gray-700 dark:text-gray-300"
          />
          <DateFormat
            date={article.date}
            dateStyle="medium"
            className="font-medium text-gray-700 dark:text-gray-300"
          />
        </p>
      </Link>
    </article>
  );
}

function FeaturedArticle(props: { article: LatestArticlesQueryResult[0] }) {
  const { article } = props;
  const { coverImage } = article;
  const imageUrl = coverImage.url;

  if (!imageUrl) {
    return null;
  }

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
            <Authors
              authors={article.authors}
              max={2}
              className="font-medium text-gray-700 dark:text-gray-300"
            />
            <DateFormat
              date={article.date}
              dateStyle="medium"
              className="text-gray-700 dark:text-gray-300"
            />
          </p>
        </div>

        <Image
          alt={coverImage.alt || ""}
          src={imageUrl}
          width={90}
          height={90}
          className="rounded-sm drop-shadow-xs"
          placeholder="blur"
          blurDataURL={coverImage.lqip || undefined}
          sizes="90px"
        />
      </Link>
    </article>
  );
}

function SocialMediaFollowCard() {
  return (
    <Card>
      <CardTitle>Follow the stories shaping Benson.</CardTitle>

      <CardDescription>
        Get the latest stories, photos, and videos from Benson&apos;s student
        journalists on social media.
      </CardDescription>

      <ul className="grid gap-3">
        {socials.map((social) => (
          <li key={social.name}>
            <a
              href={social.href}
              target="_blank"
              rel="me"
              className="bg-background rounded-sm border px-3 py-2 font-sans font-semibold flex items-center gap-2 hover:border-primary group justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-gray-100 text-gray-700 dark:text-gray-300 dark:bg-gray-900 p-2 border group-hover:text-primary">
                  <social.icon className="size-4" />
                </div>

                {social.name}
              </div>

              <ExternalLinkIcon
                className="size-4 mr-2 text-gray-600 dark:text-gray-400"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}
