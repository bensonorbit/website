import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ArticleList, ArticleListSkeleton } from "@/components/article-list";
import { CustomPortableText } from "@/components/custom-portable-text";
import { Skeleton } from "@/components/ui/skeleton";
import { fullUrl, mergeMeta } from "@/lib/utils";
import { getArticlesByTopicSlug, getTopicBySlug } from "@/sanity/fetch";

interface Props {
  params: Promise<{ topic: string }>;
}

export async function generateMetadata(props: Props) {
  const { topic: slug } = await props.params;
  const topic = await getTopicBySlug(slug);
  if (!topic) {
    notFound();
  }

  const description = topic.description
    ? toPlainText(topic.description).slice(0, 200)
    : `${topic.name} articles published by The Benson Orbit.`;

  return mergeMeta({
    alternates: {
      canonical: fullUrl(`/topics/${slug}`),
    },
    description,
    title: topic.name,
  });
}

export default function TopicPage(props: Props) {
  return (
    <>
      <Suspense fallback={<TopicHeaderSkeleton />}>
        <TopicHeader params={props.params} />
      </Suspense>

      <Suspense fallback={<ArticleListSkeleton length={3} />}>
        <TopicArticles params={props.params} />
      </Suspense>
    </>
  );
}

async function TopicHeader(props: Props) {
  const { topic: slug } = await props.params;
  const topic = await getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  return (
    <>
      <h2 className="max-w-3xl border-b pb-3 text-3xl font-bold md:text-4xl font-sans tracking-tight">
        {topic.name}
      </h2>
      {topic.description && (
        <div className="pt-3">
          <CustomPortableText value={topic.description} />
        </div>
      )}
    </>
  );
}

async function TopicArticles(props: Props) {
  const { topic: slug } = await props.params;
  const articles = await getArticlesByTopicSlug(slug);

  return articles.length ? (
    <ArticleList articles={articles} />
  ) : (
    <p className="pt-3">
      We haven&apos;t published anything on that topic yet.
    </p>
  );
}

function TopicHeaderSkeleton() {
  return (
    <>
      <output className="sr-only">Loading topic...</output>

      <div className="animate-pulse motion-reduce:animate-none">
        <div className="max-w-3xl border-b pb-3">
          <Skeleton className="h-10 w-56" />
        </div>

        <div className="space-y-2 pt-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-4/5" />
        </div>
      </div>
    </>
  );
}
