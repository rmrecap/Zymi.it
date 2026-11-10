import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import context7Cache from "@/lib/context7-cache";
import { sanitize } from "@/lib/sanitize";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    const cacheKey = `blog:posts:p${page}_l${limit}_c${category || "all"}_t${tag || "all"}`;
    const cachedPosts = await context7Cache.get(cacheKey);

    if (cachedPosts) {
      return NextResponse.json(cachedPosts);
    }

    const whereClause: any = {
      published: true,
    };

    if (category) {
      whereClause.category = category;
    }

    if (tag) {
      whereClause.tags = {
        contains: tag,
      };
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          featuredProducts: {
            include: {
              product: {
                select: {
                  id: true,
                  slug: true,
                  title: true,
                  price: true,
                  mainImage: true,
                  productType: true,
                  rating: true,
                  affiliateUrl: true,
                  asin: true,
                },
              },
            },
          },
        },
      }),
      prisma.post.count({ where: whereClause }),
    ]);

    const result = {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    // Cache in Context7 for 30 minutes
    await context7Cache.set(cacheKey, result, 1800);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Blog fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check Authorization / API key for automated publishing bots
    const authHeader = request.headers.get("authorization") || request.headers.get("x-blog-api-key");
    const expectedKey = process.env.BLOG_PUBLISHER_API_KEY || "zymi-seo-publisher-secret";

    if (!authHeader || !authHeader.includes(expectedKey)) {
      return NextResponse.json({ error: "Unauthorized publisher request" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      author,
      metaTitle,
      metaDescription,
      canonicalUrl,
      tags,
      category,
      readingTime,
      productIds,
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required fields" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title: sanitize(title),
        slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        content,
        excerpt: excerpt ? sanitize(excerpt) : null,
        coverImage: coverImage || "/product_placeholder.jpg",
        author: author || "Editorial Team",
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        canonicalUrl: canonicalUrl || `/blog/${slug}`,
        tags: tags || "E-commerce, Apparel, Trends",
        category: category || "Industry Insights",
        readingTime: readingTime || 5,
        published: true,
      },
    });

    // Link featured products if provided
    if (Array.isArray(productIds) && productIds.length > 0) {
      await Promise.all(
        productIds.map((pId: string) =>
          prisma.post_product.create({
            data: {
              postId: post.id,
              productId: pId,
            },
          }).catch(() => null)
        )
      );
    }

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error: any) {
    console.error("Blog post creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to publish blog post" },
      { status: 500 }
    );
  }
}

