# [bensonorbit.com](https://bensonorbit.com)

Website for The Benson Orbit, the student-run newspaper of Benson Polytechnic High School. Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Sanity](https://sanity.io). Deployed with [Vercel](https://vercel.com).

This repository also contains the Sanity Studio configuration (`sanity.config.ts`) for the project, which is deployed separately to Sanity's own hosting.

## Development

You'll need [Node.js](https://nodejs.org/en/download/) and [`pnpm`](https://pnpm.io/) installed on your machine. You should also have a [Sanity](https://sanity.io) project set up, unless you're working with the production project.

- Clone the repository.
- Copy `.env.example` to `.env.local` and fill in the environment variables.
  - If you need access to the production Sanity project, ask a current developer for these values.
- Run `pnpm install` to install dependencies.
- Run `pnpm dev` to start the Next.js development server.

If you make changes to the Sanity schema or GROQ queries, run `pnpm run typegen` to generate TypeScript types.

Before committing, run `pnpm run format` to format your code using [Prettier](https://prettier.io/).
