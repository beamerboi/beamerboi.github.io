export type Block = {
  type: string;
  text?: string;
  children?: Block[];
  level?: number;
  format?: string;
  url?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  image?: BlogImage;
};

export type BlogImage = {
  url: string;
  alternativeText: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type Article = {
  title: string;
  slug: string;
  excerpt: string;
  content: Block[];
  cover: BlogImage | null;
  author: string;
  category: string;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  seoTitle?: string;
  seoDescription?: string;
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function textContent(blocks: Block[]): string {
  return blocks
    .map((block) => block.text ?? textContent(block.children ?? []))
    .join(" ");
}

// All CMS links and media pass through a protocol allowlist before rendering.
export function safeLink(value: string): string | undefined {
  const href = value.trim();
  if (
    Array.from(href).some(
      (character) =>
        character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127,
    )
  )
    return;
  if (
    href.startsWith("#") ||
    (/^\/(?![/\\])/.test(href) && !href.includes("\\"))
  )
    return href;
  try {
    const url = new URL(href);
    if (["https:", "http:", "mailto:", "tel:"].includes(url.protocol))
      return href;
  } catch {
    return;
  }
}

export function mediaUrl(value: string, strapiUrl: string): string | undefined {
  try {
    const url = new URL(value, `${strapiUrl.replace(/\/+$/, "")}/`);
    if (
      ["https:", "http:"].includes(url.protocol) &&
      !url.username &&
      !url.password
    )
      return url.href;
  } catch {
    return;
  }
}

function unwrap(value: unknown): Record<string, unknown> | null {
  if (!isRecord(value)) return null;
  if ("data" in value) return unwrap(value.data);
  return isRecord(value.attributes) ? value.attributes : value;
}

function optionalText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function imageFrom(value: unknown, baseUrl: string): BlogImage | null {
  const data = unwrap(value);
  if (!data || typeof data.url !== "string") return null;
  const url = mediaUrl(data.url, baseUrl);
  if (!url) throw new Error("Article media must use an HTTP or HTTPS URL.");
  return {
    url,
    alternativeText: optionalText(data.alternativeText) ?? "",
    caption: optionalText(data.caption),
    width:
      typeof data.width === "number" && data.width > 0 ? data.width : undefined,
    height:
      typeof data.height === "number" && data.height > 0
        ? data.height
        : undefined,
  };
}

const supportedBlocks = new Set([
  "text",
  "paragraph",
  "heading",
  "list",
  "list-item",
  "link",
  "quote",
  "code",
  "image",
]);

function parseBlocks(value: unknown, baseUrl: string, depth = 0): Block[] {
  if (!Array.isArray(value) || depth > 30) {
    throw new Error('Article "content" must be Strapi Rich text (Blocks).');
  }
  return value.map((node) => {
    if (
      !isRecord(node) ||
      typeof node.type !== "string" ||
      !supportedBlocks.has(node.type)
    ) {
      throw new Error('Article "content" contains an unsupported block type.');
    }
    return {
      type: node.type,
      text: typeof node.text === "string" ? node.text : undefined,
      children:
        node.children === undefined
          ? undefined
          : parseBlocks(node.children, baseUrl, depth + 1),
      level: typeof node.level === "number" ? node.level : undefined,
      format: optionalText(node.format),
      url: typeof node.url === "string" ? safeLink(node.url) : undefined,
      bold: node.bold === true,
      italic: node.italic === true,
      underline: node.underline === true,
      strikethrough: node.strikethrough === true,
      code: node.code === true,
      image: imageFrom(node.image, baseUrl) ?? undefined,
    };
  });
}

export function parseArticle(value: unknown, baseUrl: string): Article | null {
  const data = unwrap(value);
  if (!data) throw new Error("Invalid Strapi article response.");
  // An extra publication check prevents drafts from being exported.
  if (data.publishedAt === null) return null;
  const title = optionalText(data.title);
  const slug = optionalText(data.slug);
  if (!title || !slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      "Each published article needs a title and a lowercase, hyphenated slug.",
    );
  }
  const publishedAt = optionalText(data.publishedAt);
  if (!publishedAt || !Number.isFinite(Date.parse(publishedAt))) {
    throw new Error(
      `Article "${slug}" needs a valid publishedAt date. Enable Draft & Publish in Strapi.`,
    );
  }
  const content = parseBlocks(data.content, baseUrl);
  if (!content.length) throw new Error(`Article "${slug}" has no content.`);
  const plainText = textContent(content).trim();
  const updatedAt = optionalText(data.updatedAt);
  return {
    title,
    slug,
    excerpt:
      optionalText(data.excerpt) ??
      `${plainText.slice(0, 180)}${plainText.length > 180 ? "…" : ""}`,
    content,
    cover: imageFrom(data.cover, baseUrl),
    author: optionalText(data.author) ?? "Ghassen Jemiai",
    category: optionalText(data.category) ?? "Engineering",
    featured: data.featured === true,
    publishedAt: new Date(publishedAt).toISOString(),
    updatedAt:
      updatedAt && Number.isFinite(Date.parse(updatedAt))
        ? new Date(updatedAt).toISOString()
        : new Date(publishedAt).toISOString(),
    readingTime: Math.max(
      1,
      Math.ceil(plainText.split(/\s+/).filter(Boolean).length / 220),
    ),
    seoTitle: optionalText(data.seoTitle),
    seoDescription: optionalText(data.seoDescription),
  };
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
