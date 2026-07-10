import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.SANITY_API_PROJECT_ID,
		NEXT_PUBLIC_SANITY_DATASET: process.env.SANITY_API_DATASET,
	},
	logging: {
		fetches: { fullUrl: false },
	},
	async rewrites() {
		return [
			{
				source: "/studio/:tool+",
				destination: "/studio",
			},
		];
	},
};

export default nextConfig;
