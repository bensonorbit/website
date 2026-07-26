/**
 * This code is responsible for revalidating queries as the dataset is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. Click "Create webhook"
 * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 4. Dataset: Choose desired dataset or leave at default "all datasets"
 * 5. Trigger on: "Create", "Update", and "Delete"
 * 6. Filter: Leave empty
 * 7. Projection: Use the projection query in README.md
 * 8. Status: Enable webhook
 * 9. HTTP method: POST
 * 10. HTTP Headers: Leave empty
 * 11. API version: v2021-03-25
 * 12. Include drafts: No
 * 13. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random secret if you haven't yet, for example by running `Math.random().toString(36).slice(2)` in your console)
 * 14. Save the configuration
 * 15. Add the secret to Vercel: `npx vercel env add SANITY_REVALIDATE_SECRET`
 * 16. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

import { assert } from "@/sanity/constants";

interface DocumentSnapshot {
  _type: string;
  authorSlugs?: string[] | undefined;
  categorySlugs?: string[] | undefined;
  slug?: string | undefined;
}

interface WebhookBody {
  after?: DocumentSnapshot | null | undefined;
  before?: DocumentSnapshot | null | undefined;
}

function getArticleTags(
  before: DocumentSnapshot | null | undefined,
  after: DocumentSnapshot | null | undefined
) {
  // Any article mutation can change article lists, ordering, or embedded data.
  const tags = new Set(["articles"]);

  // Revalidate both URLs when an article is renamed, created, or deleted.
  if (before?.slug) {
    tags.add(`article:${before.slug}`);
  }
  if (after?.slug) {
    tags.add(`article:${after.slug}`);
  }

  // Refresh both the old and new category/author pages when relationships change.
  for (const slug of [
    ...(before?.categorySlugs ?? []),
    ...(after?.categorySlugs ?? []),
  ]) {
    tags.add(`category:${slug}`);
  }
  for (const slug of [
    ...(before?.authorSlugs ?? []),
    ...(after?.authorSlugs ?? []),
  ]) {
    tags.add(`author:${slug}`);
  }

  return tags;
}

function getCategoryTags(
  before: DocumentSnapshot | null | undefined,
  after: DocumentSnapshot | null | undefined
) {
  // Category data is embedded in article projections and the category list.
  const tags = new Set(["articles", "categories"]);

  // Revalidate both URLs when a category is renamed, created, or deleted.
  if (before?.slug) {
    tags.add(`category:${before.slug}`);
  }
  if (after?.slug) {
    tags.add(`category:${after.slug}`);
  }

  return tags;
}

function getAuthorTags(
  before: DocumentSnapshot | null | undefined,
  after: DocumentSnapshot | null | undefined
) {
  // Author data is embedded in article projections and the author list.
  const tags = new Set(["articles", "authors"]);

  // Revalidate both URLs when an author is renamed, created, or deleted.
  // This also revalidates any article that has that author, because
  // articles are tagged with the author's slug.
  if (before?.slug) {
    tags.add(`author:${before.slug}`);
  }
  if (after?.slug) {
    tags.add(`author:${after.slug}`);
  }

  return tags;
}

function getTagsToRevalidate(body: WebhookBody) {
  const { after, before } = body;
  const type = after?._type ?? before?._type;

  if (type === "article") {
    return getArticleTags(before, after);
  }
  if (type === "category") {
    return getCategoryTags(before, after);
  }
  if (type === "author") {
    return getAuthorTags(before, after);
  }
  if (type === "settings") {
    return new Set(["settings"]);
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const secret = assert(
      process.env.SANITY_REVALIDATE_SECRET,
      "SANITY_REVALIDATE_SECRET"
    );

    const { body, isValidSignature } = await parseBody<WebhookBody>(
      req,
      secret
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (!body) {
      return new Response("Bad Request", { status: 400 });
    }

    const tags = getTagsToRevalidate(body);
    if (!tags) {
      return new Response("Bad Request", { status: 400 });
    }

    for (const tag of tags) {
      revalidateTag(tag, "max");
    }

    return new Response(null, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
