"use client";

import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useRef,
	useCallback,
} from "react";

import type { Spec } from "@/types/product";

interface SelectedOption {
	value: string;
	price: number;
}

interface SelectedOptions {
	[key: string]: SelectedOption;
}

interface SelectedProduct {
	_id: string;
	category: string;
	title: string;
	price: number;
	specs: Spec[];
	image: string;
	selectedOptions: SelectedOptions;
	totalPrice: number;
}

interface SelectedProductContextType {
	selectedProduct: SelectedProduct | null;
	setSelectedProduct: (product: SelectedProduct | null) => void;
	updateSelectedOptions: (options: SelectedOptions) => void;
	clearSelectedProduct: () => void;
	focusForm: () => void;
	registerFormFocus: (handler: (() => void) | null) => void;
}

const SelectedProductContext = createContext<
	SelectedProductContextType | undefined
>(undefined);

export function SelectedProductProvider({ children }: { children: ReactNode }) {
	const [selectedProduct, setSelectedProduct] =
		useState<SelectedProduct | null>(null);
	const focusHandler = useRef<(() => void) | null>(null);

	const updateSelectedOptions = (options: SelectedOptions) => {
		if (!selectedProduct) return;

		const basePrice = selectedProduct.price;
		const optionsTotal = Object.values(options).reduce(
			(sum, opt) => sum + opt.price,
			0
		);

		setSelectedProduct({
			...selectedProduct,
			selectedOptions: options,
			totalPrice: basePrice + optionsTotal,
		});
	};

	const clearSelectedProduct = () => {
		setSelectedProduct(null);
	};

	const focusForm = useCallback(() => {
		focusHandler.current?.();
	}, []);

	const registerFormFocus = useCallback((handler: (() => void) | null) => {
		focusHandler.current = handler;
	}, []);

	return (
		<SelectedProductContext.Provider
			value={{
				selectedProduct,
				setSelectedProduct,
				updateSelectedOptions,
				clearSelectedProduct,
				focusForm,
				registerFormFocus,
			}}
		>
			{children}
		</SelectedProductContext.Provider>
	);
}

export function useSelectedProduct() {
	const context = useContext(SelectedProductContext);
	if (context === undefined) {
		throw new Error(
			"useSelectedProduct must be used within a SelectedProductProvider"
		);
	}
	return context;
}
