import mongoose, { Schema, Document, Model } from "mongoose";
import type {
	Category,
	SpecType,
	SpecOption,
	ColorOption,
} from "@/types/product";

export type ISpecOption = SpecOption;
export type IColorOption = ColorOption;

export interface ISpec {
	type: SpecType;
	value?: string;
	options?: ISpecOption[];
	colorOptions?: IColorOption[];
}

export interface IProduct extends Document {
	category: Category;
	title: string;
	price: number;
	specs: ISpec[];
	image: string;
	createdAt: Date;
	updatedAt: Date;
}

const SpecOptionSchema = new Schema<ISpecOption>(
	{
		value: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{ _id: false }
);

const ColorOptionSchema = new Schema<IColorOption>(
	{
		color: {
			type: String,
			required: true,
			enum: ["black", "white"],
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{ _id: false }
);

const SpecSchema = new Schema<ISpec>(
	{
		type: {
			type: String,
			required: true,
			enum: ["cpu", "gpu", "memory", "ssd", "color"],
		},
		value: {
			type: String,
			required: function (this: ISpec) {
				return this.type === "cpu" || this.type === "gpu";
			},
		},
		options: {
			type: [SpecOptionSchema],
			required: function (this: ISpec) {
				return this.type === "memory" || this.type === "ssd";
			},
		},
		colorOptions: {
			type: [ColorOptionSchema],
			required: function (this: ISpec) {
				return this.type === "color";
			},
		},
	},
	{ _id: false }
);

const ProductSchema = new Schema<IProduct>(
	{
		category: {
			type: String,
			required: true,
			trim: true,
		},
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		specs: {
			type: [SpecSchema],
			required: true,
			validate: {
				validator: (specs: ISpec[]) => specs.length > 0,
				message: "Product must have at least one spec",
			},
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Product: Model<IProduct> =
	mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
