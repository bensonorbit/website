"use server";

import { assert } from "@/lib/utils";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ActionState = {
	success: boolean;
	error?: string;
};

export async function subscribe(
	previousState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const email = formData.get("email")?.toString();
	if (!email || !email.includes("@")) {
		return { success: false, error: "Please enter a valid email address." };
	}

	const audienceId = assert(
		process.env.RESEND_AUDIENCE_ID,
		"RESEND_AUDIENCE_ID",
	);

	const { error } = await resend.contacts.create({
		email,
		audienceId,
	});

	if (error) {
		console.error("Error creating Resend contact:", error);
		return {
			success: false,
			error: "Something went wrong. Please try again later.",
		};
	}

	return { success: true };
}
