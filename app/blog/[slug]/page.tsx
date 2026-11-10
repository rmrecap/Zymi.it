import React from "react";
import prisma from "@/utils/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { FaClock, FaCalendar, FaUser, FaTag, FaArrowLeft, FaIndustry, FaShareNodes } from "react-icons/fa6";
import BlogProductRecommendation from "@/components/BlogProductRecommendation";
import B2BFactoryCTA from "@/components/B2BFactoryCTA";
import context7Cache from "@/lib/context7-cache";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      select: { title: true, excerpt: true, metaTitle: true, metaDescription: true, canonicalUrl: true },
    });

    if (!post) {
      return { title: "Article Not Found | ZYMI RMG" };
    }

    return {
      title: `${post.metaTitle || post.title} | Apparel Emporium Insights`,
      description: post.metaDescription || post.excerpt || "Apparel manufacturing and RMG export intelligence.",
      alternates: {
        canonical: post.canonicalUrl || `/blog/${slug}`,
      },
    };
  } catch {
    return { title: "RMG Article | ZYMI & Apparel Emporium" };
  }
}

export default async function SingleBlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // Attempt to fetch from Context7 cache or database
  let post: any = null;
  try {
    post = await context7Cache.getCachedBlogContext(slug);
    if (!post) {
      post = await prisma.post.findUnique({
        where: { slug },
        include: {
          featuredProducts: {
            include: {
              product: true,
            },
          },
        },
      });

      if (post) {
        await context7Cache.cacheBlogContext(slug, post);
      }
    }
  } catch (err) {
    console.error("Error retrieving blog post:", err);
  }

  // Fallback demo data if database is not seeded
  if (!post) {
    if (slug === "how-to-calculate-knit-fabric-consumption-rmg-guide") {
      post = {
        title: "How to Accurately Calculate Knit Fabric Consumption (kg/Dozen) for T-Shirts & Polos",
        excerpt:
          "Master the exact mathematical formulas used by export merchandising teams to forecast fabric yield, prevent cutting floor wastage, and secure optimal yarn procurement.",
        content: `
### The Core Economics of Knitwear Sourcing

Fabric makes up **60% to 70% of the FOB (Free on Board) cost** of any knitted garment. A miscalculation of even 0.20 kg per dozen across a 50,000-piece production run results in either thousands of dollars in surplus fabric waste or devastating shortage delays during cutting.

Whether you are placing an OEM order with **Apparel Emporium (aelbd.net)** or developing your first private label collection, understanding the consumption mathematics guarantees fair factory pricing and transparent costing.

---

### The Standard Metric Formula for Basic T-Shirts

In Bangladesh and global export hubs, knit fabric consumption is universally quoted in **kilograms per dozen (kg/dz)**. 

The universal formula based on metric measurements (centimeters) is:

$$\\text{Consumption (kg/dz)} = \\frac{(\\text{Body Length} + \\text{Seam Allowance}) + (\\text{Sleeve Length} + \\text{Seam Allowance}) \\times (\\text{1/2 Chest} + \\text{Seam}) \\times 2 \\times \\text{GSM} \\times 12}{10,000,000} \\times (1 + \\frac{\\text{Wastage \\%}}{100})$$

#### Key Parameter Breakdown:
1. **Body Length:** High Point Shoulder (HPS) to bottom hem. For an adult Men's Medium, this is typically 72 cm + 6 cm hem allowance = 78 cm.
2. **Sleeve Length:** Shoulder seam to sleeve opening. Typical M size is 22 cm + 4 cm allowance = 26 cm.
3. **1/2 Chest Width:** Pit-to-pit measurement. Typically 54 cm + 4 cm seam allowance = 58 cm.
4. **GSM (Grams per Square Meter):** Standard single jersey t-shirt weight is 180 GSM.
5. **Process Wastage Allowance:** 
   - Solid reactive colors: 7% - 9%
   - Yarn dyed stripes: 10% - 12%
   - Rotary All-Over Print (AOP): 12% - 15%

---

### Step-by-Step Calculation Example

Let us calculate a 100% Cotton 180 GSM Men's T-Shirt with 8% cutting and process loss:

1. **Total Length:** 78 cm (Body) + 26 cm (Sleeve) = 104 cm
2. **Width Factor:** 58 cm (1/2 Chest) × 2 = 116 cm
3. **Area per Piece:** 104 cm × 116 cm = 12,064 cm²
4. **Net Weight per Piece:** 12,064 × 180 GSM ÷ 10,000 = 217.15 grams
5. **With 8% Wastage:** 217.15 × 1.08 = 234.52 grams gross per piece
6. **Per Dozen Consumption:** 234.52 grams × 12 ÷ 1,000 = **2.81 kg / dozen**

---

### How to Apply This to Manufacturing Tech Packs

When submitting your Request for Quotation (RFQ) to Apparel Emporium:
- Provide your graded spec sheet (S, M, L, XL, XXL).
- The merchandising team computes weighted ratio consumption based on your size breakdown (e.g., 1:2:2:1 ratio).
- This ensures maximum marker efficiency on automated GERBER cutting tables, saving raw material costs that are directly passed to your brand.
        `,
        author: "Apparel Emporium Merchandising Team",
        category: "Fabric Engineering",
        tags: "Fabric Consumption, Merchandising, Knitwear, Apparel Emporium",
        readingTime: 6,
        createdAt: new Date().toISOString(),
      };
    } else {
      notFound();
    }
  }

  // Extract products if available
  const featuredProducts = post.featuredProducts
    ? post.featuredProducts.map((fp: any) => fp.product)
    : [];

  // Schema.org Article Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author || "Apparel Emporium",
      url: "https://aelbd.net",
    },
    publisher: {
      "@type": "Organization",
      name: "ZYMI RMG Hub",
      logo: {
        "@type": "ImageObject",
        url: "https://zymi.it/logo.png",
      },
    },
    datePublished: post.createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zymi.it/blog/${post.slug}`,
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-6">
        {/* Navigation Back */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Back to Insights</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
            <span className="font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              {post.category || "Manufacturing Intelligence"}
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="text-slate-400" /> {post.readingTime || 5} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FaUser className="text-slate-400" /> By {post.author}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Content Body */}
        <div className="bg-white rounded-2xl p-6 sm:p-12 border border-slate-200 shadow-xs">
          <div
            className="prose prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-indigo-600 max-w-none text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/### (.*?)\n/g, '<h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">$1</h3>')
                .replace(/#### (.*?)\n/g, '<h4 class="text-base font-bold text-slate-800 mt-4 mb-2">$1</h4>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
                .replace(/\n\n/g, '<p class="my-4 text-slate-700 leading-relaxed"></p>')
            }}
          />

          {/* Embedded Recommended Products */}
          {featuredProducts.length > 0 && (
            <BlogProductRecommendation products={featuredProducts} />
          )}

          {/* Tags */}
          {post.tags && (
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-2">
                <FaTag /> Tags:
              </span>
              {post.tags.split(",").map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-lg"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom B2B Factory Direct CTA */}
        <B2BFactoryCTA
          title="Put this Manufacturing Guide into Practice with Apparel Emporium"
          subtitle="Looking for reliable production partners? Apparel Emporium (aelbd.net) operates certified circular knit and apparel manufacturing facilities with low MOQ, in-house lab dipping, and fast export turnaround."
        />
      </article>
    </div>
  );
}

