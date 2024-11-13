import { MenuToggle } from "@/components/Navbar/MenuToggle";
import { socials } from "@/lib/data";
import Link from "next/link";

export function Menu(props: { className?: string }) {
	return (
		<MenuToggle className={props.className}>
			<nav className="absolute left-0 top-0 -z-10 flex h-screen w-screen flex-col bg-gray-50 px-6 pt-12 text-lg dark:bg-gray-950">
				<MenuLink href="/">Home</MenuLink>
				<MenuLink href="/about">About</MenuLink>

				<Divider />

				<MenuLink href="/commons">The Commons</MenuLink>
				<MenuLink href="/out">Out & About</MenuLink>
				<MenuLink href="/voices">Student Voices</MenuLink>
				<MenuLink href="/arts">Arts</MenuLink>
				{/* <MenuLink href="/hubble">The Hubble</MenuLink>
				<MenuLink href="/star">The Star</MenuLink> */}

				<Divider />

				<MenuLink href="/archive">Archive</MenuLink>
				{socials.map((social) => (
					<MenuLink key={social.name} href={social.href}>
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
			className="py-2 font-medium hover:underline"
		>
			{props.children}
		</LinkComponent>
	);
}

function Divider() {
	return <hr className="my-2 border-t" />;
}
