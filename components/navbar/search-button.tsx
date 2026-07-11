import { SearchIcon } from "@/components/icons";

export function SearchButton() {
  return (
    <button
      type="button"
      aria-label="Search (coming soon)"
      title="Search coming soon"
      className="grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-primary/15 hover:text-primary"
    >
      <SearchIcon className="size-5" />
    </button>
  );
}
