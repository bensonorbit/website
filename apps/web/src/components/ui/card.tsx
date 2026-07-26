import { cx } from "css-variants";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cx(
        "relative overflow-hidden rounded-sm border bg-gray-100 p-4 shadow-xs sm:p-6 dark:bg-gray-900 isolate",
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
        "my-3 font-sans text-base leading-relaxed text-gray-600 dark:text-gray-300",
        className
      )}
    >
      {children}
    </p>
  );
}
