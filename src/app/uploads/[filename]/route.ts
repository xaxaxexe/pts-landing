import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const MIME_TYPES: Record<string, string> = {
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	png: "image/png",
	webp: "image/webp",
};

export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ filename: string }> },
) {
	const { filename } = await params;

	const ext = filename.split(".").pop()?.toLowerCase() || "";
	const mimeType = MIME_TYPES[ext];

	if (!mimeType) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const filepath = join(process.cwd(), "public", "uploads", filename);

	if (!existsSync(filepath)) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const file = await readFile(filepath);

	return new NextResponse(file, {
		headers: {
			"Content-Type": mimeType,
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
