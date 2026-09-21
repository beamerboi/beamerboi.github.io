import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getArticle, getArticles } from "../../../lib/strapi";
import { formatDate } from "../../../lib/blog-content";
import { site } from "../../site";
import { ArticleBlocks } from "../blocks";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getArticles();
  // Next's static exporter requires at least one param. This reserved value
  // resolves to a noindex 404 fallback when the CMS is empty.
  return articles.length
    ? articles.map(({ slug }) => ({ slug }))
    : [{ slug: "__empty" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.excerpt;
  const url = new URL(`blog/${article.slug}/`, site.url).href;
  const image = article.cover ?? {
    url: new URL("social-banner.png", site.url).href,
    alternativeText: site.imageAlt,
  };
  return {
    title,
    description,
    authors: [{ name: article.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      images: [{ url: image.url, alt: image.alternativeText }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image.url, alt: image.alternativeText }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  const url = new URL(`blog/${article.slug}/`, site.url).href;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author,
      ...(article.author === site.name ? { url: site.url.href } : {}),
    },
    mainEntityOfPage: url,
    url,
    image: article.cover?.url ?? new URL("social-banner.png", site.url).href,
  };
  return (
    <main id="main-content" className="container article-main" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Link href="/blog/" className="article-back">
        <ArrowLeft size={16} aria-hidden="true" />
        All articles
      </Link>
      <article>
        <header className="article-header">
          <div className="blog-meta">
            <span className="blog-category">{article.category}</span>
            <span>{article.readingTime} min read</span>
          </div>
          <h1>{article.title}</h1>
          <p className="article-excerpt">{article.excerpt}</p>
          <div className="article-byline">
            <span className="article-avatar" aria-hidden="true">
              {article.author
                .split(/\s+/)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")}
            </span>
            <div>
              <span>{article.author}</span>
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            </div>
          </div>
        </header>
        {article.cover && (
          <figure className="article-cover">
            <Image
              src={article.cover.url}
              alt={article.cover.alternativeText}
              width={article.cover.width ?? 1200}
              height={article.cover.height ?? 675}
              sizes="(max-width: 1000px) 100vw, 1000px"
              priority
            />
            {article.cover.caption && (
              <figcaption>{article.cover.caption}</figcaption>
            )}
          </figure>
        )}
        <ArticleBlocks content={article.content} />
        <footer className="article-end">
          <p>Thanks for reading.</p>
          <Link href="/blog/" className="text-link">
            More from the workbench
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </footer>
      </article>
    </main>
  );
}
