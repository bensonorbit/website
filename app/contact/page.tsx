import { mergeMeta } from "@/lib/utils";

export const metadata = mergeMeta({ title: "Contact Us" });

export default function ContactPage() {
	return (
		<div className="prose prose-gray mx-auto dark:prose-invert prose-a:transition-colors prose-a:hover:text-orange-700 prose-img:rounded-xs prose-img:drop-shadow-xs dark:prose-a:hover:text-orange-300">
			<h1 className="mb-2 text-balance">Contact Us</h1>
			<p>
				If you need to get in touch with The Benson Orbit, please email us at{" "}
				<a target="_blank" href="mailto:contact@bensonorbit.com">
					contact@bensonorbit.com
				</a>
				. You can also message us on{" "}
				<a target="_blank" href="https://www.instagram.com/bensonorbit">
					Instagram
				</a>{" "}
				at @bensonorbit.
			</p>
			<p>We welcome news tips, feedback, suggestions, and other inquiries.</p>
		</div>
	);
}
