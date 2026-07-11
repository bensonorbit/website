import { NavbarLink } from "@/components/navbar/navbar-link";
import { NavigationIndicator } from "@/components/navbar/navigation-indicator";
import { Button } from "@/components/ui/button";

import { SearchButton } from "./search-button";

const primaryLinks = [
  { href: "/news", label: "News" },
  { href: "/sports", label: "Sports" },
  { href: "/culture", label: "Culture" },
  { href: "/voices", label: "Student Voices" },
];

const secondaryLinks = [
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
];

export function DesktopNavigation() {
  return (
    <>
      <div className="hidden h-full items-center gap-7 self-stretch lg:flex print:hidden">
        {primaryLinks.map((link) => (
          <NavbarLink key={link.href} href={link.href}>
            {link.label}
          </NavbarLink>
        ))}
      </div>

      <div className="hidden h-full items-center justify-self-end gap-5 self-stretch lg:flex print:hidden">
        {secondaryLinks.map((link) => (
          <NavbarLink key={link.href} href={link.href}>
            {link.label}
          </NavbarLink>
        ))}
        <SearchButton />
        <SubscribeButton />
      </div>

      <NavigationIndicator />
    </>
  );
}

function SubscribeButton() {
  return <Button color="orange">Subscribe</Button>;
}
