import { Metadata } from "next";

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
