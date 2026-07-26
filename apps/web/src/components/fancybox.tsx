"use client";

import type { Fancybox as FancyboxType } from "@fancyapps/ui";
import { useEffect } from "react";

export function Fancybox() {
  useEffect(() => {
    let disposed = false;
    let fancybox: typeof FancyboxType | undefined;

    // lazy load fancybox code and css
    async function init() {
      const [module] = await Promise.all([
        import("@fancyapps/ui"),
        import("@fancyapps/ui/dist/fancybox/fancybox.css"),
      ]);

      // `disposed` prevents a race condition where
      // the component is unmounted between init()
      // being called and the module load completing
      if (disposed) {
        return;
      }

      fancybox = module.Fancybox;
      fancybox.bind("[data-fancybox]");
    }

    init();

    return () => {
      disposed = true;
      fancybox?.unbind("[data-fancybox]");
      fancybox?.close();
    };
  }, []);

  return null;
}
