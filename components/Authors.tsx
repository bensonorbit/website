import Link from "next/link";

export function Authors(props: {
	authors: Array<{ name: string; slug: string | null }> | null;
	max?: number;
	link?: boolean;
	className?: string;
}) {
	let { authors } = props;
	if (!authors || !authors.length) return null;
	if (props.max) authors = authors.slice(0, props.max);

	return authors.map((author, i) => (
		<>
			{seperator(i, authors.length)}

			{props.link ? (
				<Link href={`/authors/${author.slug}`} className={props.className}>
					{author.name}
				</Link>
			) : (
				<span className={props.className}>{author.name}</span>
			)}
		</>
	));
}

function seperator(i: number, length: number) {
	if (i === 0) return "";
	if (i === length - 1) {
		if (length > 2) return ", and ";
		return " & ";
	}
	return ", ";
}
