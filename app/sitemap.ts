import type { MetadataRoute } from "next";
import { site } from "./site";
import { getArticles } from "../lib/strapi";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  return [
    { url: site.url.href },
    { url: new URL("blog/", site.url).href },
    ...articles.map((article) => ({
      url: new URL(`blog/${article.slug}/`, site.url).href,
      lastModified: article.updatedAt,
    })),
  ];
}
