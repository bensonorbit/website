import { twMerge } from "tailwind-merge";

import { NavbarLink } from "@/components/navbar/navbar-link";
import { sectionLinks, utilityLinks } from "@/components/navbar/navigation";
import { NavigationIndicator } from "@/components/navbar/navigation-indicator";
import { SearchButton } from "@/components/navbar/search-button";
import { SubscribeButton } from "@/components/navbar/subscribe-button";

export function DesktopNavigation(props: { className?: string }) {
  return (
    <div className={twMerge("relative items-center", props.className)}>
      <div className="flex h-full items-center gap-7">
        {sectionLinks.map((link) => (
          <NavbarLink key={link.href} href={link.href}>
            {link.label}
          </NavbarLink>
        ))}
      </div>

      <div className="flex h-full items-center justify-self-end gap-5">
        {utilityLinks.map((link) => (
          <NavbarLink key={link.href} href={link.href}>
            {link.label}
          </NavbarLink>
        ))}
        <SearchButton />
        <SubscribeButton />
      </div>

      <NavigationIndicator />
    </div>
  );
}
