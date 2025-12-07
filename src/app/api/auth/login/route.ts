import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(request: NextRequest) {
	try {
		const { login, password } = await request.json();

		const jwtSecret = process.env.JWT_SECRET;

		if (!jwtSecret) {
			return NextResponse.json(
				{ success: false, message: "Server configuration error" },
				{ status: 500 }
			);
		}

		await connectDB();

		const admin = await Admin.findOne({ login });

		if (!admin) {
			return NextResponse.json(
				{ success: false, message: "Неверный логин или пароль" },
				{ status: 401 }
			);
		}

		const isPasswordValid = await admin.comparePassword(password);

		if (!isPasswordValid) {
			return NextResponse.json(
				{ success: false, message: "Неверный логин или пароль" },
				{ status: 401 }
			);
		}

		const token = await new SignJWT({
			login: admin.login,
			id: admin._id.toString(),
		})
			.setProtectedHeader({ alg: "HS256" })
			.setExpirationTime("7d")
			.sign(new TextEncoder().encode(jwtSecret));

		const response = NextResponse.json({
			success: true,
			message: "Успешный вход",
		});

		response.cookies.set("admin-token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 7,
			path: "/",
		});

		return response;
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json(
			{ success: false, message: "Ошибка сервера" },
			{ status: 500 }
		);
	}
}
