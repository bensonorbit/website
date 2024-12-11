"use client";

import { useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";

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
