import { assert } from "@/lib/utils";

export const dataset = assert(
	process.env.SANITY_API_DATASET,
	"SANITY_API_DATASET",
);

export const projectId = assert(
	process.env.SANITY_API_PROJECT_ID,
	"SANITY_API_PROJECT_ID",
);

// See https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion = "2024-10-27";
