import React from "react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/utils/db";
import { Metadata } from "next";
import { FaBookOpen, FaClock, FaCalendar, FaArrowRight, FaIndustry } from "react-icons/fa6";
import B2BFactoryCTA from "@/components/B2BFactoryCTA";

export const metadata: Metadata = {
  title: "RMG Industry Insights & Apparel Sourcing Blog | ZYMI & Apparel Emporium",
  description:
    "Expert apparel manufacturing guides, fabric engineering insights, export compliance trends, and fashion merchandising strategies by Apparel Emporium (aelbd.net).",
};

export default async function BlogIndexPage() {
  // Fetch posts from database with silent fallback if MySQL is offline
  let posts: any[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 12,
    });
  } catch {
    // Database offline/unreachable; fallback smoothly to default articles without triggering dev overlay
    posts = [];
  }

  // Fallback demo articles if db has not been populated yet
  if (posts.length === 0) {
    posts = [
      {
        id: "1",
        slug: "how-to-calculate-knit-fabric-consumption-rmg-guide",
        title: "How to Accurately Calculate Knit Fabric Consumption (kg/Dozen) for T-Shirts & Polos",
        excerpt:
          "Master the exact mathematical formulas used by export merchandising teams to forecast fabric yield, prevent cutting floor wastage, and secure optimal yarn procurement.",
        coverImage: "/blog_consumption.jpg",
        category: "Fabric Engineering",
        author: "Apparel Emporium Merchandising Team",
        readingTime: 6,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        slug: "apparel-emporium-circular-knitwear-manufacturing-guide",
        title: "Inside Apparel Emporium's Circular Knitting & Sustainable RMG Export Facility",
        excerpt:
          "A behind-the-scenes look at how certified manufacturing in Bangladesh (aelbd.net) executes private label tech-packs with OEKO-TEX compliance and low MOQ flexibility.",
        coverImage: "/blog_factory.jpg",
        category: "Manufacturing Hub",
        author: "Sourcing Director",
        readingTime: 8,
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        slug: "yarn-count-selection-gsm-optimization-fashion-brands",
        title: "Yarn Count Selection & GSM Optimization: The Ultimate Guide for Apparel Startups",
        excerpt:
          "From 20s heavy fleece to 40s luxury combed single jersey, understand how yarn numbering (Ne, Nm, Tex) dictates hand-feel, drape, and unit costing.",
        coverImage: "/blog_yarn.jpg",
        category: "Technical Sourcing",
        author: "Textile Engineer",
        readingTime: 5,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Apparel Emporium Editorial & SEO Engine
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
            RMG Industry Insights & <br />
            <span className="bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">
              Garment Manufacturing Intelligence
            </span>
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-4 leading-relaxed">
            In-depth guides on fabric sourcing, costing formulas, international export standards, and global fashion supply chain optimization.
          </p>
        </div>

        {/* Featured Post Card */}
        {posts[0] && (
          <div className="mb-12 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-5 relative h-64 md:h-auto bg-slate-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <FaIndustry className="text-5xl text-amber-400 mx-auto mb-3" />
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">
                    Featured Editorial
                  </span>
                </div>
              </div>
              <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      {posts[0].category || "Manufacturing"}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="text-slate-400" /> {posts[0].readingTime || 5} min read
                    </span>
                  </div>

                  <Link href={`/blog/${posts[0].slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 hover:text-indigo-600 transition-colors">
                      {posts[0].title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed line-clamp-3">
                    {posts[0].excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">
                    By {posts[0].author || "Apparel Emporium Team"}
                  </span>
                  <Link
                    href={`/blog/${posts[0].slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                  >
                    <span>Read Full Guide</span>
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {posts.slice(1).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 p-6 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-3">
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {post.category || "Industry Insights"}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <FaClock className="text-slate-400" /> {post.readingTime || 5}m
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[11px] text-slate-400">
                  {post.author || "Editorial"}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1"
                >
                  <span>Read</span>
                  <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* B2B Factory CTA */}
        <B2BFactoryCTA
          title="Turn Sourcing Insights into Production Reality"
          subtitle="Apparel Emporium (aelbd.net) handles end-to-end fabric knitting, precision dyeing, cutting, assembly, and global container export with low MOQ and certified compliance."
        />
      </div>
    </div>
  );
}

