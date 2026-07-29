import { cx } from "css-variants";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cx(
        "relative isolate overflow-hidden rounded-sm border bg-surface p-4 shadow-xs sm:p-6",
        className
      )}
    />
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      {...props}
      className={cx(
        "font-serif text-3xl leading-tight font-bold tracking-tight text-balance",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cx(
        "my-3 font-sans text-base leading-relaxed text-foreground-muted",
        className
      )}
    >
      {children}
    </p>
  );
}
