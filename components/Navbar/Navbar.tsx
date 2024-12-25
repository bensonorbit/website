import {
	BensonAstronautIcon,
	// CameraIcon,
	// DownIcon,
	// StarIcon,
} from "@/components/Icons";
import { Menu } from "@/components/Navbar/Menu";
import { NavbarLink } from "@/components/Navbar/NavbarLink";
import { NavbarShadow } from "@/components/Navbar/NavbarShadow";
import Link from "next/link";

export function Navbar() {
	return (
		<NavbarShadow className="sticky top-0 z-50 border-b bg-background/80 py-3 backdrop-blur-lg transition print:static print:pt-0 print:shadow-none">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 print:px-0">
				<div className="h-7 grow basis-0 lg:hidden print:hidden">
					<Menu />
				</div>

				<div className="lg:grow lg:basis-0">
					<Link
						href="/"
						className="group flex w-fit items-center gap-2 text-xl font-bold transition hover:text-primary"
					>
						<BensonAstronautIcon className="transition group-hover:scale-110 group-hover:-rotate-12 group-active:rotate-12" />
						The Benson Orbit
					</Link>
				</div>

				<div className="hidden items-center gap-6 lg:flex print:hidden">
					<NavbarLink href="/news">News</NavbarLink>
					<NavbarLink href="/sports">Sports</NavbarLink>
					<NavbarLink href="/culture">Culture</NavbarLink>
					<NavbarLink href="/voices">Student Voices</NavbarLink>
					{/* <NavbarLink href="/hubble" className="hidden xl:block">
						The Hubble
					</NavbarLink>
					<NavbarLink href="/star" className="hidden xl:block">
						The Star
					</NavbarLink> */}
					{/* <MoreMenu /> */}
				</div>

				<div className="hidden grow basis-0 items-center justify-end gap-6 lg:flex print:hidden">
					<NavbarLink href="/archive">Archive</NavbarLink>
					<NavbarLink href="/about">About</NavbarLink>
				</div>

				<div className="grow basis-0 lg:hidden print:hidden" />

				<p className="hidden grow basis-0 justify-end print:flex">
					bensonorbit.com
				</p>
			</div>
		</NavbarShadow>
	);
}

// function MoreMenu() {
// 	return (
// 		<div className="group relative xl:hidden">
// 			<div className="flex items-center">
// 				More{" "}
// 				<DownIcon className="size-5 transition group-focus-within:rotate-180 group-hover:rotate-180 motion-reduce:transition-none" />
// 			</div>

// 			<div className="pointer-events-none absolute top-0 -mt-4 -ml-10 -translate-y-1 p-10 opacity-0 transition group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
// 				<div className="flex flex-col rounded-sm border bg-background text-nowrap drop-shadow-sm">
// 					<NavbarLink
// 						href="/hubble"
// 						className="flex items-center gap-2 px-4 py-2"
// 					>
// 						<CameraIcon /> The Hubble
// 					</NavbarLink>

// 					<hr />

// 					<NavbarLink
// 						href="/star"
// 						className="flex items-center gap-2 px-4 py-2"
// 					>
// 						<StarIcon /> The Star
// 					</NavbarLink>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
