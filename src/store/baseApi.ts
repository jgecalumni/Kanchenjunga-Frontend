import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IResponse {
	token: string;
	message: string;
	success: boolean;
	error: boolean;
}
interface IOTP {
	message: string;
	success: boolean;
	error: boolean;
}

interface IUser {
	data: any;
	success: boolean;
	error: boolean;
}

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_URL,
		credentials: "include",
	}),
	tagTypes: [
		"login",
		"logout",
		"register",
		"user",
		"sendOtp",
		"verifyOtp",
		"resetPass",
		"getProfile",
		"updateProfile",
	],
	endpoints: (builder) => ({
		login: builder.mutation<IResponse, unknown>({
			query: (data) => ({
				url: "/auth/login",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["login"],
		}),

		register: builder.mutation<IResponse, unknown>({
			query: (data) => ({
				url: "/auth/register",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["register"],
		}),
		logout: builder.mutation<IResponse, void>({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
			invalidatesTags: ["logout"],
		}),
		sendOtp: builder.mutation<IOTP, unknown>({
			query: (email: string) => ({
				url: "/auth/forget-password",
				method: "POST",
				body: email,
			}),
			invalidatesTags: ["sendOtp"],
		}),
		verifyOtp: builder.mutation<IOTP, unknown>({
			query: ({ email, otp }: { email: string; otp: string }) => ({
				url: "/auth/verify-otp",
				method: "POST",
				body: { email, otp },
			}),
			invalidatesTags: ["verifyOtp"],
		}),
		resetPass: builder.mutation<IOTP, unknown>({
			query: ({ email, password }: { email: string; password: string }) => ({
				url: "/auth/reset-password",
				method: "PATCH",
				body: { email, password },
			}),
			invalidatesTags: ["resetPass"],
		}),
		getProfile: builder.query<IUser, unknown>({
			query: () => ({
				url: "/auth/get-user",
				method: "GET",
				credentials: "include",
			}),
			providesTags: ["getProfile"],
		}),
		updateProfile: builder.mutation<IResponse, any>({
			query: (data) => ({
				url: "/auth/update",
				method: "PATCH",
				body:data,
				credentials: "include",
			}),
			invalidatesTags: ["updateProfile"],
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useSendOtpMutation,
	useVerifyOtpMutation,
	useResetPassMutation,
	useGetProfileQuery,
	useUpdateProfileMutation,
} = baseApi;
