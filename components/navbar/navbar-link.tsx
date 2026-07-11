"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function NavbarLink(props: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <Link
      href={props.href}
      aria-current={isActive ? "page" : undefined}
      className={twMerge(
        "flex h-full items-center text-[0.95rem] hover:text-primary active:text-primary",
        isActive && "font-semibold text-primary",
        props.className
      )}
    >
      <span data-navigation-indicator-target>{props.children}</span>
    </Link>
  );
}
