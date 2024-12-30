"use server";

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

	const audienceId = process.env.RESEND_AUDIENCE_ID;
	if (!audienceId) {
		console.error(
			"Missing environment variable: RESEND_AUDIENCE_ID. See .env.example for more details.",
		);
		return {
			success: false,
			error: "Something went wrong. Please try again later.",
		};
	}

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
