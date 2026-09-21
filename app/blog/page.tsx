import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Asterisk, PenLine } from "lucide-react";
import { getArticles } from "../../lib/strapi";
import { site } from "../site";
import { ArticleCard } from "./article-card";

const title = "Blog";
const description =
  "Notes on software engineering, building products, AI, and the things learned along the way. By Ghassen Jemiai.";
const url = new URL("blog/", site.url).href;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    title: `${title} | ${site.name}`,
    description,
    url,
    images: [
      { url: new URL("social-banner.png", site.url).href, alt: site.imageAlt },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${site.name}`,
    description,
    images: [new URL("social-banner.png", site.url).href],
  },
};

export default async function BlogPage() {
  const articles = await getArticles();
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const remaining = articles.filter(
    (article) => article.slug !== featured?.slug,
  );
  return (
    <main id="main-content" className="container blog-main" tabIndex={-1}>
      <section className="blog-intro" aria-labelledby="blog-title">
        <div>
          <p className="section-label">
            <span className="status-dot" />
            The blog
          </p>
          <h1 id="blog-title">
            Notes from
            <br />
            <span>the workbench.</span>
          </h1>
          <p className="blog-intro-copy">
            On building software, figuring things out, and sharing what I learn
            along the way.
          </p>
        </div>
        <div className="blog-intro-art" aria-hidden="true">
          <Asterisk strokeWidth={1} />
          <span>build. learn. write. repeat.</span>
        </div>
      </section>
      {featured ? (
        <section className="blog-articles" aria-label="Articles">
          <div className="blog-section-heading">
            <p className="section-label">A few things worth sharing</p>
            <span>
              {articles.length} {articles.length === 1 ? "article" : "articles"}
            </span>
          </div>
          <ArticleCard article={featured} featured />
          {remaining.length > 0 && (
            <div className="blog-grid">
              {remaining.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="blog-empty" aria-labelledby="empty-title">
          <span className="blog-empty-icon">
            <PenLine size={27} strokeWidth={1.4} aria-hidden="true" />
          </span>
          <p className="section-label">A fresh page</p>
          <h2 id="empty-title">Good things take a little writing.</h2>
          <p>
            The first notes are on their way. In the meantime, take a look at
            what I’m building.
          </p>
          <Link href="/#projects" className="text-link">
            Explore my projects
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </section>
      )}
      <aside className="blog-signoff">
        <div>
          <h2>Have something to add?</h2>
          <p>The best ideas usually start with a conversation.</p>
        </div>
        <Link href="/#contact" className="text-link">
          Let’s talk
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </aside>
    </main>
  );
}
