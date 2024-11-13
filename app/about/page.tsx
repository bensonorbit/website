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
		<div className="prose prose-gray mx-auto dark:prose-invert prose-a:transition-colors hover:prose-a:text-orange-700 prose-img:rounded-sm prose-img:drop-shadow-sm dark:hover:prose-a:text-orange-300">
			<h1 className="mb-2 text-balance">About Benson Orbit</h1>
			<CustomPortableText value={about} />
		</div>
	);
}
