import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, ".blog-test-output");
const token = "blog-fixture-token-must-never-be-exported";
const seenPages = new Set();
const requests = [];
const richText = [
  {
    type: "heading",
    level: 2,
    children: [{ type: "text", text: "Start with the useful part" }],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "text",
        text: "A practical note about building software. ",
        bold: true,
      },
      {
        type: "link",
        url: "javascript:alert(1)",
        children: [
          { type: "text", text: "An unsafe link becomes plain text." },
        ],
      },
    ],
  },
  {
    type: "list",
    format: "unordered",
    children: [
      {
        type: "list-item",
        children: [{ type: "text", text: "Keep the feedback loop short." }],
      },
      {
        type: "list-item",
        children: [{ type: "text", text: "Write down what you learn." }],
      },
    ],
  },
  {
    type: "code",
    children: [
      { type: "text", text: "const answer = " },
      { type: "text", text: "42;\nconsole.log(answer);" },
    ],
  },
  {
    type: "quote",
    children: [{ type: "text", text: "Make it work, then make it clear." }],
  },
  {
    type: "paragraph",
    children: [{ type: "text", text: "<script>alert('text-only')</script>" }],
  },
];
const items = [
  {
    title: "Building small, shipping often",
    slug: "building-small-shipping-often",
    category: "Engineering",
    featured: true,
  },
  {
    title: "Notes on practical AI",
    slug: "notes-on-practical-ai",
    category: "AI",
  },
  {
    title: "A better feedback loop",
    slug: "a-better-feedback-loop",
    category: "Product",
  },
].map((item, index) => ({
  id: index + 1,
  documentId: `fixture-${index}`,
  ...item,
  excerpt:
    "A few lessons from turning an idea into something useful, one small release at a time.",
  content: richText,
  author: "Ghassen Jemiai",
  publishedAt: `2026-09-${21 - index}T10:00:00.000Z`,
  updatedAt: "2026-09-21T11:00:00.000Z",
  seoTitle: `${item.title} — field notes`,
  cover:
    index === 0
      ? {
          url: "/fixture-cover.png",
          alternativeText: "Blue, lavender and lime building blocks",
          width: 1200,
          height: 630,
        }
      : null,
}));

const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/fixture-cover.png") {
    res.setHeader("Content-Type", "image/png");
    res.end(await readFile(path.join(root, "public/social-banner.png")));
    return;
  }
  if (
    url.pathname !== "/api/articles" ||
    req.headers.authorization !== `Bearer ${token}`
  ) {
    res.writeHead(401).end();
    return;
  }
  const page = Number(url.searchParams.get("pagination[page]"));
  seenPages.add(page);
  requests.push(url.searchParams);
  // Simulate a Strapi instance that caps page size below the requested size.
  const data =
    page === 1
      ? items.slice(0, 2)
      : [
          items[2],
          {
            ...items[0],
            slug: "private-draft",
            title: "PRIVATE-DRAFT-DO-NOT-EXPORT",
            publishedAt: null,
          },
        ];
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      data,
      meta: { pagination: { page, pageSize: 2, pageCount: 2, total: 4 } },
    }),
  );
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const apiUrl = `http://127.0.0.1:${server.address().port}`;

try {
  const child = spawn(
    process.execPath,
    [path.join(root, "node_modules/next/dist/bin/next"), "build"],
    {
      cwd: root,
      stdio: "inherit",
      env: {
        ...process.env,
        BLOG_BUILD_CHECK: "true",
        STRAPI_URL: apiUrl,
        STRAPI_API_TOKEN: token,
        STRAPI_API_VERSION: "5",
        STRAPI_ARTICLES_PATH: "/api/articles",
        STRAPI_LOCALE: "",
        GITHUB_ACTIONS: "true",
        GITHUB_REPOSITORY: "beamerboi/portfolio-check",
        SITE_URL: "https://example.com/portfolio-check",
      },
    },
  );
  const code = await new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", resolve);
  });
  assert.equal(code, 0, "The configured static blog build must succeed");
  assert.deepEqual([...seenPages].sort(), [1, 2]);
  for (const query of requests) {
    assert.equal(query.get("status"), "published");
    assert.equal(query.get("populate[0]"), "cover");
  }
  const index = await readFile(path.join(output, "blog/index.html"), "utf8");
  for (const item of items)
    assert.ok(index.includes(`/portfolio-check/blog/${item.slug}/`));
  const detail = await readFile(
    path.join(output, "blog/building-small-shipping-often/index.html"),
    "utf8",
  );
  assert.ok(
    detail.includes(
      'rel="canonical" href="https://example.com/portfolio-check/blog/building-small-shipping-often/"',
    ),
  );
  assert.ok(detail.includes('property="og:type" content="article"'));
  assert.ok(detail.includes('"@type":"BlogPosting"'));
  assert.ok(detail.includes("<h2>Start with the useful part</h2>"));
  assert.ok(detail.includes("const answer = 42;\nconsole.log(answer);"));
  assert.ok(detail.includes("&lt;script&gt;"));
  assert.ok(!detail.includes('href="javascript:'));
  const sitemap = await readFile(path.join(output, "sitemap.xml"), "utf8");
  for (const item of items)
    assert.ok(
      sitemap.includes(
        `https://example.com/portfolio-check/blog/${item.slug}/`,
      ),
    );
  const files = await readdir(output, { recursive: true });
  assert.ok(!files.some((name) => name.includes("private-draft")));
  for (const file of files.filter((name) =>
    /\.(html|js|json|txt|xml)$/.test(name),
  )) {
    const body = await readFile(path.join(output, file), "utf8");
    assert.ok(!body.includes(token), `Private token was exported in ${file}`);
    assert.ok(
      !body.includes("PRIVATE-DRAFT-DO-NOT-EXPORT"),
      `Draft was exported in ${file}`,
    );
  }
  console.log(
    "Blog export passed: pagination, published-only pages, rich text, metadata, subpaths, sitemap, and no leaked token.",
  );
} finally {
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
}
