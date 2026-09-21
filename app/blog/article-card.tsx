import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import { formatDate, type Article } from "../../lib/blog-content";

export function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <article className={`blog-card${featured ? " blog-card-featured" : ""}`}>
      <Link href={`/blog/${article.slug}/`} className="blog-card-link">
        <div className={`blog-card-art${article.cover ? " has-cover" : ""}`}>
          {article.cover ? (
            <Image
              src={article.cover.url}
              alt={article.cover.alternativeText}
              fill
              sizes={
                featured
                  ? "(max-width: 700px) 100vw, 50vw"
                  : "(max-width: 700px) 100vw, 33vw"
              }
              priority={featured}
            />
          ) : (
            <div className="blog-cover-placeholder" aria-hidden="true">
              <span className="cover-bracket">{"{"}</span>
              <Code2 strokeWidth={1.2} />
              <span className="cover-bracket">{"}"}</span>
              <span className="cover-caption">ideas, put into practice.</span>
            </div>
          )}
          {featured && (
            <span className="blog-featured-label">Featured article</span>
          )}
        </div>
        <div className="blog-card-copy">
          <div className="blog-meta">
            <span className="blog-category">{article.category}</span>
            <span>{article.readingTime} min read</span>
          </div>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
          <div className="blog-card-bottom">
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            <span>
              Read article
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
