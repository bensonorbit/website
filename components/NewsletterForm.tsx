"use client";

import { useActionState } from "react";
import { subscribe } from "@/lib/actions";

export function NewsletterForm() {
	const [{ success, error }, formAction, isPending] = useActionState(
		subscribe,
		{ success: false },
	);

	return (
		<>
			<form
				className="mt-2 flex flex-col gap-2 md:flex-row"
				action={formAction}
			>
				<input
					name="email"
					type="email"
					className="grow rounded-sm border bg-background px-3 py-2 hover:border-gray-300 focus:border-blue-200 focus:outline-none hover:dark:border-gray-700 dark:focus:border-blue-800"
					placeholder="Email address"
					aria-label="Email address"
					required
				/>
				<button
					type="submit"
					className="flex items-center gap-2 rounded-sm bg-blue-200 px-3 py-2 font-medium transition hover:bg-blue-300 active:bg-blue-200 disabled:opacity-80 dark:bg-blue-800 dark:hover:bg-blue-700 dark:active:bg-blue-800"
					disabled={isPending}
				>
					Sign up
				</button>
			</form>

			<div aria-live="polite" className="text-sm font-medium">
				{success && <p className="mt-2">Thank you for subscribing! 🎉</p>}
				{error && (
					<p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
				)}
			</div>
		</>
	);
}
