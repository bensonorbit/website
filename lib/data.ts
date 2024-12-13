import {
	BlueskyIcon,
	InstagramIcon,
	ThreadsIcon,
	TwitterIcon,
} from "@/components/Icons";

export const categories = {
	news: "News",
	sports: "Sports",
	culture: "Culture",
	voices: "Student Voices",
};

export const socials: Array<{
	name: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}> = [
	{
		name: "Instagram",
		href: "https://www.instagram.com/bensonorbit",
		icon: InstagramIcon,
	},
	{
		name: "Twitter",
		href: "https://x.com/bensonorbit",
		icon: TwitterIcon,
	},
	{
		name: "Bluesky",
		href: "https://bsky.app/profile/bensonorbit.com",
		icon: BlueskyIcon,
	},
	{
		name: "Threads",
		href: "https://www.threads.net/@bensonorbit",
		icon: ThreadsIcon,
	},
];
