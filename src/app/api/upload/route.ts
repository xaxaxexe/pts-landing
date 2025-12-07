import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import { verifyAdminTokenFromRequest } from "@/lib/auth";

export async function POST(request: NextRequest) {
	try {
		if (!verifyAdminTokenFromRequest(request)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
		}

		const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
		if (!allowedTypes.includes(file.type)) {
			return NextResponse.json(
				{
					error:
						"Invalid file type. Only JPEG, PNG, and WebP images are allowed",
				},
				{ status: 400 }
			);
		}

		const maxSize = 5 * 1024 * 1024;
		if (file.size > maxSize) {
			return NextResponse.json(
				{ error: "File size exceeds 5MB limit" },
				{ status: 400 }
			);
		}

		const timestamp = Date.now();
		const extension = file.name.split(".").pop();
		const filename = `${timestamp}-${Math.random()
			.toString(36)
			.substring(7)}.${extension}`;

		const uploadDir = join(process.cwd(), "public", "uploads");

		if (!existsSync(uploadDir)) {
			mkdirSync(uploadDir, { recursive: true });
		}

		const filepath = join(uploadDir, filename);

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		await writeFile(filepath, buffer);

		const fileUrl = `/uploads/${filename}`;

		return NextResponse.json(
			{
				success: true,
				url: fileUrl,
				filename: filename,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error uploading file:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		if (!verifyAdminTokenFromRequest(request)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { searchParams } = new URL(request.url);
		const imageUrl = searchParams.get("url");

		if (!imageUrl) {
			return NextResponse.json(
				{ error: "Image URL is required" },
				{ status: 400 }
			);
		}

		if (!imageUrl.startsWith("/uploads/")) {
			return NextResponse.json(
				{ error: "Invalid image URL" },
				{ status: 400 }
			);
		}

		const filename = imageUrl.replace("/uploads/", "");
		const filepath = join(process.cwd(), "public", "uploads", filename);

		if (!existsSync(filepath)) {
			return NextResponse.json(
				{ error: "Image not found" },
				{ status: 404 }
			);
		}

		await unlink(filepath);

		return NextResponse.json(
			{
				success: true,
				message: "Image deleted successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting file:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
