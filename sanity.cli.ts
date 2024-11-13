import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_API_PROJECT_ID;
const dataset = process.env.SANITY_API_DATASET;

export default defineCliConfig({
	studioHost: "benson",
	api: { projectId, dataset },
	vite: {
		define: {
			"process.env.SANITY_API_PROJECT_ID": JSON.stringify(projectId),
			"process.env.SANITY_API_DATASET": JSON.stringify(dataset),
		},
		resolve: {
			alias: {
				"@": __dirname,
			},
		},
		publicDir: "sanity/public",
	},
});
