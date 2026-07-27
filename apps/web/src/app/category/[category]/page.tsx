import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";

import { ArticleList } from "@/components/article-list";
import { CustomPortableText } from "@/components/custom-portable-text";
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

export default async function CategoryPage(props: Props) {
  const { category: slug } = await props.params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }
  const articles = await getArticlesByCategorySlug(slug);

  return (
    <>
      <h2 className="max-w-3xl border-b pb-3 text-3xl font-bold md:text-4xl font-sans tracking-tight">
        {category.title}
      </h2>
      {category.description && (
        <div className="pt-3 italic">
          <CustomPortableText value={category.description} />
        </div>
      )}
      {articles.length ? (
        <ArticleList articles={articles} />
      ) : (
        <p className="pt-3">
          We haven&apos;t published anything in that category yet.
        </p>
      )}
    </>
  );
}
