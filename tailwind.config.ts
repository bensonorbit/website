import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
	content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				serif: ["var(--font-serif)"],
			},
			borderColor: {
				DEFAULT: "var(--border-color)",
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [typography],
} satisfies Config;
