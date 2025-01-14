import { socials } from "@/lib/data";

export function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="border-t bg-gray-100 py-3 text-sm text-gray-600 md:text-base dark:bg-black dark:text-gray-400">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 print:px-0">
				<p>&copy; {year} The Benson Orbit</p>

				<div className="flex gap-3 print:hidden">
					{socials.map((social) => (
						<a
							key={social.name}
							href={social.href}
							className="p-1 transition-colors hover:text-foreground"
							target="_blank"
						>
							<social.icon className="size-5 md:size-6" />
						</a>
					))}
				</div>

				<p className="hidden print:block">bensonorbit.com</p>
			</div>
		</footer>
	);
}
