"use client";

import { useEffect, useState } from "react";

export function NavbarShadow(props: {
	className: string;
	children: React.ReactNode;
}) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 0);
		handleScroll();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={
				props.className +
				(isScrolled
					? " border-border/80 bg-background/80 shadow"
					: " border-transparent")
			}
		>
			{props.children}
		</nav>
	);
}
