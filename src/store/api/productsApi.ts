import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	Category,
	ProductsResponse,
	Product,
	CreateProductRequest,
	DeleteProductResponse,
	UploadImageResponse,
	DeleteImageRequest,
	DeleteImageResponse,
} from "@/types/product";

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
		createProduct: builder.mutation<Product, CreateProductRequest>({
			query: (productData) => ({
				url: "/products",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: productData,
			}),
			invalidatesTags: ["Products"],
		}),
		deleteProduct: builder.mutation<DeleteProductResponse, string>({
			query: (id) => ({
				url: `/products?id=${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Products"],
		}),
		uploadImage: builder.mutation<UploadImageResponse, FormData>({
			query: (formData) => ({
				url: "/upload",
				method: "POST",
				body: formData,
			}),
		}),
		deleteImage: builder.mutation<DeleteImageResponse, DeleteImageRequest>({
			query: ({ url }) => ({
				url: `/upload?url=${encodeURIComponent(url)}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductsByCategoryQuery,
	useCreateProductMutation,
	useDeleteProductMutation,
	useUploadImageMutation,
	useDeleteImageMutation,
} = productsApi;
