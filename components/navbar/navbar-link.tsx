"use client";

import { cx } from "css-variants";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      className={cx(
        "flex h-full items-center text-[0.95rem] hover:text-primary active:text-primary",
        isActive && "font-semibold text-primary",
        props.className
      )}
    >
      <span
        data-navigation-indicator-target
        className="inline-grid place-items-center"
      >
        <span className="col-start-1 row-start-1">{props.children}</span>

        {/* Render invisible bold text so that width is consistent between non-active and active state */}
        <span
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 font-semibold"
        >
          {props.children}
        </span>
      </span>
    </Link>
  );
}
