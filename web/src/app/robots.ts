import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.alira.live/sitemap.xml",
    host: "https://www.alira.live",
  };
}
