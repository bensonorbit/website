import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function SiteLayout(props: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-dvh flex-col justify-between">
			<Navbar />

			<main className="mx-auto w-full max-w-7xl grow p-6 font-serif xl:border-x">
				{props.children}
			</main>

			<Footer />

			<Analytics />
			<SpeedInsights />
		</div>
	);
}
