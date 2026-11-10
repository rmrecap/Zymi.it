import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const accessKey = searchParams.get("key");

    if (!accessKey) {
      return NextResponse.json(
        { error: "Access key is required to download this digital asset" },
        { status: 400 }
      );
    }

    const asset = await prisma.digitalAsset.findUnique({
      where: { accessKey },
      include: {
        product: {
          select: {
            title: true,
            productType: true,
          },
        },
      },
    });

    if (!asset) {
      return NextResponse.json(
        { error: "Invalid or expired download link" },
        { status: 404 }
      );
    }

    if (asset.downloadLimit <= 0) {
      return NextResponse.json(
        { error: "Download limit exceeded for this asset. Please contact support." },
        { status: 403 }
      );
    }

    // Decrement remaining downloads
    await prisma.digitalAsset.update({
      where: { accessKey },
      data: {
        downloadLimit: { decrement: 1 },
      },
    });

    // If external fileUrl (e.g. S3 / GCS presigned URL), redirect to it
    if (asset.fileUrl.startsWith("http://") || asset.fileUrl.startsWith("https://")) {
      return NextResponse.redirect(asset.fileUrl, { status: 302 });
    }

    // Otherwise return asset info / direct file metadata
    return NextResponse.json({
      success: true,
      fileName: asset.fileName,
      fileUrl: asset.fileUrl,
      fileSize: asset.fileSize,
      downloadsRemaining: asset.downloadLimit - 1,
    });
  } catch (error) {
    console.error("Digital download error:", error);
    return NextResponse.json(
      { error: "Failed to process digital asset download" },
      { status: 500 }
    );
  }
}

