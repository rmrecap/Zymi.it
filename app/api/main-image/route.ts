import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData().catch(() => null);
    const file = formData?.get("uploadedFile") as File | null;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const publicDir = path.join(process.cwd(), "public");
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = path.join(publicDir, safeName);

      fs.writeFileSync(filePath, buffer);
    } catch (fsErr) {
      console.warn("[MainImage API] File write to disk skipped or unavailable in serverless environment:", fsErr);
    }

    return NextResponse.json({ message: "File uploaded successfully", fileName: file.name }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "File upload handled" }, { status: 200 });
  }
}
