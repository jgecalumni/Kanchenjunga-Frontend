import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, ErrorMessage } from "formik";
import { Eye, EyeOffIcon, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AuthSchema } from "../schemas/AuthSchema";
import {
	useLoginMutation,
	useRegisterMutation,
	useResetPassMutation,
	useSendOtpMutation,
	useVerifyOtpMutation,
} from "../../store/baseApi";
import { toast } from "sonner";
import * as Yup from "yup";
import { useAuth } from "@/store/AuthContext";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface IProps {
	open: boolean;
	closed: () => void;
}

export const AuthModal: React.FC<IProps> = ({ open, closed }) => {
	const [showPass, setShowPass] = useState<boolean>(false);
	const [isSignUp, setIsSignUp] = useState<boolean>(false);
	const [showPassValid, setShowPassValid] = useState<boolean>(false);

	const [isForget, setIsForget] = useState(false);
	const [emailVerified, setEmailVerified] = useState(false);
	const [otpVerified, setOtpVerified] = useState(false);

	const [register, { isError, error, isLoading }] = useRegisterMutation();
	const [
		login,
		{ isError: isLoginError, error: LoginError, isLoading: isLoginLoading },
	] = useLoginMutation();
	const [
		sendOtp,
		{
			isError: issendOTPError,
			error: sendOtpError,
			isLoading: issendOtpLoading,
		},
	] = useSendOtpMutation();
	const [
		verifyOtp,
		{
			isError: isverifyOTPError,
			error: verifyOtpError,
			isLoading: isverifyOtpLoading,
		},
	] = useVerifyOtpMutation();
	const [
		resetPass,
		{
			isError: isresetPassError,
			error: resetPassError,
			isLoading: isresetPassLoading,
		},
	] = useResetPassMutation();

	const { refreshTokenFromCookie } = useAuth();

	const currentSchema = useMemo(() => {
		if (!emailVerified) {
			return Yup.object().shape({
				email: Yup.string()
					.email("Invalid email address")
					.required("Email is required"),
			});
		} else if (!otpVerified) {
			return Yup.object().shape({
				otp: Yup.string()
					.length(6, "OTP must be 6 digits")
					.required("OTP is required"),
			});
		} else {
			return Yup.object().shape({
				password: Yup.string()
					.required("Password is required")
					.min(8, "At least 8 characters")
					.matches(/[A-Z]/, "Must include an uppercase letter")
					.matches(/[a-z]/, "Must include a lowercase letter")
					.matches(/[0-9]/, "Must include a number")
					.matches(/[!@#$%^&*]/, "Must include a special character"),
			});
		}
	}, [emailVerified, otpVerified]);

	const handleSubmit = async (data: unknown) => {
		if (isSignUp) {
			const res = await register(data);
			if (res.data?.success) {
				toast.success(res.data.message);
				closed();
			}
		} else {
			const res = await login(data);
			if (res.data?.success) {
				toast.success(res.data.message);
				refreshTokenFromCookie();
				closed();
			}
		}
	};
	const handleSendOtp = async (email: string) => {
		const res = await sendOtp({ email });
		if (res.data?.success) {
			toast.success("OTP sent to email");
			setEmailVerified(true);
		}
	};

	const handleVerifyOtp = async (email: string, otp: string) => {
		const res = await verifyOtp({ email, otp });
		if (res.data?.success) {
			toast.success("OTP verified");
			setOtpVerified(true);
		}
	};

	const handleResetPassword = async (values: {
		email: string;
		password: string;
	}) => {
		const res = await resetPass(values);
		if (res.data?.success) {
			toast.success("Password reset successful!");
			setIsForget(false);
		}
	};

	useEffect(() => {
		if (isError) {
			toast.error(
				(error as { data?: { message?: string } })?.data?.message ||
					"Failed to register"
			);
		}
		if (isLoginError) {
			toast.error(
				(LoginError as { data?: { message?: string } })?.data?.message ||
					"Failed to login"
			);
		}
		if (issendOTPError) {
			toast.error(
				(sendOtpError as { data?: { message?: string } })?.data?.message ||
					"Failed to send OTP"
			);
		}
		if (isverifyOTPError) {
			toast.error(
				(verifyOtpError as { data?: { message?: string } })?.data?.message ||
					"Failed to verify OTP"
			);
		}
		if (isresetPassError) {
			toast.error(
				(resetPassError as { data?: { message?: string } })?.data?.message ||
					"Failed to update password"
			);
		}
	}, [
		isError,
		isLoginError,
		error,
		LoginError,
		issendOTPError,
		sendOtpError,
		isverifyOTPError,
		verifyOtpError,
		resetPassError,
		isresetPassError,
	]);

	return (
		<Dialog
			open={open}
			onOpenChange={closed}>
			<DialogContent className="sm:max-w-[425px] bg-slate-200/95">
				<DialogHeader>
					<DialogTitle className="text-center text-xl">
						{!isForget
							? isSignUp
								? "Create an account"
								: "Sign in"
							: "Forgot Password ?"}
					</DialogTitle>
					<DialogDescription className="text-center text-black/80">
						{!isForget
							? isSignUp
								? "Welcome! Please fill in the details to get started"
								: "Welcome back! Please sign in to continue"
							: "Reset your password from here."}
					</DialogDescription>
				</DialogHeader>

				{isForget ? (
					<Formik
						initialValues={{ email: "", otp: "", password: "" }}
						validationSchema={currentSchema}
						validateOnChange={true}
						validateOnBlur={true}
						onSubmit={(values) => {
							if (!emailVerified) {
								handleSendOtp(values.email);
							} else if (!otpVerified) {
								handleVerifyOtp(values.email, values.otp);
							} else {
								handleResetPassword(values);
							}
						}}>
						{({ handleChange, values }) => {
							const passwordRules = [
								{
									label: "At least 8 characters",
									valid: values.password.length >= 8,
								},
								{
									label: "At least one uppercase letter",
									valid: /[A-Z]/.test(values.password),
								},
								{
									label: "At least one lowercase letter",
									valid: /[a-z]/.test(values.password),
								},
								{
									label: "At least one digit",
									valid: /[0-9]/.test(values.password),
								},
								{
									label: "At least one special character (!@#$%^&*)",
									valid: /[!@#$%^&*]/.test(values.password),
								},
							];

							return (
								<Form className="grid gap-4">
									{/* Step 1: Email */}
									{!emailVerified && (
										<div className="grid gap-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												name="email"
												type="email"
												onChange={handleChange}
												placeholder="example@gmail.com"
												className="bg-[#eeececc3]"
											/>
											<ErrorMessage
												className="text-red-500 text-sm"
												component="div"
												name="email"
											/>
										</div>
									)}

									{/* Step 2: OTP */}
									{emailVerified && !otpVerified && (
										<div className="grid gap-2">
											<Label htmlFor="otp">Enter OTP</Label>
											<Input
												id="otp"
												name="otp"
												type="text"
												onChange={handleChange}
												placeholder="Enter the OTP sent to your email"
												className="bg-[#eeececc3]"
											/>
											<ErrorMessage
												className="text-red-500 text-sm"
												component="div"
												name="otp"
											/>
										</div>
									)}

									{/* Step 3: Password */}
									{emailVerified && otpVerified && (
										<div className="grid gap-2">
											<Label htmlFor="password">New Password</Label>
											<div className="flex">
												<Input
													id="password"
													name="password"
													type={showPass ? "text" : "password"}
													onChange={handleChange}
													onClick={() => setShowPassValid(true)}
													placeholder="*******"
													className="rounded-r-none bg-[#eeececc3]"
												/>
												<div className="bg-[#eeececc3] rounded-r-md pr-4 flex items-center justify-center cursor-pointer">
													{showPass ? (
														<Eye
															size={18}
															onClick={() => setShowPass(false)}
														/>
													) : (
														<EyeOffIcon
															size={18}
															onClick={() => setShowPass(true)}
														/>
													)}
												</div>
											</div>
											{showPassValid && (
												<div className="grid gap-1 text-sm mt-1">
													{passwordRules.map((rule, index) => (
														<div
															key={index}
															className="flex items-center gap-2">
															<span
																className={
																	rule.valid ? "text-green-600" : "text-red-500"
																}>
																{rule.valid ? "✅" : "❌"}
															</span>
															<span>{rule.label}</span>
														</div>
													))}
												</div>
											)}
										</div>
									)}

									<DialogFooter className="mt-3">
										{issendOtpLoading ||
										isverifyOtpLoading ||
										isresetPassLoading ? (
											<Button
												className="w-full flex items-center justify-center gap-2"
												disabled
												type="submit">
												<Loader2 className=" animate-spin" />

												<div>
													{!emailVerified
														? "Send OTP"
														: !otpVerified
														? "Verify OTP"
														: "Reset Password"}
												</div>
											</Button>
										) : (
											<Button
												className="w-full flex items-center justify-center gap-2"
												type="submit">
												{!emailVerified
													? "Send OTP"
													: !otpVerified
													? "Verify OTP"
													: "Reset Password"}
											</Button>
										)}
									</DialogFooter>
								</Form>
							);
						}}
					</Formik>
				) : (
					<Formik
						initialValues={
							isSignUp
								? { name: "", email: "", password: "", role: "" }
								: { email: "", password: "" }
						}
						validationSchema={AuthSchema}
						validateOnChange={true}
						onSubmit={(values) => {
							const passwordChecks = [
								values.password.length >= 8,
								/[A-Z]/.test(values.password),
								/[a-z]/.test(values.password),
								/[0-9]/.test(values.password),
								/[!@#$%^&*]/.test(values.password),
							];

							const allValid = passwordChecks.every((rule) => rule);
							if (!allValid) {
								alert("Password does not meet all requirements.");
								return;
							}
							console.log(values);

							handleSubmit(values);
						}}>
						{({ handleChange, values, setFieldValue }) => {
							const passwordRules = [
								{
									label: "At least 8 characters",
									valid: values.password.length >= 8,
								},
								{
									label: "At least one uppercase letter",
									valid: /[A-Z]/.test(values.password),
								},
								{
									label: "At least one lowercase letter",
									valid: /[a-z]/.test(values.password),
								},
								{
									label: "At least one digit",
									valid: /[0-9]/.test(values.password),
								},
								{
									label: "At least one special character (!@#$%^&*)",
									valid: /[!@#$%^&*]/.test(values.password),
								},
							];

							return (
								<Form>
									<div className="grid gap-4">
										{isSignUp && (
											<>
												<div className="grid gap-2">
													<Label htmlFor="name">Name</Label>
													<Input
														id="name"
														name="name"
														autoComplete="off"
														value={values.name}
														placeholder="Name"
														onChange={handleChange}
														className="bg-[#eeececc3]"
													/>
													<ErrorMessage
														className="text-red-500 text-sm"
														component={"div"}
														name={"name"}
													/>
												</div>
												<div className="grid gap-2">
													<Label htmlFor="role">Role</Label>
													<Select
														onValueChange={(value) =>
															setFieldValue("role", value)
														}>
														<SelectTrigger className="w-full bg-white">
															<SelectValue placeholder="Select your role" />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																<SelectItem value="STUDENT">Student</SelectItem>
																<SelectItem value="ALUMNI">Alumni</SelectItem>
															</SelectGroup>
														</SelectContent>
													</Select>
													<ErrorMessage
														className="text-red-500 text-sm"
														component={"div"}
														name={"role"}
													/>
												</div>
											</>
										)}

										<div className="grid gap-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												name="email"
												type="email"
												value={values.email}
												onChange={handleChange}
												placeholder="example@gmail.com"
												className="bg-[#eeececc3]"
											/>
											<ErrorMessage
												className="text-red-500 text-sm"
												component={"div"}
												name={"email"}
											/>
										</div>

										<div className="grid gap-2">
											<Label htmlFor="password">Password</Label>
											<div
												className="flex transition-all duration-200 rounded-md"
												onClick={() => setShowPassValid(true)}>
												<Input
													id="password"
													name="password"
													onChange={handleChange}
													value={values.password}
													type={showPass ? "text" : "password"}
													placeholder="*******"
													className="rounded-r-none bg-[#eeececc3]"
												/>
												<div className="bg-[#eeececc3] rounded-r-md pr-4 flex items-center justify-center cursor-pointer">
													{showPass ? (
														<Eye
															size={18}
															color="#555555e6"
															onClick={() => setShowPass(false)}
														/>
													) : (
														<EyeOffIcon
															size={18}
															color="#555555e6"
															onClick={() => setShowPass(true)}
														/>
													)}
												</div>
											</div>
											<div className="flex items-center justify-between">
												<div className="w-2/3">
													<ErrorMessage
														className="text-red-500 text-sm"
														component={"div"}
														name={"password"}
													/>
												</div>
												<div
													onClick={() => setIsForget(!isForget)}
													className="text-sm cursor-pointer text-right">
													Forgot Password?
												</div>
											</div>
											{isSignUp ? (
												<div
													className={`grid gap-1 text-sm mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
														showPassValid
															? "max-h-64 opacity-100 mb-4"
															: "max-h-0 opacity-0"
													}`}>
													{passwordRules.map((rule, index) => (
														<div
															key={index}
															className="flex items-center gap-2">
															<span
																className={
																	rule.valid ? "text-green-600" : "text-red-500"
																}>
																{rule.valid ? "✅" : "❌"}
															</span>
															<span
																className={
																	rule.valid
																		? "text-green-700"
																		: "text-gray-700"
																}>
																{rule.label}
															</span>
														</div>
													))}
												</div>
											) : (
												<div></div>
											)}
										</div>
									</div>

									<DialogFooter className="mt-3">
										<Button
											className="w-full flex items-center justify-center gap-2"
											type="submit"
											disabled={isLoading || isLoginLoading}>
											{(isLoading || isLoginLoading) && (
												<Loader2
													size={16}
													className="animate-spin"
												/>
											)}
											{isSignUp ? "Register" : "Login"}
										</Button>
									</DialogFooter>

									<div className="text-center text-sm mt-2">
										{isSignUp
											? "Already have an account? "
											: "Don’t have an account? "}
										<span
											className="font-medium cursor-pointer hover:underline duration-200 transition-all"
											onClick={() => setIsSignUp(!isSignUp)}>
											{isSignUp ? "Sign in" : "Sign up"}
										</span>
									</div>
								</Form>
							);
						}}
					</Formik>
				)}
			</DialogContent>
		</Dialog>
	);
};
