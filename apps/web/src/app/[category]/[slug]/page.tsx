import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "react-schemaorg";
import type { NewsArticle } from "schema-dts";

import { ArticleImage } from "@/components/article-image";
import { Authors } from "@/components/authors";
import { CustomPortableText } from "@/components/custom-portable-text";
import { DateFormat } from "@/components/date-format";
import { Fancybox } from "@/components/fancybox";
import { Prose } from "@/components/prose";
import { newsMediaOrganization, webSite } from "@/lib/structured-data";
import { fullUrl, mergeMeta } from "@/lib/utils";
import { getArticleBySlug } from "@/sanity/fetch";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return [
    {
      category: "news",
      slug: "new-benson-gym-opens-after-delays",
    },
  ];
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
      canonical: fullUrl(article.url),
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

  const articleUrl = fullUrl(article.url);
  const topics = article.topics.filter((topic) => topic?.slug);

  return (
    <article className="mx-auto max-w-[65ch]">
      <header>
        {article.primaryCategory.showArticleEyebrow && (
          <p className="mb-3 font-sans text-xs font-semibold tracking-[0.16em] text-primary uppercase sm:text-sm">
            <Link
              href={`/${article.primaryCategory.slug}`}
              className="hover:underline"
            >
              {article.primaryCategory.title}
            </Link>
          </p>
        )}

        <h1 className="text-[clamp(2.25rem,4.5vw,3rem)] leading-[1.08] font-bold tracking-tight text-pretty">
          {article.title}
        </h1>

        <p className="mt-4 text-lg leading-[1.55] text-foreground-secondary text-pretty sm:text-xl">
          {article.summary}
        </p>

        <p className="mt-4 font-sans text-sm leading-6 text-foreground-muted sm:text-base">
          {article.authors && article.authors.length >= 1 && (
            <>
              By{" "}
              <Authors
                authors={article.authors}
                link
                className="font-semibold text-foreground decoration-primary underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              />
              <span aria-hidden="true" className="mx-1">
                ·
              </span>
              <span className="sr-only">, published </span>
            </>
          )}
          <DateFormat date={article.date} />
        </p>
      </header>

      <ArticleImage isCover {...article.coverImage} />

      <Prose className="sm:prose-lg prose-headings:leading-tight prose-headings:tracking-[-0.02em] prose-h2:mt-12 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-[1.75] prose-p:first:mt-0 prose-li:leading-[1.75] prose-blockquote:border-primary prose-blockquote:font-normal prose-blockquote:not-italic">
        <CustomPortableText value={article.content} />
      </Prose>

      {topics.length > 0 && (
        <div className="mt-8 border-t pt-4 font-sans flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
          <p className="m-0 shrink-0 text-sm font-semibold tracking-wider text-foreground-muted uppercase">
            Topics
          </p>

          <ul className="m-0 flex list-none flex-wrap p-0">
            {topics.map((topic, index) => (
              <li
                className="m-0 inline-flex items-baseline p-0"
                key={topic.slug}
              >
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="mx-2 text-gray-400 dark:text-gray-600"
                  >
                    ·
                  </span>
                )}
                <Link
                  className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-primary focus-visible:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  href={`/topics/${topic.slug}`}
                >
                  {topic.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Fancybox />

      <JsonLd<NewsArticle>
        item={{
          "@context": "https://schema.org",
          "@id": `${articleUrl}#article`,
          "@type": "NewsArticle",
          articleSection: article.categories.map((category) => category.title),
          author: article.authors?.map((author) => ({
            "@type": "Person",
            name: author.name,
            url: fullUrl(`/authors/${author.slug}`),
          })),
          dateModified: article.dateModified,
          datePublished: article.date,
          description: article.summary || undefined,
          headline: article.title,
          image: [
            // 16:9
            `${article.coverImage.url}?w=1920&h=1080&fit=crop`,

            // 4:3
            `${article.coverImage.url}?w=800&h=600&fit=crop`,

            // 1:1
            `${article.coverImage.url}?w=800&h=800&fit=crop`,
          ],
          inLanguage: "en-US",
          isAccessibleForFree: true,
          isPartOf: webSite,
          mainEntityOfPage: {
            "@id": articleUrl,
            "@type": "WebPage",
          },
          publisher: newsMediaOrganization,
          thumbnailUrl: `${article.coverImage.url}?w=1200&h=630&fit=crop`,
          url: articleUrl,
        }}
      />
    </article>
  );
}
