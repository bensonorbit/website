import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";

import { ArticleList } from "@/components/article-list";
import { CustomPortableText } from "@/components/custom-portable-text";
import { mergeMeta } from "@/lib/utils";
import { getAllCategories, getCategoryBySlug } from "@/sanity/fetch";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ category: category.slug }));
}

// Check if category exists using cache to avoid unnecessary Sanity requests
async function assertCategorySlug(slug: string) {
  const categories = await getAllCategories();
  const categoryExists = categories.some((category) => category.slug === slug);
  if (!categoryExists) {
    notFound();
  }
}

export async function generateMetadata(props: Props) {
  const { category: slug } = await props.params;
  await assertCategorySlug(slug);
  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const description = category.description
    ? toPlainText(category.description).slice(0, 200)
    : `${category.title} articles published by The Benson Orbit.`;

  return mergeMeta({
    description,
    title: category.title,
  });
}

export const dynamic = "force-static";

export default async function CategoryPage(props: Props) {
  const { category: slug } = await props.params;
  await assertCategorySlug(slug);
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
        <div className="pt-3 italic">
          <CustomPortableText value={category.description} />
        </div>
      )}
      {category.articles.length ? (
        <ArticleList articles={category.articles} />
      ) : (
        <p className="pt-3">
          We haven&apos;t published anything in that category yet.
        </p>
      )}
    </>
  );
}
