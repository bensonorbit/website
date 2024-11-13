"use client";

import { useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export function Fancybox() {
	useEffect(() => {
		NativeFancybox.bind("[data-fancybox]");
		return () => {
			NativeFancybox.unbind("[data-fancybox]");
			NativeFancybox.close();
		};
	});

	return null;
}
