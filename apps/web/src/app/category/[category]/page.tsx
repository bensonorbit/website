import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ArticleList, ArticleListSkeleton } from "@/components/article-list";
import { CustomPortableText } from "@/components/custom-portable-text";
import { Skeleton } from "@/components/ui/skeleton";
import { fullUrl, mergeMeta } from "@/lib/utils";
import { getArticlesByCategorySlug, getCategoryBySlug } from "@/sanity/fetch";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return [{ category: "news" }];
}

export async function generateMetadata(props: Props) {
  const { category: slug } = await props.params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const description = category.description
    ? toPlainText(category.description).slice(0, 200)
    : `${category.title} articles published by The Benson Orbit.`;

  return mergeMeta({
    alternates: {
      canonical: fullUrl(`/${slug}`),
    },
    description,
    title: category.title,
  });
}

export default function CategoryPage(props: Props) {
  return (
    <>
      <Suspense fallback={<CategoryHeaderSkeleton />}>
        <CategoryHeader params={props.params} />
      </Suspense>

      <Suspense fallback={<ArticleListSkeleton length={3} />}>
        <CategoryArticles params={props.params} />
      </Suspense>
    </>
  );
}

async function CategoryHeader(props: Props) {
  const { category: slug } = await props.params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <h2 className="max-w-3xl border-b pb-3 text-3xl font-bold md:text-4xl font-sans tracking-tight">
        {category.title}
      </h2>
      {category.description && (
        <div className="pt-3">
          <CustomPortableText value={category.description} />
        </div>
      )}
    </>
  );
}

async function CategoryArticles(props: Props) {
  const { category: slug } = await props.params;
  const articles = await getArticlesByCategorySlug(slug);

  return articles.length ? (
    <ArticleList articles={articles} />
  ) : (
    <p className="pt-3">
      We haven&apos;t published anything in that category yet.
    </p>
  );
}

function CategoryHeaderSkeleton() {
  return (
    <>
      <output className="sr-only">Loading category...</output>

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
