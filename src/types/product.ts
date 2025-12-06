export type SpecType = "cpu" | "gpu" | "memory" | "ssd";
export type Category = "PTS LOW" | "PTS MEDIUM" | "PTS PRO";
export type SpecIcon = "memory" | "gpu" | "cpu" | "ssd";

export interface SpecOption {
	value: string;
	price: number;
}

export interface SpecForCard {
	icon: SpecIcon;
	label: string;
}

export interface Spec {
	type: SpecType;
	value?: string;
	options?: SpecOption[];
}

export interface Product {
	_id: string;
	category: Category;
	title: string;
	price: number;
	specs: Spec[];
	image: string;
	createdAt: string;
	updatedAt: string;
}

export interface ProductsResponse {
	success: boolean;
	count: number;
	products: Product[];
}
