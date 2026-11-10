import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.FRONTEND_URL || "https://zymi.it";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/shop",
          "/shop/*",
          "/b2b-apparel",
          "/blog",
          "/blog/*",
          "/tools",
          "/tools/*",
          "/product/*",
          "/search",
        ],
        disallow: [
          "/admin",
          "/admin/*",
          "/zymi-admin-gate",
          "/zymi-admin-gate/*",
          "/api/",
          "/cart",
          "/checkout",
          "/login",
          "/register",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/shop", "/b2b-apparel", "/blog", "/tools/*", "/product/*"],
        disallow: ["/admin/", "/zymi-admin-gate", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/zymi-admin-gate", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
