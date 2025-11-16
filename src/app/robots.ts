import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.chloemary.com";
  const isProduction = process.env.NODE_ENV === "production";

  // Block everything in development/staging
  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  // Production rules
  return {
    rules: [
      // General rules for all search engines
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // Block API endpoints
          "/admin/", // Block admin areas
          "/_next/", // Block Next.js internals
          "/private/", // Block private content
          "/404", // Block error pages
          "/500",
          "/welcome", // Block welcome page (noindex page)
        ],
        crawlDelay: 1, // Be respectful to your server
      },
      // Give Google special treatment
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/welcome",
        ],
        // No crawl delay for Google
      },
      // Block resource-draining bots
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "GPTBot",
          "ChatGPT-User",
          "GPTBot-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

