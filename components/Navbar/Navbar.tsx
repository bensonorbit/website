import {
	BensonAstronautIcon,
	CameraIcon,
	DownIcon,
	StarIcon,
} from "@/components/Icons";
import { Menu } from "@/components/Navbar/Menu";
import { NavbarLink } from "@/components/Navbar/NavbarLink";
import { NavbarShadow } from "@/components/Navbar/NavbarShadow";
import Link from "next/link";

export function Navbar() {
	return (
		<NavbarShadow className="sticky top-0 z-50 border-b bg-background py-3 transition-shadow print:static print:shadow-none">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6">
				<Menu className="grow basis-0 lg:hidden print:hidden" />

				<h1 className="lg:grow lg:basis-0">
					<Link
						href="/"
						className="flex w-fit items-center gap-2 text-xl font-bold hover:underline"
					>
						<BensonAstronautIcon />
						The Benson Orbit
					</Link>
				</h1>

				<div className="hidden items-center gap-6 lg:flex print:hidden">
					<NavbarLink href="/commons">The Commons</NavbarLink>
					<NavbarLink href="/out">Out & About</NavbarLink>
					<NavbarLink href="/voices">Student Voices</NavbarLink>
					<NavbarLink href="/arts">Arts</NavbarLink>
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

function MoreMenu() {
	return (
		<div className="group relative xl:hidden">
			<div className="flex items-center">
				More{" "}
				<DownIcon className="size-5 transition group-focus-within:rotate-180 group-hover:rotate-180 motion-reduce:transition-none" />
			</div>

			<div className="pointer-events-none absolute top-0 -ml-10 -mt-4 -translate-y-1 p-10 opacity-0 transition group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
				<div className="flex flex-col text-nowrap rounded border bg-background drop-shadow">
					<NavbarLink
						href="/hubble"
						className="flex items-center gap-2 px-4 py-2"
					>
						<CameraIcon /> The Hubble
					</NavbarLink>

					<hr />

					<NavbarLink
						href="/star"
						className="flex items-center gap-2 px-4 py-2"
					>
						<StarIcon /> The Star
					</NavbarLink>
				</div>
			</div>
		</div>
	);
}
