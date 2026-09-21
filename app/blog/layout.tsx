import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogThemeToggle } from "./theme-toggle";
import "./blog.css";

// The CMS is read afresh at build time; GitHub Pages serves the exported HTML.
export const dynamic = "force-static";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header" id="top">
        <div className="container header-inner blog-header">
          <Link
            href="/"
            className="wordmark"
            aria-label="Ghassen Jemiai — home"
          >
            <span className="monogram">
              g<span>j</span>
              <i />
            </span>
            <span className="wordmark-name">
              Ghassen Jemiai<span>Software engineer</span>
            </span>
          </Link>
          <nav className="blog-nav" aria-label="Main navigation">
            <Link href="/">Portfolio</Link>
            <Link href="/blog/" aria-current="true">
              Blog
              <span className="status-dot" />
            </Link>
          </nav>
          <div className="header-actions">
            <BlogThemeToggle />
            <Link className="header-contact" href="/#contact">
              Let’s talk
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="site-footer container blog-footer">
        <Link href="/" className="footer-name">
          Ghassen Jemiai<span>© {new Date().getFullYear()}</span>
        </Link>
        <p>Made with care. Built with curiosity.</p>
        <Link href="/" className="back-to-top">
          Back to portfolio
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </footer>
    </>
  );
}
