import { CustomPortableText } from "@/components/CustomPortableText";
import { mergeMeta } from "@/lib/utils";
import { getAllAuthors, getSettings } from "@/sanity/fetch";
import Link from "next/link";

export const metadata = mergeMeta({
	title: "About",
	description:
		"Learn more about The Benson Orbit, including its staff, and how to contact us.",
});
export const dynamic = "force-static";

const roles = ["Adviser", "Editor", "Digital Director", "Contributor"];

export default async function AboutPage() {
	const [settings, allAuthors] = await Promise.all([
		getSettings(),
		getAllAuthors(),
	]);

	const authors = allAuthors.sort((a, b) => {
		const aRank = roles.indexOf(a.role ?? "Contributor");
		const bRank = roles.indexOf(b.role ?? "Contributor");

		return aRank - bRank || a.name?.localeCompare(b.name || "") || 0;
	});

	return (
		<div className="mx-auto prose prose-gray dark:prose-invert prose-a:transition-colors prose-a:hover:text-primary prose-img:rounded-sm prose-img:drop-shadow-xs">
			<h1 className="mb-2 text-balance">About Benson Orbit</h1>
			<CustomPortableText value={settings?.about} />

			<h2>Orbit Staff</h2>
			<h3>Leadership</h3>
			<ul>
				{authors
					.filter((a) => a.role !== "Contributor")
					.map((author) => (
						<li key={author.slug?.current}>
							<Link href={`/authors/${author.slug?.current}`}>
								{author.name}
							</Link>
							: {author.role}
						</li>
					))}
			</ul>
			<h3>Contributors</h3>
			<ul>
				{authors
					.filter((a) => a.role === "Contributor")
					.map((author) => (
						<li key={author.slug?.current}>
							<Link href={`/authors/${author.slug?.current}`}>
								{author.name}
							</Link>
						</li>
					))}
			</ul>
		</div>
	);
}
