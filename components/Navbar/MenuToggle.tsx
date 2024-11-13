"use client";

import { CloseIcon, MenuIcon } from "@/components/Icons";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MenuToggle(props: {
	children: React.ReactNode;
	className?: string;
}) {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	// Prevent scrolling when the menu is open
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [open]);

	// Close menu when the window is resized to desktop
	useEffect(() => {
		function onResize() {
			if (window.innerWidth >= 1024) setOpen(false);
		}

		if (open) window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [open]);

	// Close menu on navigation
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				aria-label={open ? "Close menu" : "Open menu"}
				className={props.className}
			>
				{open ? <CloseIcon /> : <MenuIcon />}
			</button>

			{open && props.children}
		</>
	);
}
