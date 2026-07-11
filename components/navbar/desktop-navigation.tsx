import { twMerge } from "tailwind-merge";

import { NavbarLink } from "@/components/navbar/navbar-link";
import { sectionLinks, utilityLinks } from "@/components/navbar/navigation";
import { NavigationIndicator } from "@/components/navbar/navigation-indicator";
import { SearchButton } from "@/components/navbar/search-button";
import { SubscribeButton } from "@/components/navbar/subscribe-button";

export function DesktopNavigation(props: { className?: string }) {
  return (
    <div className={twMerge("relative items-center", props.className)}>
      <div className="-mx-3.5 flex h-full items-center">
        {sectionLinks.map((link) => (
          <NavbarLink key={link.href} href={link.href} className="px-3.5">
            {link.label}
          </NavbarLink>
        ))}
      </div>

      <div className="flex h-full items-center justify-self-end gap-5">
        <div className="-mx-2.5 flex h-full items-center">
          {utilityLinks.map((link) => (
            <NavbarLink key={link.href} href={link.href} className="px-2.5">
              {link.label}
            </NavbarLink>
          ))}
        </div>
        <SearchButton />
        <SubscribeButton />
      </div>

      <NavigationIndicator />
    </div>
  );
}
