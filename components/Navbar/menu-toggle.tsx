"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CloseIcon, MenuIcon } from "@/components/icons";

export function MenuToggle(props: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Prevent scrolling when the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Close menu when the window is resized to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    }

    if (open) {
      window.addEventListener("resize", onResize);
    }
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
        className="rounded-sm transition hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && props.children}
    </>
  );
}
