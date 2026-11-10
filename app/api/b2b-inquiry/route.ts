import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { z } from "zod";
import { sanitize } from "@/lib/sanitize";
import context7Cache from "@/lib/context7-cache";

const b2bInquirySchema = z.object({
  companyName: z.string().min(2, "Company name is required").max(100),
  contactPerson: z.string().min(2, "Contact person name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Valid phone number is required").max(30),
  country: z.string().min(2, "Country is required").max(60),
  targetQuantity: z.number().int().min(1, "Target quantity must be at least 1"),
  targetPrice: z.string().optional().nullable(),
  fabricPreference: z.string().optional().nullable(),
  specifications: z.string().min(10, "Please provide product specifications (minimum 10 characters)"),
  sampleNeeded: z.boolean().default(false),
  productId: z.string().optional().nullable(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown-ip";

    // Rate limiting: 10 inquiries per 15 minutes per IP
    const rateLimit = await context7Cache.checkRateLimit(`b2b_inquiry:${ip}`, 10, 900);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many inquiries submitted from this connection. Please try again later." },
        { status: 429 }
      );
    }

    const rawBody = await request.json();
    const validatedData = b2bInquirySchema.safeParse(rawBody);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validatedData.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validatedData.data;

    // Sanitize user inputs
    const sanitizedCompanyName = sanitize(data.companyName);
    const sanitizedContactPerson = sanitize(data.contactPerson);
    const sanitizedSpecifications = sanitize(data.specifications);
    const sanitizedFabric = data.fabricPreference ? sanitize(data.fabricPreference) : null;
    const sanitizedTargetPrice = data.targetPrice ? sanitize(data.targetPrice) : null;

    // Save lead in database
    const lead = await prisma.b2BLead.create({
      data: {
        companyName: sanitizedCompanyName,
        contactPerson: sanitizedContactPerson,
        email: data.email.toLowerCase().trim(),
        phone: data.phone.trim(),
        country: data.country.trim(),
        targetQuantity: data.targetQuantity,
        targetPrice: sanitizedTargetPrice,
        fabricPreference: sanitizedFabric,
        specifications: sanitizedSpecifications,
        sampleNeeded: data.sampleNeeded,
        productId: data.productId || null,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your B2B inquiry has been submitted successfully. Our export merchandising team will contact you within 24 hours.",
        inquiryId: lead.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("B2B Inquiry API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your B2B inquiry." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const leads = await prisma.b2BLead.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        product: {
          select: {
            title: true,
            slug: true,
            mainImage: true,
          },
        },
      },
      take: 100,
    });

    return NextResponse.json(leads);
  } catch (error: any) {
    console.error("Error fetching B2B leads:", error);
    return NextResponse.json(
      { error: "Failed to retrieve B2B inquiries." },
      { status: 500 }
    );
  }
}


