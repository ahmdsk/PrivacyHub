import type { MetadataRoute } from "next";
import { listSlugs } from "../lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const [privacy, terms] = await Promise.all([
    listSlugs("privacy"),
    listSlugs("terms"),
  ]);

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/terms`, lastModified: new Date() },
    ...privacy.map((s) => ({
      url: `${base}/privacy/${s}`,
      lastModified: new Date(),
    })),
    ...terms.map((s) => ({
      url: `${base}/terms/${s}`,
      lastModified: new Date(),
    })),
  ];
}
