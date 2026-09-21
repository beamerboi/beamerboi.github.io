import "server-only";
import { cache } from "react";
import { unstable_rethrow } from "next/navigation";
import { isRecord, parseArticle, type Article } from "./blog-content";

export const getArticles = cache(async (): Promise<Article[]> => {
  const baseUrl = process.env.STRAPI_URL?.trim().replace(/\/+$/, "");
  if (!baseUrl) {
    if (process.env.STRAPI_API_TOKEN?.trim())
      throw new Error("STRAPI_API_TOKEN is set but STRAPI_URL is missing.");
    return [];
  }
  let base: URL;
  try {
    base = new URL(baseUrl);
  } catch {
    throw new Error("STRAPI_URL must be an absolute HTTP or HTTPS base URL.");
  }
  if (
    !["https:", "http:"].includes(base.protocol) ||
    base.username ||
    base.password ||
    base.search ||
    base.hash
  ) {
    throw new Error(
      "STRAPI_URL must be an HTTP or HTTPS base URL without credentials, query parameters, or a fragment.",
    );
  }
  const version = process.env.STRAPI_API_VERSION?.trim() || "5";
  if (version !== "4" && version !== "5")
    throw new Error("STRAPI_API_VERSION must be 4 or 5.");
  const path = process.env.STRAPI_ARTICLES_PATH?.trim() || "/api/articles";
  if (!/^\/api\/[a-z0-9-]+$/.test(path))
    throw new Error("STRAPI_ARTICLES_PATH must look like /api/articles.");
  const token = process.env.STRAPI_API_TOKEN?.trim();
  const articles: Article[] = [];
  const slugs = new Set<string>();
  let page = 1;
  let pageCount = 1;
  do {
    const url = new URL(`${baseUrl}${path}`);
    url.searchParams.set(
      version === "4" ? "publicationState" : "status",
      version === "4" ? "live" : "published",
    );
    url.searchParams.set("sort[0]", "publishedAt:desc");
    url.searchParams.set("sort[1]", "slug:asc");
    url.searchParams.set("populate[0]", "cover");
    url.searchParams.set("pagination[page]", String(page));
    url.searchParams.set("pagination[pageSize]", "100");
    url.searchParams.set("pagination[withCount]", "true");
    const locale = process.env.STRAPI_LOCALE?.trim();
    if (locale) url.searchParams.set("locale", locale);
    let response: Response;
    try {
      response = await fetch(url, {
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(15_000),
      });
    } catch (error) {
      unstable_rethrow(error);
      throw new Error(
        "Could not reach Strapi. Check STRAPI_URL, HTTPS, and network access from the build environment.",
      );
    }
    if (!response.ok) {
      throw new Error(
        `Strapi returned HTTP ${response.status}. Check the Article endpoint, API token permissions, and configured fields. The build stopped to preserve the deployed blog.`,
      );
    }
    let result: unknown;
    try {
      result = await response.json();
    } catch {
      throw new Error(
        "Strapi returned invalid JSON. Check STRAPI_URL and the Article endpoint.",
      );
    }
    if (
      !isRecord(result) ||
      !Array.isArray(result.data) ||
      !isRecord(result.meta) ||
      !isRecord(result.meta.pagination)
    ) {
      throw new Error(
        "Strapi must return a collection with data and meta.pagination.",
      );
    }
    const pagination = result.meta.pagination;
    if (
      typeof pagination.pageCount !== "number" ||
      !Number.isSafeInteger(pagination.pageCount) ||
      pagination.pageCount < 0 ||
      pagination.page !== page
    ) {
      throw new Error("Strapi returned invalid pagination metadata.");
    }
    pageCount = pagination.pageCount;
    for (const entry of result.data) {
      const article = parseArticle(entry, baseUrl);
      if (!article) continue;
      if (slugs.has(article.slug))
        throw new Error(
          `Duplicate article slug "${article.slug}". Slugs must be unique.`,
        );
      slugs.add(article.slug);
      articles.push(article);
    }
    if (!result.data.length && page < pageCount)
      throw new Error(
        "Strapi returned an empty page before the end of the collection.",
      );
    page++;
  } while (page <= pageCount);
  return articles.sort(
    (a, b) =>
      Date.parse(b.publishedAt) - Date.parse(a.publishedAt) ||
      a.slug.localeCompare(b.slug),
  );
});

export async function getArticle(slug: string) {
  return (await getArticles()).find((article) => article.slug === slug);
}
