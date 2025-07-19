import * as yup from "yup";
import * as Yup from "yup";

export const AuthSchema = Yup.object().shape({
	name: Yup.string().when("email", {
		is: (_email: unknown, schema: { parent: { name: unknown } }) =>
			typeof schema?.parent?.name !== "undefined", // only validate if "name" exists (i.e., sign-up mode)
		then: (schema) =>
			schema
				.required("Name is required")
				.min(2, "Name must be at least 2 characters")
				.max(50, "Name must be at most 50 characters"),
		otherwise: (schema) => schema.notRequired(),
	}),

	role: Yup.string().when("email", {
		is: (_role: unknown, schema: { parent: { role: unknown } }) =>
			typeof schema?.parent?.role !== "undefined", // only validate if "name" exists (i.e., sign-up mode)
		then: (schema) => schema.required("Role is required"),

		otherwise: (schema) => schema.notRequired(),
	}),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters")
		.matches(/[A-Z]/, "Must include at least one uppercase letter")
		.matches(/[a-z]/, "Must include at least one lowercase letter")
		.matches(/[0-9]/, "Must include at least one number")
		.matches(
			/[!@#$%^&*]/,
			"Must include at least one special character (!@#$%^&*)"
		),
});

export const forgetPasswordSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),

	otp: yup.string().when("email", {
		is: (email: string) => !!email,
		then: () =>
			yup
				.string()
				.length(6, "OTP must be 6 digits")
				.required("OTP is required"),
	}),

	password: yup.string().when("otp", {
		is: (otp: string) => !!otp,
		then: () =>
			yup
				.string()
				.required("Password is required")
				.min(8, "Password must be at least 8 characters")
				.matches(/[A-Z]/, "Must include an uppercase letter")
				.matches(/[a-z]/, "Must include a lowercase letter")
				.matches(/[0-9]/, "Must include a number")
				.matches(/[!@#$%^&*]/, "Must include a special character"),
	}),
});
