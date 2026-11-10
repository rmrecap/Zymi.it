import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getMarkdownForPath } from "./utils/getMarkdownForPath";

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // 1. Content Negotiation: Check for Accept: text/markdown or ?format=md
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

    // 2. Check for admin routes
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
