const colorClasses = {
  blue: "from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600",
  orange:
    "from-orange-400 to-orange-500 dark:from-orange-500 dark:to-orange-600",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  color?: keyof typeof colorClasses;
};

export function Button(props: ButtonProps) {
  const colorClass = colorClasses[props.color ?? "orange"];

  return (
    <button
      className={`rounded-sm px-3.5 py-2 text-sm font-semibold text-white hover:-translate-y-px active:translate-y-0 bg-linear-to-b dark:text-gray-950 inset-shadow-2xs inset-shadow-white/35 transition-transform duration-75 ${colorClass}`}
      type="button"
      {...props}
    />
  );
}
