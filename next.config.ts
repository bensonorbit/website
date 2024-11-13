import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	logging: {
		fetches: { fullUrl: false },
	},
	async redirects() {
		return [
			{
				source: "/studio",
				destination: "https://benson.sanity.studio",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
