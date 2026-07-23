import { cx } from "css-variants";
import Image from "next/image";
import Link from "next/link";

export function NavbarLogo(props: { className?: string }) {
  return (
    <Link
      href="/"
      className={cx(
        "block w-fit transition-transform hover:scale-[1.015] active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
        props.className
      )}
    >
      <Image
        src="/wordmark-color.svg"
        width="726"
        height="107"
        alt="The Benson Orbit"
        className="h-auto w-52 lg:w-64"
      />
    </Link>
  );
}
