"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { twMerge } from "tailwind-merge";

import { MenuIcon } from "@/components/icons";
import { mobileLinkGroups } from "@/components/navbar/navigation";
import { SubscribeButton } from "@/components/navbar/subscribe-button";
import { socials } from "@/lib/data";

export function MobileNavigation(props: { className?: string }) {
  const pathname = usePathname();

  return <MobileNavigationContent key={pathname} {...props} />;
}

function MobileNavigationContent(props: { className?: string }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 64rem)");

    function onBreakpointChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setOpen(false);
      }
    }

    desktopQuery.addEventListener("change", onBreakpointChange);
    return () => desktopQuery.removeEventListener("change", onBreakpointChange);
  }, [open]);

  return (
    <div className={twMerge("justify-self-start", props.className)}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-controls={menuId}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-9 place-items-center rounded-full hover:bg-primary/15 hover:text-primary active:bg-primary/20"
      >
        <MenuIcon open={open} />
      </button>

      {open ? <MobileMenu id={menuId} /> : null}
    </div>
  );
}

function MobileMenu(props: { id: string }) {
  return (
    <div
      id={props.id}
      className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto bg-background px-6 py-4 text-lg"
    >
      {mobileLinkGroups.map((group, index) => (
        <div
          key={group[0].href}
          className={index === 0 ? undefined : "mt-2 border-t pt-2"}
        >
          {group.map((link) => (
            <MobileMenuLink key={link.href} href={link.href}>
              {link.label}
            </MobileMenuLink>
          ))}
        </div>
      ))}

      <div className="mt-2 border-t pt-4">
        <SubscribeButton />

        <div className="mt-2 pt-2">
          {socials.map((social) => (
            <MobileMenuLink key={social.name} href={social.href}>
              <social.icon className="size-4 text-gray-700 dark:text-gray-300" />
              {social.name}
            </MobileMenuLink>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMenuLink(props: { href: string; children: React.ReactNode }) {
  const className =
    "flex items-center gap-2 py-2 font-medium decoration-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  if (props.href.startsWith("http")) {
    return (
      <a href={props.href} className={className}>
        {props.children}
      </a>
    );
  }

  return (
    <Link href={props.href} className={className}>
      {props.children}
    </Link>
  );
}
