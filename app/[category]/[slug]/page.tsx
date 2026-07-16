import { notFound, redirect } from "next/navigation";
import { JsonLd } from "react-schemaorg";
import type { NewsArticle } from "schema-dts";

import { ArticleImage } from "@/components/article-image";
import { Authors } from "@/components/authors";
import { CustomPortableText } from "@/components/custom-portable-text";
import { DateFormat } from "@/components/date-format";
import { Fancybox } from "@/components/fancybox";
import { mergeMeta } from "@/lib/utils";
import { getArticleBySlug } from "@/sanity/fetch";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }
  if (!article.primaryCategory) {
    notFound();
  }
  const url = `${article.coverImage.url}?w=1200&h=630&fit=crop`;
  const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  return mergeMeta({
    alternates: {
      types: {
        "application/atom+xml": "/atom.xml",
        "application/json+oembed": `https://${domain}${article.url}/oembed`,
      },
    },
    authors: article.authors?.map((author) => ({
      name: author.name,
      url: `/authors/${author.slug}`,
    })),
    description: article.summary,
    openGraph: {
      authors: article.authors?.map((author) => author.name),
      images: {
        alt: article.coverImage.alt || undefined,
        url,
      },
      publishedTime: article.date,
      section: article.primaryCategory.title,
      type: "article",
    },
    title: article.title,
  });
}

export default async function ArticlePage(props: Props) {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }
  if (!article.primaryCategory) {
    notFound();
  }
  if (article.primaryCategory.slug !== params.category) {
    redirect(article.url);
  }

  return (
    <article className="mx-auto prose prose-gray dark:prose-invert prose-a:transition-colors prose-a:hover:text-primary prose-img:rounded-sm prose-img:drop-shadow-xs prose-img:hover:cursor-zoom-in">
      <h1 className="mb-0 text-balance">{article.title}</h1>
      <p className="lead mt-2 mb-2 text-balance">{article.summary}</p>

      <p className="lead mt-0 font-sans text-lg">
        <Authors
          authors={article.authors}
          link
          className="font-semibold no-underline"
        />
        <strong>
          <DateFormat date={article.date} />
        </strong>
      </p>

      <ArticleImage isCover {...article.coverImage} />
      <CustomPortableText value={article.content} />

      <Fancybox />

      <JsonLd<NewsArticle>
        item={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          author: article.authors?.map((author) => ({
            "@type": "Person",
            name: author.name,
            url: `https://bensonorbit.com/authors/${author.slug}`,
          })),
          datePublished: article.date,
          headline: article.title,
          image: [
            // 16:9
            `${article.coverImage.url}?w=1920&h=1080&fit=crop`,

            // 4:3
            `${article.coverImage.url}?w=800&h=600&fit=crop`,

            // 1:1
            `${article.coverImage.url}?w=800&h=800&fit=crop`,
          ],
        }}
      />
    </article>
  );
}
