export type SpecType = "cpu" | "gpu" | "memory" | "ssd" | "color";
export type Category = "PTS LOW" | "PTS MEDIUM" | "PTS PRO";
export type SpecIcon = "memory" | "gpu" | "cpu" | "ssd";
export type ColorValue = "black" | "white";

export interface SpecOption {
	value: string;
	price: number;
}

export interface ColorOption {
	color: ColorValue;
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
	colorOptions?: ColorOption[];
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
