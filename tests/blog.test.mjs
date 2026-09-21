import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

// Exercise the actual TypeScript parser without adding a test runtime dependency.
const source = await readFile(
  new URL("../lib/blog-content.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const { parseArticle, safeLink, mediaUrl, formatDate } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);

const base = "https://cms.example.com";
const article = {
  title: "Shipping software",
  slug: "shipping-software",
  excerpt: "Notes on shipping.",
  publishedAt: "2026-09-20T23:30:00.000Z",
  updatedAt: "2026-09-21T09:00:00.000Z",
  content: [
    {
      type: "paragraph",
      children: [{ type: "text", text: "Hello, world.", bold: true }],
    },
  ],
  cover: {
    url: "/uploads/cover.png",
    alternativeText: "A diagram",
    width: 1200,
    height: 800,
  },
};

test("Strapi v5 and v4 normalize to the same article and absolute media URL", () => {
  const v5 = parseArticle(
    { id: 1, documentId: "article-one", ...article },
    base,
  );
  const v4 = parseArticle(
    {
      id: 1,
      attributes: {
        ...article,
        cover: { data: { id: 2, attributes: article.cover } },
      },
    },
    base,
  );
  assert.deepEqual(v5, v4);
  assert.equal(v5.cover.url, "https://cms.example.com/uploads/cover.png");
  assert.equal(v5.readingTime, 1);
  assert.equal(v5.author, "Ghassen Jemiai");
  assert.equal(v5.content[0].children[0].bold, true);
});

test("drafts never normalize to publishable articles", () => {
  assert.equal(parseArticle({ ...article, publishedAt: null }, base), null);
});

test("missing schema fields and malformed routes fail clearly", () => {
  for (const slug of [
    "../private",
    "hello/world",
    "__empty",
    "HELLO",
    "hello?draft=1",
  ]) {
    assert.throws(() => parseArticle({ ...article, slug }, base), /slug/);
  }
  assert.throws(
    () => parseArticle({ ...article, content: "Markdown is not Blocks" }, base),
    /Blocks/,
  );
  assert.throws(
    () => parseArticle({ ...article, content: [] }, base),
    /no content/,
  );
  assert.throws(
    () => parseArticle({ ...article, publishedAt: undefined }, base),
    /publishedAt/,
  );
  assert.throws(
    () => parseArticle({ ...article, content: [{ type: "raw-html" }] }, base),
    /unsupported/,
  );
});

test("unsafe CMS links and media cannot execute scripts", () => {
  for (const url of [
    "javascript:alert(1)",
    "java\nscript:alert(1)",
    "data:text/html,test",
    "//evil.example",
    "/\\evil.example",
  ]) {
    assert.equal(safeLink(url), undefined);
  }
  for (const url of [
    "https://example.com",
    "mailto:hello@example.com",
    "tel:+390123",
    "/blog/",
    "#heading",
  ]) {
    assert.equal(safeLink(url), url);
  }
  assert.equal(mediaUrl("javascript:alert(1)", base), undefined);
  assert.equal(mediaUrl("https://secret@example.com/img.png", base), undefined);
  const parsed = parseArticle(
    {
      ...article,
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "javascript:alert(1)",
              children: [{ type: "text", text: "Unsafe link" }],
            },
          ],
        },
      ],
    },
    base,
  );
  assert.equal(parsed.content[0].children[0].url, undefined);
});

test("rich text images, absent covers, reading time and UTC dates are handled", () => {
  const parsed = parseArticle(
    {
      ...article,
      cover: { data: null },
      excerpt: null,
      content: [
        {
          type: "paragraph",
          children: [{ type: "text", text: "word ".repeat(441) }],
        },
        {
          type: "image",
          image: { url: "/uploads/body.png", alternativeText: "Body image" },
          children: [{ type: "text", text: "" }],
        },
      ],
    },
    base,
  );
  assert.equal(parsed.cover, null);
  assert.equal(parsed.readingTime, 3);
  assert.equal(
    parsed.content[1].image.url,
    "https://cms.example.com/uploads/body.png",
  );
  assert.ok(parsed.excerpt.endsWith("…"));
  assert.equal(formatDate(article.publishedAt), "Sep 20, 2026");
});
