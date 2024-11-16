import "@/app/globals.css";
import { Noto_Serif } from "next/font/google";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer";
import { mergeMeta } from "@/lib/utils";
import { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = mergeMeta({
	title: {
		default: "The Benson Orbit",
		template: "%s | The Benson Orbit",
	},
	description: "The student-run newspaper of Benson Polytechnic High School",
	alternates: {
		types: {
			"application/rss+xml": "/rss.xml",
		},
	},
});

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f9fafb" },
		{ media: "(prefers-color-scheme: dark)", color: "#030712" },
		{ color: "#f97316" },
	],
};

const notoSerif = Noto_Serif({
	variable: "--font-serif",
	subsets: ["latin"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body
				className={
					"bg-background text-foreground flex min-h-dvh flex-col justify-between font-serif antialiased " +
					notoSerif.variable
				}
			>
				<Navbar />

				<main className="mx-auto w-full max-w-7xl grow px-6 py-6">
					{props.children}
				</main>

				<Footer />

				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
