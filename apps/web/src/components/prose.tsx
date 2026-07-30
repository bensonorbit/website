import { cx } from "css-variants";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type ProseProps<T extends ElementType = "div"> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Prose<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ProseProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      {...props}
      className={cx(
        "mx-auto prose prose-gray dark:prose-invert prose-a:decoration-border prose-a:underline-offset-4 prose-a:hover:text-foreground prose-a:hover:decoration-primary prose-a:focus-visible:text-foreground prose-a:focus-visible:decoration-primary prose-img:rounded-sm prose-img:drop-shadow-xs",
        className
      )}
    />
  );
}
