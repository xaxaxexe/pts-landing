import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./api/productsApi";
import { ordersApi } from "./api/ordersApi";

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[ordersApi.reducerPath]: ordersApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware, ordersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
