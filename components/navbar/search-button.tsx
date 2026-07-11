import { SearchIcon } from "@/components/icons";

export function SearchButton() {
  return (
    <button
      type="button"
      aria-label="Search (coming soon)"
      title="Search coming soon"
      className="grid size-9 place-items-center rounded-full text-foreground hover:bg-primary/15 hover:text-primary active:bg-primary/20"
    >
      <SearchIcon className="size-5" />
    </button>
  );
}
