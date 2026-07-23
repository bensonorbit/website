"use client";

import { cx } from "css-variants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

interface NavbarLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavbarLink(props: NavbarLinkProps) {
  return (
    <Suspense fallback={<NavbarLinkContent {...props} isActive={false} />}>
      <PathnameNavbarLink {...props} />
    </Suspense>
  );
}

function PathnameNavbarLink(props: NavbarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return <NavbarLinkContent {...props} isActive={isActive} />;
}

function NavbarLinkContent(
  props: NavbarLinkProps & {
    isActive: boolean;
  }
) {
  return (
    <Link
      href={props.href}
      aria-current={props.isActive ? "page" : undefined}
      className={cx(
        "flex h-full items-center text-[0.95rem] hover:text-primary active:text-primary",
        props.isActive && "font-semibold text-primary",
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
