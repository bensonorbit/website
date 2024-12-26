export function DateFormat(props: {
	date: string;
	style?: Intl.DateTimeFormatOptions["dateStyle"];
	className?: string;
}) {
	const date = new Date(props.date);
	const formatted = date.toLocaleDateString("en-US", {
		dateStyle: props.style || "long",
		timeZone: "America/Los_Angeles",
	});

	return (
		<time dateTime={date.toISOString()} className={props.className}>
			{formatted}
		</time>
	);
}
