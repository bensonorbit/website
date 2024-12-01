import { CustomPortableText } from "@/components/CustomPortableText";
import { mergeMeta } from "@/lib/utils";
import { getSettings } from "@/sanity/fetch";
import { notFound } from "next/navigation";

export const metadata = mergeMeta({ title: "About" });
export const dynamic = "force-static";

export default async function AboutPage() {
	const settings = await getSettings();
	const about = settings?.about;
	if (!about) notFound();

	return (
		<div className="mx-auto prose prose-gray dark:prose-invert prose-a:transition-colors prose-a:hover:text-orange-700 dark:prose-a:hover:text-orange-300 prose-img:rounded-xs prose-img:drop-shadow-xs">
			<h1 className="mb-2 text-balance">About Benson Orbit</h1>
			<CustomPortableText value={about} />
		</div>
	);
}
