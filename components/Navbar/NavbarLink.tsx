"use client";

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
			className={
				"decoration-orange-700 hover:underline dark:decoration-orange-300" +
				(isActive ? " font-semibold" : "") +
				(props.className ? " " + props.className : "")
			}
		>
			{props.children}
		</Link>
	);
}
