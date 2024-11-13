export function DateFormat(props: {
	date: string;
	style?: Intl.DateTimeFormatOptions["dateStyle"];
}) {
	const date = new Date(props.date);
	const formatted = date.toLocaleDateString("en-US", {
		dateStyle: props.style || "long",
	});

	return <time dateTime={date.toISOString()}>{formatted}</time>;
}
