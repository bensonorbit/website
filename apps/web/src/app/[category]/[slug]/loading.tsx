export default function LoadingArticle() {
  return (
    <article className="mx-auto max-w-[65ch] animate-pulse motion-reduce:animate-none">
      <header>
        <Skeleton className="mb-3 h-4 w-20" />

        <div className="space-y-2">
          <Skeleton className="h-10 w-full sm:h-12" />
          <Skeleton className="h-10 w-4/5 sm:h-12" />
        </div>

        <div className="mt-4 space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        <Skeleton className="mt-4 h-5 w-64" />
      </header>

      <Skeleton className="mt-6 mb-6 aspect-3/2 w-full" />

      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-8 h-5 w-full" />

      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-8 h-5 w-full" />

      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-8 h-5 w-full" />

      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-8 h-5 w-full" />

      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-8 h-5 w-full" />

      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-2 h-5 w-full" />
      <Skeleton className="mb-8 h-5 w-full" />
    </article>
  );
}

function Skeleton(props: { className?: string }) {
  return <div className={`rounded-lg bg-skeleton ${props.className}`} />;
}
