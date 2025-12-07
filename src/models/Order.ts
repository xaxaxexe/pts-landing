import mongoose, { Schema, Document } from "mongoose";

interface SelectedOption {
	value: string;
	price: number;
}

interface ProductData {
	_id: string;
	category: string;
	title: string;
	price: number;
	image: string;
	selectedOptions: Record<string, SelectedOption>;
	totalPrice: number;
}

export interface IOrder extends Document {
	name: string;
	telegram: string;
	phone: string;
	email: string;
	city: string;
	consent: boolean;
	data: ProductData | null;
	createdAt: Date;
	updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		telegram: {
			type: String,
			trim: true,
			default: "",
		},
		phone: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			default: "",
		},
		city: {
			type: String,
			required: true,
			trim: true,
		},
		consent: {
			type: Boolean,
			required: true,
		},
		data: {
			type: Schema.Types.Mixed,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

const Order =
	mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
