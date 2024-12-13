import { MenuToggle } from "@/components/Navbar/MenuToggle";
import { socials } from "@/lib/data";
import Link from "next/link";

export function Menu() {
	return (
		<MenuToggle>
			<nav className="absolute top-0 left-0 -z-10 flex h-screen w-screen flex-col bg-background px-6 pt-12 text-lg">
				<MenuLink href="/">Home</MenuLink>
				<MenuLink href="/about">About</MenuLink>

				<Divider />

				<MenuLink href="/news">News</MenuLink>
				<MenuLink href="/sports">Sports</MenuLink>
				<MenuLink href="/culture">Culture</MenuLink>
				<MenuLink href="/voices">Student Voices</MenuLink>
				{/* <MenuLink href="/hubble">The Hubble</MenuLink>
				<MenuLink href="/star">The Star</MenuLink> */}

				<Divider />

				<MenuLink href="/archive">Archive</MenuLink>
				{socials.map((social) => (
					<MenuLink key={social.name} href={social.href}>
						<social.icon className="size-4 text-gray-700 dark:text-gray-300" />
						{social.name}
					</MenuLink>
				))}
			</nav>
		</MenuToggle>
	);
}

function MenuLink(props: { href: string; children: React.ReactNode }) {
	const isExternal = props.href.startsWith("http");
	const LinkComponent = isExternal ? "a" : Link;
	return (
		<LinkComponent
			href={props.href}
			className="flex items-center gap-2 py-2 font-medium hover:underline"
		>
			{props.children}
		</LinkComponent>
	);
}

function Divider() {
	return <hr className="my-2 border-t" />;
}
