import { NextResponse } from "next/server";

export async function POST() {
	const response = NextResponse.json({
		success: true,
		message: "Успешный выход",
	});

	response.cookies.delete("admin-token");

	return response;
}
