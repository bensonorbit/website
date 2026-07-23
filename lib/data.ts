import {
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
  BlueskyIcon,
} from "@/components/icons";

export const socials: {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    href: "https://www.instagram.com/bensonorbit",
    icon: InstagramIcon,
    name: "Instagram",
  },
  {
    href: "https://www.facebook.com/bensonorbit",
    icon: FacebookIcon,
    name: "Facebook",
  },
  {
    href: "https://x.com/bensonorbit",
    icon: TwitterIcon,
    name: "Twitter",
  },
  {
    href: "https://bsky.app/profile/bensonorbit.com",
    icon: BlueskyIcon,
    name: "Bluesky",
  },
];
