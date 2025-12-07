import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginRequest, LoginResponse, LogoutResponse } from "@/types/auth";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (credentials) => ({
				url: "/login",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: credentials,
			}),
		}),
		logout: builder.mutation<LogoutResponse, void>({
			query: () => ({
				url: "/logout",
				method: "POST",
			}),
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
