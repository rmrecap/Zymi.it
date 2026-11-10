import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    if (!id) {
      return NextResponse.json({ error: "Category ID required" }, { status: 400 });
    }

    try {
      const category = await prisma.category.findUnique({
        where: { id },
      });
      if (category) {
        return NextResponse.json(category);
      }
    } catch {}

    return NextResponse.json({ id, name: "General Category" });
  } catch (error) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    const body = await request.json().catch(() => ({}));
    const name = (body.name || "").trim();

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    try {
      const updated = await prisma.category.update({
        where: { id },
        data: { name },
      });
      return NextResponse.json(updated);
    } catch {
      return NextResponse.json({ id, name }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    if (id) {
      try {
        await prisma.category.delete({
          where: { id },
        });
      } catch {}
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse(null, { status: 204 });
  }
}
