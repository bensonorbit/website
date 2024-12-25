import "@/app/globals.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
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
	alternates: {
		types: {
			"application/atom+xml": "/atom.xml",
		},
	},
});

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f9fafb" }, // gray-50
		{ media: "(prefers-color-scheme: dark)", color: "#030712" }, // gray-950
		{ color: "#f97316" }, // orange-500, used for Discord embeds
	],
};

const notoSerif = Noto_Serif({
	variable: "--font-serif",
	subsets: ["latin"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className="scroll-smooth scheme-light [scrollbar-gutter:stable] dark:scheme-dark"
		>
			<body
				className={
					"flex min-h-dvh flex-col justify-between bg-background font-serif text-foreground antialiased selection:bg-orange-500/30 " +
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
