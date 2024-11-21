import { mergeMeta } from "@/lib/utils";
import Link from "next/link";

export const metadata = mergeMeta({ title: "Not Found" });

export default function NotFound() {
	return (
		<div className="prose prose-gray mx-auto dark:prose-invert prose-a:transition-colors prose-a:hover:text-orange-700 prose-img:rounded-xs prose-img:drop-shadow-xs dark:prose-a:hover:text-orange-300">
			<h1 className="mb-2 text-balance">That page couldn't be found.</h1>
			<p>
				If you manually entered the URL, please check for typos. If you clicked
				a link to get here, it may be broken (
				<a href="mailto:contact@bensonorbit.com?subject=Broken link">
					let us know
				</a>
				). Or, you can go back to the <Link href="/">home page</Link>.
			</p>
		</div>
	);
}
