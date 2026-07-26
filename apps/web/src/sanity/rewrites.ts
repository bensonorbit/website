import { createClient, defineQuery } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "./constants";

export async function getSanityRewrites() {
  const client = createClient({
    apiVersion,
    dataset,
    // Only published documents should be fetched (not drafts)
    perspective: "published",
    projectId,
    token,
    // We always want fresh data during revalidation, and it's cached by Vercel anyway
    useCdn: false,
  });

  const categorySlugsQuery = defineQuery(`*[_type == "category"].slug.current`);
  const categorySlugs = await client.fetch(categorySlugsQuery);

  return categorySlugs.map((slug) => ({
    destination: `/category/${slug}`,
    source: `/${slug}`,
  }));
}
