import { cx } from "css-variants";
import { Image } from "next-sanity/image";
import Link from "next/link";

import { Authors } from "@/components/authors";
import { DateFormat } from "@/components/date-format";
import { Skeleton } from "@/components/ui/skeleton";
import type { FeaturedArticlesQueryResult } from "@/sanity/types";

type FeaturedArticleData = FeaturedArticlesQueryResult[number];

export function HomepageArticleGrid({
  articles,
}: {
  articles: FeaturedArticlesQueryResult;
}) {
  const heroArticle = articles.at(0);
  const topArticles = articles.slice(1, 4);
  const moreFeaturedArticles = articles.slice(4);

  return (
    <ArticleGrid>
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
    </ArticleGrid>
  );
}

export function HomepageArticleGridSkeleton() {
  return (
    <>
      <output className="sr-only">Loading featured articles...</output>

      <ArticleGrid className="animate-pulse motion-reduce:animate-none">
        <Left>
          <div aria-hidden="true">
            <Skeleton className="aspect-16/11 w-full" />

            <div className="my-3 space-y-3 md:my-6">
              <Skeleton className="h-8 w-11/12 md:h-10" />
              <Skeleton className="h-8 w-3/4 md:h-10" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
            </div>

            <Skeleton className="mt-3 h-6 w-2/3 md:mt-6" />
          </div>
        </Left>

        <Middle>
          {Array.from({ length: 3 }, (_, index) => (
            <TopArticleSkeleton key={`top-${index}`} />
          ))}
        </Middle>

        <Right>
          {Array.from({ length: 6 }, (_, index) => (
            <FeaturedArticleSkeleton key={`featured-${index}`} />
          ))}
        </Right>
      </ArticleGrid>
    </>
  );
}

function ArticleGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("grid grid-cols-8 lg:min-h-[714px]", className)}>
      {children}
    </div>
  );
}

function Left({ children }: { children?: React.ReactNode }) {
  return (
    <section className="col-span-full pb-3 md:col-span-5 md:pr-3 md:pb-0 lg:col-span-4">
      {children}
    </section>
  );
}

function Middle({ children }: { children?: React.ReactNode }) {
  return (
    <section className="col-span-full flex flex-col justify-between border-t pt-3 md:col-span-3 md:border-t-0 md:border-l md:pt-0 md:pl-3 lg:col-span-2 lg:border-r lg:px-3 lg:last:border-r-0">
      {children}
    </section>
  );
}

function Right({ children }: { children?: React.ReactNode }) {
  return (
    <section className="col-span-full flex flex-col pt-8 lg:col-span-2 lg:pt-0 lg:pl-3 lg:even:border-l">
      <h2 className="border-b pb-3 font-sans font-medium tracking-wide uppercase">
        Featured
      </h2>

      <div className="grid grid-cols-1 gap-6 pt-3 md:grid-cols-2 lg:grid-cols-1 lg:gap-0 lg:divide-y">
        {children}
      </div>
    </section>
  );
}

function HeroArticle({ article }: { article: FeaturedArticleData }) {
  const { coverImage } = article;
  const imageUrl = coverImage.url;

  if (!imageUrl) {
    return null;
  }

  return (
    <article>
      <Link
        href={article.url}
        className="group flex flex-col text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <Image
          alt={coverImage.alt || ""}
          src={imageUrl}
          width={800}
          height={550}
          className="rounded-sm drop-shadow-xs"
          placeholder="blur"
          blurDataURL={coverImage.lqip || undefined}
          sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, (min-width: 768px) 65vw, calc(100vw - 48px)"
          preload
          fetchPriority="high"
        />

        <h2 className="my-3 text-3xl font-bold group-hover:underline group-focus-visible:underline md:my-6 md:text-4xl">
          {article.title}
        </h2>

        <p className="text-xl text-foreground-secondary">{article.summary}</p>

        <p className="mt-3 font-sans text-lg text-foreground-muted md:mt-6">
          {article.authors && article.authors.length >= 1 && (
            <>
              By{" "}
              <Authors
                authors={article.authors}
                max={4}
                className="font-semibold text-foreground-secondary"
              />{" "}
              —{" "}
            </>
          )}
          <DateFormat
            className="font-semibold text-foreground-secondary"
            date={article.date}
          />
        </p>
      </Link>
    </article>
  );
}

function TopArticle({ article }: { article: FeaturedArticleData }) {
  const { coverImage } = article;
  const imageUrl = coverImage.url;

  if (!imageUrl) {
    return null;
  }

  return (
    <article className="h-full border-b py-3 first:pt-0 last:border-b-0 md:max-h-72 lg:last:pb-0">
      <Link
        href={article.url}
        className="group flex h-full min-h-52 flex-col justify-between text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <div className="relative h-3/5 min-h-48 md:min-h-0">
          <Image
            alt={coverImage.alt || ""}
            src={imageUrl}
            fill
            className="rounded-sm object-cover drop-shadow-xs"
            placeholder="blur"
            blurDataURL={coverImage.lqip || undefined}
            sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 768px) 35vw, calc(100vw - 48px)"
          />
        </div>

        <h3 className="my-3 text-xl leading-6 font-bold group-hover:underline group-focus-visible:underline md:my-1">
          {article.title}
        </h3>

        <p className="text-lg text-foreground-secondary md:hidden">
          {article.summary}
        </p>

        <p className="mt-2 font-sans text-foreground-muted md:my-0">
          {article.authors && article.authors.length >= 1 && (
            <>
              By{" "}
              <Authors
                authors={article.authors}
                max={2}
                className="font-medium text-foreground-secondary"
              />{" "}
              —{" "}
            </>
          )}
          <DateFormat
            date={article.date}
            dateStyle="medium"
            className="font-medium text-foreground-secondary"
          />
        </p>
      </Link>
    </article>
  );
}

function TopArticleSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="h-full border-b py-3 first:pt-0 last:border-b-0 md:max-h-72 lg:last:pb-0"
    >
      <div className="flex h-full min-h-52 flex-col justify-between">
        <Skeleton className="h-3/5 min-h-48 w-full md:min-h-0" />

        <div className="my-3 space-y-2 md:my-1">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        <div className="space-y-2 md:hidden">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>

        <Skeleton className="mt-2 h-5 w-2/3 md:my-0" />
      </div>
    </article>
  );
}

function FeaturedArticle({ article }: { article: FeaturedArticleData }) {
  const { coverImage } = article;
  const imageUrl = coverImage.url;

  if (!imageUrl) {
    return null;
  }

  return (
    <article className="first:pt-0 last:pb-0 lg:py-3">
      <Link
        href={article.url}
        className="group flex items-start justify-between gap-2 text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <div>
          <h3 className="text-lg leading-6 font-bold group-hover:underline group-focus-visible:underline">
            {article.title}
          </h3>
          <p className="mt-1 font-sans text-sm text-foreground-muted">
            {article.authors && article.authors.length >= 1 && (
              <>
                By{" "}
                <Authors
                  authors={article.authors}
                  max={2}
                  className="font-medium text-foreground-secondary"
                />{" "}
                —{" "}
              </>
            )}
            <DateFormat
              date={article.date}
              dateStyle="medium"
              className="text-foreground-secondary"
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

function FeaturedArticleSkeleton() {
  return (
    <article aria-hidden="true" className="first:pt-0 last:pb-0 lg:py-3">
      <div className="flex min-h-22.5 items-start justify-between gap-2">
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <Skeleton className="size-22.5 shrink-0" />
      </div>
    </article>
  );
}
