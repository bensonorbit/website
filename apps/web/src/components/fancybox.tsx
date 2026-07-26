"use client";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import { useEffect } from "react";

export function Fancybox() {
  useEffect(() => {
    // lazy load fancybox css
    import("@fancyapps/ui/dist/fancybox/fancybox.css");

    NativeFancybox.bind("[data-fancybox]");
    return () => {
      NativeFancybox.unbind("[data-fancybox]");
      NativeFancybox.close();
    };
  }, []);

  return null;
}
