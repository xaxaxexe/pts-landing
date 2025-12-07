export interface SelectedOption {
	value: string;
	price: number;
}

export interface ProductData {
	_id: string;
	category: string;
	title: string;
	price: number;
	image: string;
	selectedOptions: Record<string, SelectedOption>;
	totalPrice: number;
}

export interface CreateOrderRequest {
	name: string;
	telegram: string;
	phone: string;
	email: string;
	city: string;
	consent: boolean;
	data: ProductData | null;
}

export interface CreateOrderResponse {
	success: boolean;
	message: string;
	order?: {
		id: string;
		name: string;
		createdAt: string;
	};
}

export interface Order {
	_id: string;
	name: string;
	telegram: string;
	phone: string;
	email: string;
	city: string;
	consent: boolean;
	data: ProductData | null;
	createdAt: string;
	updatedAt: string;
}

export interface GetOrdersResponse {
	success: boolean;
	orders: Order[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		pages: number;
	};
}

export interface GetOrdersParams {
	page?: number;
	limit?: number;
}
