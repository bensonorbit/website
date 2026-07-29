import { cx } from "css-variants";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx("rounded-sm bg-skeleton", className)}
    />
  );
}
