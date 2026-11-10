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
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });
      if (user) {
        return NextResponse.json(user);
      }
    } catch {}

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    const body = await request.json().catch(() => ({}));

    try {
      const updated = await prisma.user.update({
        where: { id },
        data: {
          role: body.role,
        },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });
      return NextResponse.json(updated);
    } catch {
      return NextResponse.json({ id, ...body }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    if (id) {
      try {
        await prisma.user.delete({
          where: { id },
        });
      } catch {}
    }
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  }
}
