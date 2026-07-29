import { cv } from "css-variants";

export const buttonVariants = cv({
  base: "inline-flex items-center justify-center rounded-sm px-3.5 py-2 text-sm font-semibold transition-transform duration-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  defaultVariants: {
    color: "orange",
    variant: "solid",
  },
  variants: {
    color: {
      blue: "[--button-from:var(--color-blue-400)] [--button-to:var(--color-blue-500)] dark:[--button-from:var(--color-blue-500)] dark:[--button-to:var(--color-blue-600)]",
      orange:
        "[--button-from:var(--color-orange-400)] [--button-to:var(--color-orange-500)] dark:[--button-from:var(--color-orange-500)] dark:[--button-to:var(--color-orange-600)]",
    },
    glowing: {
      true: "relative isolate before:pointer-events-none before:absolute before:-inset-1 before:-z-10 before:rounded-sm before:bg-linear-to-b before:from-(--button-from) before:to-(--button-to) before:opacity-0 before:blur before:transition-opacity hover:before:opacity-35 focus-visible:before:opacity-35",
    },
    variant: {
      ghost: "text-foreground hover:bg-surface active:translate-y-px",
      solid:
        "bg-linear-to-b from-(--button-from) to-(--button-to) text-white inset-shadow-2xs inset-shadow-white/35 hover:-translate-y-px active:translate-y-0 dark:text-gray-950",
    },
  },
});

type ButtonVariants = NonNullable<Parameters<typeof buttonVariants>[0]>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance: ButtonVariants;
};

export function Button({ className, appearance, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={buttonVariants({ className, ...appearance })}
    />
  );
}
