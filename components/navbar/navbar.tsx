import { DesktopNavigation } from "@/components/navbar/desktop-navigation";
import { MobileNavigation } from "@/components/navbar/mobile-navigation";
import { NavbarLogo } from "@/components/navbar/navbar-logo";
import { SearchButton } from "@/components/navbar/search-button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl print:static print:bg-transparent print:pt-0">
      <div className="relative mx-auto grid h-13 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6 xl:border-x lg:h-17 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 print:px-0">
        <MobileNavigation className="lg:hidden print:hidden" />

        <NavbarLogo className="justify-self-center lg:justify-self-start" />

        <DesktopNavigation className="col-span-2 hidden h-full grid-cols-subgrid lg:grid print:hidden" />

        <div className="justify-self-end lg:hidden print:hidden">
          <SearchButton />
        </div>

        <p className="col-start-3 hidden justify-end print:flex">
          bensonorbit.com
        </p>
      </div>
    </nav>
  );
}
