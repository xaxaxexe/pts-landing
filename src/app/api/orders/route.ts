import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

const createOrderSchema = z.object({
	name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
	telegram: z
		.string()
		.refine(
			(val) => !val || /^@?[a-zA-Z][a-zA-Z0-9_]{3,31}$/.test(val),
			"Неверный формат Telegram"
		)
		.optional()
		.default(""),
	phone: z
		.string()
		.min(1, "Телефон обязателен")
		.regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Неверный формат телефона"),
	email: z
		.string()
		.refine(
			(val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
			"Неверный формат email"
		)
		.optional()
		.default(""),
	city: z.string().min(2, "Город должен содержать минимум 2 символа"),
	consent: z.boolean().refine((val) => val === true, {
		message: "Необходимо согласие на обработку персональных данных",
	}),
	data: z
		.object({
			_id: z.string(),
			category: z.string(),
			title: z.string(),
			price: z.number(),
			image: z.string(),
			selectedOptions: z.record(
				z.string(),
				z.object({
					value: z.string(),
					price: z.number(),
				})
			),
			totalPrice: z.number(),
		})
		.nullable()
		.optional(),
});

export async function POST(request: NextRequest) {
	try {
		await connectDB();

		const body = await request.json();

		const validationResult = createOrderSchema.safeParse(body);

		if (!validationResult.success) {
			const errors = validationResult.error.issues.map((err) => ({
				field: err.path.join("."),
				message: err.message,
			}));

			return NextResponse.json(
				{
					success: false,
					message: "Ошибка валидации данных",
					errors,
				},
				{ status: 400 }
			);
		}

		const validatedData = validationResult.data;

		const order = await Order.create({
			name: validatedData.name,
			telegram: validatedData.telegram,
			phone: validatedData.phone,
			email: validatedData.email,
			city: validatedData.city,
			consent: validatedData.consent,
			data: validatedData.data || null,
		});

		return NextResponse.json(
			{
				success: true,
				message: "Заявка успешно создана",
				order: {
					id: order._id,
					name: order.name,
					createdAt: order.createdAt,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating order:", error);
		return NextResponse.json(
			{ success: false, message: "Ошибка при создании заявки" },
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		await connectDB();

		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page") || "1");
		const limit = parseInt(searchParams.get("limit") || "20");
		const skip = (page - 1) * limit;

		const [orders, total] = await Promise.all([
			Order.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
			Order.countDocuments({}),
		]);

		return NextResponse.json({
			success: true,
			orders,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit),
			},
		});
	} catch (error) {
		console.error("Error fetching orders:", error);
		return NextResponse.json(
			{ success: false, message: "Ошибка при получении заявок" },
			{ status: 500 }
		);
	}
}
