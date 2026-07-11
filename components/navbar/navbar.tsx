import Image from "next/image";
import Link from "next/link";

import { DesktopNavigation } from "@/components/navbar/desktop-navigation";
import { Menu } from "@/components/navbar/menu";
import { SearchButton } from "@/components/navbar/search-button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl transition print:static print:bg-transparent print:pt-0">
      <div className="relative mx-auto grid h-13 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6 xl:border-x lg:h-17 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 print:px-0">
        <div className="flex items-center justify-start gap-1 lg:hidden print:hidden">
          <Menu />
        </div>

        <div className="flex items-center justify-center gap-1 lg:justify-self-start">
          <Link href="/" className="block w-fit transition hover:scale-[1.015]">
            <Image
              src="/wordmark-color.svg"
              width="726"
              height="107"
              alt="The Benson Orbit"
              className="h-auto w-52 lg:w-64"
            />
          </Link>
        </div>

        <DesktopNavigation />

        <div className="flex items-center justify-end gap-1 lg:hidden print:hidden">
          <SearchButton />
        </div>

        <p className="col-start-3 hidden justify-end print:flex">
          bensonorbit.com
        </p>
      </div>
    </nav>
  );
}
