import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
		const token = request.cookies.get("admin-token")?.value;
		const jwtSecret = process.env.JWT_SECRET;

		if (!token || !jwtSecret) {
			return NextResponse.redirect(new URL("/admin/login", request.url));
		}

		try {
			await jwtVerify(token, new TextEncoder().encode(jwtSecret));
			return NextResponse.next();
		} catch (error) {
			console.error("Token verification failed:", error);
			return NextResponse.redirect(new URL("/admin/login", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
