import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	CreateOrderRequest,
	CreateOrderResponse,
	GetOrdersParams,
	GetOrdersResponse,
} from "@/types/order";

export const ordersApi = createApi({
	reducerPath: "ordersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	tagTypes: ["Orders"],
	endpoints: (builder) => ({
		createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
			query: (orderData) => ({
				url: "/orders",
				method: "POST",
				body: orderData,
			}),
			invalidatesTags: ["Orders"],
		}),
		getOrders: builder.query<GetOrdersResponse, GetOrdersParams | void>({
			query: (params) => {
				const page = params?.page || 1;
				const limit = params?.limit || 20;
				return `/orders?page=${page}&limit=${limit}`;
			},
			providesTags: ["Orders"],
		}),
	}),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = ordersApi;
