import { Suspense } from "react";
import { JsonLd } from "react-schemaorg";
import type { NewsMediaOrganization, WebSite } from "schema-dts";

import { ArticleList, ArticleListSkeleton } from "@/components/article-list";
import {
  HomepageArticleGrid,
  HomepageArticleGridSkeleton,
} from "@/components/homepage-article-grid";
import { ExternalLinkIcon } from "@/components/icons";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { socials } from "@/lib/data";
import { newsMediaOrganization, webSite } from "@/lib/structured-data";
import { fullUrl, mergeMeta } from "@/lib/utils";
import { getFeaturedArticles, getLatestArticles } from "@/sanity/fetch";

export const metadata = mergeMeta({
  alternates: {
    canonical: fullUrl(),
  },
  description: "The student-run newspaper of Benson Polytechnic High School",
  openGraph: {
    title: "The Benson Orbit",
  },
  title: {
    absolute: "The Benson Orbit | Benson Polytechnic High School Newspaper",
  },
});

export default function HomePage() {
  const featuredArticlesPromise = getFeaturedArticles();
  const latestArticlesPromise = getLatestArticles();

  return (
    <>
      <h1 className="sr-only">The Benson Orbit</h1>

      <Suspense fallback={<HomepageArticleGridSkeleton />}>
        <FeaturedArticles featuredArticlesPromise={featuredArticlesPromise} />
      </Suspense>

      <div className="flex flex-col gap-6 pt-8 lg:flex-row">
        <section className="w-full max-w-3xl">
          <h2 className="border-b pb-3 font-sans font-medium tracking-wide uppercase">
            Latest
          </h2>

          <Suspense fallback={<ArticleListSkeleton length={10} />}>
            <LatestArticles
              featuredArticlesPromise={featuredArticlesPromise}
              latestArticlesPromise={latestArticlesPromise}
            />
          </Suspense>
        </section>

        <aside className="sticky top-[calc(var(--navbar-height)+var(--spacing)*8)] mx-auto h-fit w-full max-w-lg grow basis-0">
          <SocialMediaFollowCard />
        </aside>
      </div>

      <JsonLd<WebSite>
        item={{
          "@context": "https://schema.org",
          ...webSite,
        }}
      />

      <JsonLd<NewsMediaOrganization>
        item={{
          "@context": "https://schema.org",
          ...newsMediaOrganization,
        }}
      />
    </>
  );
}

async function FeaturedArticles({
  featuredArticlesPromise,
}: {
  featuredArticlesPromise: ReturnType<typeof getFeaturedArticles>;
}) {
  const featuredArticles = await featuredArticlesPromise;

  return <HomepageArticleGrid articles={featuredArticles} />;
}

async function LatestArticles({
  featuredArticlesPromise,
  latestArticlesPromise,
}: {
  featuredArticlesPromise: ReturnType<typeof getFeaturedArticles>;
  latestArticlesPromise: ReturnType<typeof getLatestArticles>;
}) {
  const featuredArticles = await featuredArticlesPromise;
  const articles = await latestArticlesPromise;
  const latestArticles = articles
    .filter(
      (article) =>
        !featuredArticles.some((featured) => featured._id === article._id)
    )
    .slice(0, 10);

  if (latestArticles.length === 0) {
    return null;
  }

  return <ArticleList articles={latestArticles} />;
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
