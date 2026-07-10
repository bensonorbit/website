export function DateFormat(props: {
  date: string;
  dateStyle?: Intl.DateTimeFormatOptions["dateStyle"];
  className?: string;
}) {
  const date = new Date(props.date);
  const formatted = date.toLocaleDateString("en-US", {
    dateStyle: props.dateStyle || "long",
    timeZone: "America/Los_Angeles",
  });

  return (
    <time dateTime={date.toISOString()} className={props.className}>
      {formatted}
    </time>
  );
}
