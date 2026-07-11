import { twMerge } from "tailwind-merge";

const colorClasses = {
  blue: "from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600",
  orange:
    "from-orange-400 to-orange-500 dark:from-orange-500 dark:to-orange-600",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: keyof typeof colorClasses;
};

export function Button({ className, color = "orange", ...props }: ButtonProps) {
  const colorClass = colorClasses[color];

  return (
    <button
      type="button"
      {...props}
      className={twMerge(
        "rounded-sm bg-linear-to-b px-3.5 py-2 text-sm font-semibold text-white inset-shadow-2xs inset-shadow-white/35 transition-transform duration-75 hover:-translate-y-px active:translate-y-0 dark:text-gray-950",
        colorClass,
        className
      )}
    />
  );
}

export function GlowingButton(props: ButtonProps) {
  const colorClass = colorClasses[props.color ?? "orange"];

  return (
    <div className="relative group">
      <div
        className={twMerge(
          "absolute -inset-1 rounded-sm blur opacity-0 group-hover:opacity-35 transition-opacity pointer-events-none bg-linear-to-b",
          colorClass
        )}
      />

      <Button {...props} />
    </div>
  );
}
