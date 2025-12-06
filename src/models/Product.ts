import mongoose, { Schema, Document, Model } from "mongoose";
import type { Category, SpecType, SpecOption } from "@/types/product";

export interface ISpecOption extends SpecOption {}

export interface ISpec {
	type: SpecType;
	value?: string;
	options?: ISpecOption[];
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

const SpecSchema = new Schema<ISpec>(
	{
		type: {
			type: String,
			required: true,
			enum: ["cpu", "gpu", "memory", "ssd"],
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
	},
	{ _id: false }
);

const ProductSchema = new Schema<IProduct>(
	{
		category: {
			type: String,
			required: true,
			enum: ["PTS LOW", "PTS MEDIUM", "PTS PRO"],
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
