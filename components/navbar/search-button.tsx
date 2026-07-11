import { SearchIcon } from "@/components/icons";

export function SearchButton() {
  return (
    <button
      type="button"
      className="grid size-9 place-items-center rounded-full text-foreground transition hover:bg-orange-500/15 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <SearchIcon className="size-5" />
    </button>
  );
}
