import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function verifyAdminToken(): Promise<boolean> {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get("admin-token")?.value;

		if (!token) {
			return false;
		}

		const jwtSecret = process.env.JWT_SECRET;
		if (!jwtSecret) {
			return false;
		}

		jwt.verify(token, jwtSecret);
		return true;
	} catch (error) {
		console.error("Token verification error:", error);
		return false;
	}
}

export function verifyAdminTokenFromRequest(request: NextRequest): boolean {
	try {
		const token = request.cookies.get("admin-token")?.value;

		if (!token) {
			return false;
		}

		const jwtSecret = process.env.JWT_SECRET;
		if (!jwtSecret) {
			return false;
		}

		jwt.verify(token, jwtSecret);
		return true;
	} catch (error) {
		console.error("Token verification error:", error);
		return false;
	}
}
