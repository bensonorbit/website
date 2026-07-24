import { cx } from "css-variants";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cx(
        "relative overflow-hidden rounded-sm border bg-gray-100 shadow-xs dark:bg-gray-900",
        className
      )}
    />
  );
}
