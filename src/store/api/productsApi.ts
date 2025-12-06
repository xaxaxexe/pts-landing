import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, ProductsResponse } from "@/types/product";

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	tagTypes: ["Products"],
	endpoints: (builder) => ({
		getProducts: builder.query<ProductsResponse, void>({
			query: () => "/products",
			providesTags: ["Products"],
		}),
		getProductsByCategory: builder.query<ProductsResponse, Category>({
			query: (category) => `/products?category=${encodeURIComponent(category)}`,
			providesTags: ["Products"],
		}),
	}),
});

export const { useGetProductsQuery, useGetProductsByCategoryQuery } =
	productsApi;
