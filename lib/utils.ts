import type { Metadata } from "next";

export function mergeMeta(metadata: Metadata): Metadata {
	return {
		...metadata,
		openGraph: {
			type: "website",
			siteName: "The Benson Orbit",
			title: typeof metadata.title === "string" ? metadata.title : undefined,
			locale: "en_US",
			...metadata.openGraph,
		},
	};
}

export function assert(value: string | undefined, variable: string) {
	if (value === undefined) {
		const error = `Missing environment variable: ${variable}. See .env.example for more details.`;
		throw new Error(error);
	}

	return value;
}
