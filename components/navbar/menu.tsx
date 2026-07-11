import Link from "next/link";

import { MenuToggle } from "@/components/navbar/menu-toggle";
import { socials } from "@/lib/data";

export function Menu() {
  return (
    <MenuToggle>
      <nav className="absolute top-0 left-0 -z-10 flex h-screen w-screen flex-col bg-background px-6 pt-12 text-lg">
        <MenuLink href="/">Home</MenuLink>
        <MenuLink href="/about">About</MenuLink>
        <MenuLink href="/archive">Archive</MenuLink>

        <Divider />

        <MenuLink href="/news">News</MenuLink>
        <MenuLink href="/sports">Sports</MenuLink>
        <MenuLink href="/culture">Culture</MenuLink>
        <MenuLink href="/voices">Student Voices</MenuLink>

        <Divider />

        <button
          type="button"
          className="w-fit py-2 text-left font-medium text-primary hover:underline"
        >
          Subscribe{" "}
          <span className="text-sm text-foreground">(coming soon)</span>
        </button>

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
