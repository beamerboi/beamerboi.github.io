import Image from "next/image";
import Link from "next/link";
import { Fragment, createElement, type ReactNode } from "react";
import { safeLink, textContent, type Block } from "../../lib/blog-content";

function renderBlock(block: Block): ReactNode {
  const children = block.children?.map((child, index) => (
    <Fragment key={index}>{renderBlock(child)}</Fragment>
  ));
  switch (block.type) {
    case "text": {
      let text: ReactNode = block.text ?? "";
      if (block.code) text = <code>{text}</code>;
      if (block.bold) text = <strong>{text}</strong>;
      if (block.italic) text = <em>{text}</em>;
      if (block.underline) text = <u>{text}</u>;
      if (block.strikethrough) text = <s>{text}</s>;
      return text;
    }
    case "paragraph":
      return <p>{children?.length ? children : <br />}</p>;
    case "heading": {
      // The article title is the only h1 on the page.
      const level = Math.min(6, Math.max(2, Math.trunc(block.level ?? 2)));
      return createElement(`h${level}`, null, children);
    }
    case "list":
      return block.format === "ordered" ? (
        <ol>{children}</ol>
      ) : (
        <ul>{children}</ul>
      );
    case "list-item":
      return <li>{children}</li>;
    case "quote":
      return <blockquote>{children}</blockquote>;
    case "code":
      return (
        <pre tabIndex={0}>
          <code>
            {(block.children ?? [])
              .map((child) => child.text ?? textContent(child.children ?? []))
              .join("")}
          </code>
        </pre>
      );
    case "link": {
      const href = block.url ? safeLink(block.url) : undefined;
      if (href?.startsWith("/")) return <Link href={href}>{children}</Link>;
      return href ? <a href={href}>{children}</a> : <>{children}</>;
    }
    case "image": {
      const image = block.image;
      if (!image) return null;
      return (
        <figure>
          <Image
            src={image.url}
            alt={image.alternativeText}
            width={image.width ?? 1200}
            height={image.height ?? 800}
            sizes="(max-width: 800px) 100vw, 740px"
          />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      );
    }
    default:
      return null;
  }
}

export function ArticleBlocks({ content }: { content: Block[] }) {
  return (
    <div className="article-prose">
      {content.map((block, index) => (
        <Fragment key={index}>{renderBlock(block)}</Fragment>
      ))}
    </div>
  );
}
