import "@/app/globals.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";
import { Noto_Serif, Public_Sans } from "next/font/google";
import { twMerge } from "tailwind-merge";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar/navbar";
import { mergeMeta } from "@/lib/utils";

export const metadata = mergeMeta({
  alternates: {
    types: {
      "application/atom+xml": "/atom.xml",
    },
  },
  title: {
    default: "The Benson Orbit",
    template: "%s | The Benson Orbit",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bensonorbit",
  },
});

export const viewport: Viewport = {
  themeColor: [
    // gray-50
    { color: "#f9fafb", media: "(prefers-color-scheme: light)" },

    // gray-950
    { color: "#030712", media: "(prefers-color-scheme: dark)" },

    // orange-500, fallback used for Discord embeds
    { color: "#f97316" },
  ],
};

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="scroll-smooth scheme-light [scrollbar-gutter:stable] dark:scheme-dark"
    >
      <body
        className={twMerge(
          "flex min-h-dvh flex-col justify-between bg-background font-sans text-foreground antialiased selection:bg-orange-500/30",
          publicSans.variable,
          notoSerif.variable
        )}
      >
        <Navbar />

        <main className="mx-auto w-full max-w-7xl grow p-6 font-serif xl:border-x">
          {props.children}
        </main>

        <Footer />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
