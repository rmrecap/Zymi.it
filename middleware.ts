import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getMarkdownForPath } from "./utils/getMarkdownForPath";
import { mcpServerCard } from "./utils/mcpServerCard";

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // 0. Immediate pass-through for Next.js internal React Server Component (RSC) & prefetch requests
    if (
      req.nextUrl.searchParams.has("_rsc") ||
      req.headers.get("rsc") === "1" ||
      req.headers.get("next-router-prefetch") === "1"
    ) {
      return NextResponse.next();
    }

    // 1. Serve MCP Server Card (SEP-1649)
    if (
      pathname === "/.well-known/mcp/server-card.json" ||
      pathname === "/.well-known/mcp/server-card"
    ) {
      return NextResponse.json(mcpServerCard, {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    }

    // 2. Content Negotiation: Check for Accept: text/markdown or ?format=md
    const acceptHeader = req.headers.get("accept") || "";
    const formatParam = req.nextUrl.searchParams.get("format");
    const wantsMarkdown =
      acceptHeader.includes("text/markdown") ||
      acceptHeader.includes("text/x-markdown") ||
      formatParam === "md" ||
      formatParam === "markdown";

    if (wantsMarkdown) {
      const markdown = getMarkdownForPath(pathname);
      return new NextResponse(markdown, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Vary": "Accept",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    }

    // 3. Check for admin routes
    if (pathname.startsWith("/admin")) {
      if (req.nextauth.token?.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Next.js RSC and prefetch requests should always be authorized through
        if (
          req.nextUrl.searchParams.has("_rsc") ||
          req.headers.get("rsc") === "1" ||
          req.headers.get("next-router-prefetch") === "1"
        ) {
          return true;
        }
        // Admin routes require admin token
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token && token.role === "admin";
        }
        // Public routes are accessible to all visitors and AI crawlers
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - metadata static files (favicon.ico, sitemap.xml, robots.txt, llms.txt, llms-full.txt)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|llms-full.txt).*)",
  ],
};
