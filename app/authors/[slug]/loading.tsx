export default function LoadingAuthor() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse">
      <div className="flex items-center gap-4">
        <div className="size-[76px] rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="space-y-3">
          <div className="h-9 w-56 rounded-sm bg-gray-200 dark:bg-gray-800" />
          <div className="h-5 w-32 rounded-sm bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
