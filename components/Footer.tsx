import { socials } from "@/lib/data";

export function Footer() {
	return (
		<footer className="border-t py-2 text-sm text-gray-600 md:text-base dark:text-gray-400">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6">
				<div>
					<p>&copy; 2024 The Benson Orbit</p>
				</div>

				<div className="flex gap-3">
					{socials.map((social) => (
						<a
							key={social.name}
							href={social.href}
							className="hover:text-foreground p-1 transition-colors"
							target="_blank"
						>
							<social.icon />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
