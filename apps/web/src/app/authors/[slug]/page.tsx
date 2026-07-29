import { toPlainText } from "next-sanity";
import { Image } from "next-sanity/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "react-schemaorg";
import type { ProfilePage } from "schema-dts";

import { ArticleList, ArticleListSkeleton } from "@/components/article-list";
import { CustomPortableText } from "@/components/custom-portable-text";
import { Skeleton } from "@/components/ui/skeleton";
import { newsMediaOrganization, webSite } from "@/lib/structured-data";
import { fullUrl, mergeMeta } from "@/lib/utils";
import { getArticlesByAuthorSlug, getAuthorBySlug } from "@/sanity/fetch";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [{ slug: "nick" }];
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const author = await getAuthorBySlug(params.slug);
  if (!author) {
    notFound();
  }

  const images = author.photo.url
    ? { url: `${author.photo.url}?w=200&auto=format&fit=min` }
    : undefined;

  const description = author.bio && toPlainText(author.bio).slice(0, 200);

  return mergeMeta({
    alternates: {
      canonical: fullUrl(`/authors/${params.slug}`),
    },
    description,
    openGraph: { images, type: "profile" },
    title: author.name,
    twitter: { card: "summary" },
  });
}

export default function AuthorPage(props: Props) {
  return (
    <div className="mx-auto prose max-w-3xl prose-gray dark:prose-invert prose-a:transition-colors prose-a:hover:text-primary prose-img:rounded-sm prose-img:drop-shadow-xs">
      <Suspense fallback={<AuthorProfileSkeleton />}>
        <AuthorProfile params={props.params} />
      </Suspense>

      <div className="not-prose mx-auto border-t text-foreground">
        <Suspense fallback={<ArticleListSkeleton length={3} />}>
          <AuthorArticleList params={props.params} />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <AuthorStructuredData params={props.params} />
      </Suspense>
    </div>
  );
}

async function AuthorProfile(props: Props) {
  const params = await props.params;
  const author = await getAuthorBySlug(params.slug);

  if (!author) {
    notFound();
  }

  const firstName = author.name?.split(" ")[0] || "this author";

  return (
    <>
      <div className="flex flex-row items-center gap-4 font-sans">
        {author.photo.url && (
          <Image
            src={author.photo.url}
            width={76}
            height={76}
            alt={author.name || "Photo of author"}
            className="not-prose rounded-full outline-1 -outline-offset-1 outline-white/15 drop-shadow"
            placeholder="blur"
            blurDataURL={author.photo.lqip || undefined}
          />
        )}

        <div>
          <h1 className="mt-0 mb-0 text-3xl font-bold">{author.name}</h1>
          <p className="lead mt-0 mb-0 tracking-wide uppercase">
            {author.role}
          </p>
        </div>
      </div>

      <CustomPortableText value={author.bio} />

      <h2 className="mt-0 mb-0 py-3">Articles by {firstName}</h2>
    </>
  );
}

async function AuthorArticleList(props: Props) {
  const params = await props.params;
  const articles = await getArticlesByAuthorSlug(params.slug);

  return <ArticleList articles={articles} />;
}

async function AuthorStructuredData(props: Props) {
  const params = await props.params;
  const [author, articles] = await Promise.all([
    getAuthorBySlug(params.slug),
    getArticlesByAuthorSlug(params.slug),
  ]);

  if (!author) {
    notFound();
  }

  const authorUrl = fullUrl(`/authors/${params.slug}`);
  const personId = `${authorUrl}#person`;
  const profilePageId = `${authorUrl}#profile`;
  const description = author.bio ? toPlainText(author.bio) : undefined;
  const image = author.photo.url
    ? `${author.photo.url}?w=800&auto=format&fit=min`
    : undefined;

  return (
    <JsonLd<ProfilePage>
      item={{
        "@context": "https://schema.org",
        "@id": profilePageId,
        "@type": "ProfilePage",
        dateCreated: author._createdAt,
        dateModified: author._updatedAt,
        hasPart: articles.map((article) => ({
          "@id": `${fullUrl(article.url)}#article`,
          "@type": "NewsArticle",
          author: {
            "@id": personId,
          },
          datePublished: article.date,
          headline: article.title,
          url: fullUrl(article.url),
        })),
        inLanguage: "en-US",
        isPartOf: webSite,
        mainEntity: {
          "@id": personId,
          "@type": "Person",
          affiliation: {
            "@id": newsMediaOrganization["@id"],
          },
          description,
          image,
          jobTitle: author.role,
          mainEntityOfPage: {
            "@id": profilePageId,
          },
          name: author.name,
          url: authorUrl,
        },
        publisher: newsMediaOrganization,
        url: authorUrl,
      }}
    />
  );
}

function AuthorProfileSkeleton() {
  return (
    <>
      <output className="sr-only">Loading author profile...</output>

      <div className="not-prose animate-pulse motion-reduce:animate-none">
        <div className="flex items-center gap-4">
          <Skeleton className="size-19 rounded-full!" />

          <div className="space-y-3">
            <Skeleton className="h-9 w-56" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-4/5" />
        </div>

        <div className="py-3">
          <Skeleton className="h-8 w-56" />
        </div>
      </div>
    </>
  );
}
