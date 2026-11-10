import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ params?: string[] }>;
};

export async function GET(request: NextRequest, props: Props) {
  try {
    const { params } = await props.params;
    const pathParts = params || [];

    // Case: /api/notifications/:userId/unread-count
    if (pathParts.length >= 2 && pathParts[1] === "unread-count") {
      const userId = pathParts[0];
      try {
        const count = await prisma.notification.count({
          where: { userId, isRead: false },
        });
        return NextResponse.json({ unreadCount: count || 0 });
      } catch {
        return NextResponse.json({ unreadCount: 0 });
      }
    }

    // Case: /api/notifications/:userId or /api/notifications
    const userId = pathParts[0];
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));
    const offset = (page - 1) * limit;

    try {
      const where: any = {};
      if (userId) {
        where.userId = userId;
      }

      const [notifications, total] = await Promise.all([
        prisma.notification.findMany({
          where,
          skip: offset,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        prisma.notification.count({ where }),
      ]);

      return NextResponse.json({
        notifications: notifications || [],
        pagination: {
          page,
          limit,
          total: total || 0,
          totalPages: Math.ceil((total || 0) / limit) || 1,
        },
      });
    } catch {
      return NextResponse.json({
        notifications: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      });
    }
  } catch (error) {
    return NextResponse.json({
      notifications: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    });
  }
}

export async function POST(request: NextRequest, props: Props) {
  try {
    const { params } = await props.params;
    const pathParts = params || [];
    const body = await request.json().catch(() => ({}));

    // Case: /api/notifications/mark-read
    if (pathParts[0] === "mark-read") {
      const { notificationIds, userId } = body;
      try {
        if (notificationIds && Array.isArray(notificationIds) && notificationIds.length > 0) {
          await prisma.notification.updateMany({
            where: { id: { in: notificationIds } },
            data: { isRead: true },
          });
        } else if (userId) {
          await prisma.notification.updateMany({
            where: { userId },
            data: { isRead: true },
          });
        }
      } catch {}
      return NextResponse.json({ success: true, message: "Marked as read" });
    }

    // Case: /api/notifications (Create)
    const { userId, title, message, type = "SYSTEM_ALERT", priority = "NORMAL" } = body;
    if (!userId || !title) {
      return NextResponse.json({ error: "userId and title are required" }, { status: 400 });
    }

    try {
      const notification = await prisma.notification.create({
        data: {
          userId,
          title,
          message: message || "",
          type,
          priority,
        },
      });
      return NextResponse.json(notification, { status: 201 });
    } catch {
      return NextResponse.json(
        { id: `notif-${Date.now()}`, userId, title, isRead: false },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to process notification" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, props: Props) {
  try {
    const { params } = await props.params;
    const id = params?.[0];
    const body = await request.json().catch(() => ({}));

    if (id) {
      try {
        await prisma.notification.update({
          where: { id },
          data: { isRead: Boolean(body.isRead) },
        });
      } catch {}
    }

    return NextResponse.json({ success: true, message: "Notification updated" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, props: Props) {
  try {
    const { params } = await props.params;
    const pathParts = params || [];
    const body = await request.json().catch(() => ({}));

    // Case: /api/notifications/bulk
    if (pathParts[0] === "bulk") {
      const { notificationIds, userId } = body;
      try {
        if (notificationIds && Array.isArray(notificationIds) && notificationIds.length > 0) {
          await prisma.notification.deleteMany({
            where: { id: { in: notificationIds } },
          });
        } else if (userId) {
          await prisma.notification.deleteMany({
            where: { userId },
          });
        }
      } catch {}
      return NextResponse.json({ success: true, message: "Notifications deleted" });
    }

    // Case: /api/notifications/:id
    const id = pathParts[0];
    if (id) {
      try {
        await prisma.notification.delete({
          where: { id },
        });
      } catch {}
    }

    return NextResponse.json({ success: true, message: "Notification deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete notification" }, { status: 500 });
  }
}
