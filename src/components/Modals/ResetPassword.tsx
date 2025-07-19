import { useUpdateProfileMutation } from "@/store/baseApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ErrorMessage, Form, Formik } from "formik";
import { Label } from "../ui/label";
import { CheckCircle, Eye, EyeOffIcon, Loader2, Shield } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
interface ResetPass {
	open: boolean;
	closed: () => void;
}


export const ResetPassword: React.FC<ResetPass> = ({ open, closed }) => {
    const [showPass, setShowPass] = useState<boolean>(false);
    const [showPassValid, setShowPassValid] = useState<boolean>(false);
    const [updatePass, { isError, error, isLoading }] =
        useUpdateProfileMutation();

    const handleSubmit = async (values: any) => {
        const res = await updatePass(values);
        if (res.data?.success) {
            toast.success(res.data.message);
            closed();
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error(
                (error as { data?: { message?: string } })?.data?.message ||
                    "Failed to update password"
            );
        }
    }, [isError, error]);

    return (
        <Dialog
            open={open}
            onOpenChange={closed}>
            <DialogContent className="sm:max-w-[500px] glass-card">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-gray-900 jakarta-font">
                        Reset Password
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-600">
                        Create a new secure password for your account
                    </DialogDescription>
                </DialogHeader>

                <Formik
                    initialValues={{
                        password: "",
                    }}
                    validateOnChange={true}
                    onSubmit={(values: any) => {
                        const passwordChecks = [
                            values.password.length >= 8,
                            /[A-Z]/.test(values.password),
                            /[a-z]/.test(values.password),
                            /[0-9]/.test(values.password),
                            /[!@#$%^&*]/.test(values.password),
                        ];

                        const allValid = passwordChecks.every((rule) => rule);
                        if (!allValid) {
                            toast.warning("Password does not meet all requirements.");
                            return;
                        }

                        handleSubmit(values);
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
                            <Form>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="password"
                                            className="flex items-center space-x-2">
                                            <Shield className="w-4 h-4" />
                                            <span>New Password</span>
                                        </Label>
                                        <div
                                            className="flex transition-all duration-200 rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
                                            onClick={() => setShowPassValid(true)}>
                                            <Input
                                                id="password"
                                                name="password"
                                                onChange={handleChange}
                                                value={values.password}
                                                type={showPass ? "text" : "password"}
                                                placeholder="Enter your new password"
                                                className="border-0 focus-visible:ring-0 rounded-r-none"
                                            />
                                            <button
                                                type="button"
                                                className="px-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
                                                onClick={() => setShowPass(!showPass)}>
                                                {showPass ? (
                                                    <EyeOffIcon className="w-5 h-5" />
                                                ) : (
                                                    <Eye className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                        <ErrorMessage
                                            className="text-red-500 text-sm"
                                            component={"div"}
                                            name={"password"}
                                        />
                                    </div>

                                    <div
                                        className={`space-y-3 overflow-hidden transition-all duration-300 ease-in-out ${
                                            showPassValid
                                                ? "max-h-64 opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}>
                                        <h4 className="text-sm font-medium text-gray-700">
                                            Password Requirements:
                                        </h4>
                                        <div className="grid gap-2">
                                            {passwordRules.map((rule, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-3 text-sm">
                                                    <div
                                                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                                            rule.valid
                                                                ? "bg-green-100 text-green-600"
                                                                : "bg-red-100 text-red-600"
                                                        }`}>
                                                        {rule.valid ? (
                                                            <CheckCircle className="w-3 h-3" />
                                                        ) : (
                                                            "✕"
                                                        )}
                                                    </div>
                                                    <span
                                                        className={
                                                            rule.valid ? "text-green-700" : "text-gray-600"
                                                        }>
                                                        {rule.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter className="mt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={closed}
                                        className="mr-2">
                                        Cancel
                                    </Button>
                                    <Button
                                        className="gradient-secondary text-white flex items-center space-x-2"
                                        type="submit"
                                        disabled={isLoading}>
                                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                        <span>Update Password</span>
                                    </Button>
                                </DialogFooter>
                            </Form>
                        );
                    }}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};