"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavbarLink(props: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <Link
      href={props.href}
      aria-current={isActive ? "page" : undefined}
      className={`flex h-full items-center text-[0.95rem] hover:text-primary active:text-primary${
        isActive ? " font-semibold text-primary" : ""
      }`}
    >
      {props.children}
    </Link>
  );
}
