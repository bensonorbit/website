export default function LoadingArticle() {
	return (
		<div className="mx-auto prose animate-pulse">
			{/* Title */}
			<Skeleton className="mb-1 h-10 w-80" />
			<Skeleton className="mb-2 h-10 w-80" />

			{/* Date and author */}
			<Skeleton className="h-6 w-60" />

			{/* Cover image */}
			<Skeleton className="mt-4 mb-5 h-[387px] w-full" />

			{/* Body */}
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
		</div>
	);
}

function Skeleton(props: { className?: string }) {
	return (
		<div
			className={`rounded-lg bg-gray-200 dark:bg-gray-800 ${props.className}`}
		/>
	);
}
