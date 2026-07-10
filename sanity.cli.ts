import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_API_PROJECT_ID;
const dataset = process.env.SANITY_API_DATASET;

export default defineCliConfig({
  api: { dataset, projectId },
  studioHost: "benson",
  vite: {
    define: {
      "process.env.SANITY_API_DATASET": JSON.stringify(dataset),
      "process.env.SANITY_API_PROJECT_ID": JSON.stringify(projectId),
    },
    publicDir: "sanity/public",
    resolve: {
      alias: {
        "@": __dirname,
      },
    },
  },
});
