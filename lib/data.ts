import { InstagramIcon, FacebookIcon, YouTubeIcon } from "@/components/icons";

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
    href: "https://www.youtube.com/@bensonorbit",
    icon: YouTubeIcon,
    name: "YouTube",
  },
];
