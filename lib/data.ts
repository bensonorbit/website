import { InstagramIcon, TwitterIcon, FacebookIcon } from "@/components/Icons";

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
		name: "Facebook",
		href: "https://www.facebook.com/bensonorbit",
		icon: FacebookIcon,
	},
	{
		name: "Twitter",
		href: "https://x.com/bensonorbit",
		icon: TwitterIcon,
	},
];
