import { Metadata } from "next";

export function mergeMeta(metadata: Metadata): Metadata {
	const title =
		typeof metadata.title === "string" ? metadata.title : "The Benson Orbit";
	return {
		...metadata,
		openGraph: {
			type: "website",
			siteName: "The Benson Orbit",
			title,
			description:
				metadata.description ??
				"The student-run newspaper of Benson Polytechnic High School",
			locale: "en_US",
			...metadata.openGraph,
		},
	};
}
