import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./api/productsApi";
import { ordersApi } from "./api/ordersApi";
import { authApi } from "./api/authApi";

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[ordersApi.reducerPath]: ordersApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			productsApi.middleware,
			ordersApi.middleware,
			authApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
