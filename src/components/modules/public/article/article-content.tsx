
"use client";

import DOMPurify from "isomorphic-dompurify";

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({
  content,
}: ArticleContentProps) {
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);

  // Preserve older plain-text articles.
  const safeContent = DOMPurify.sanitize(
    isHtml
      ? content
      : content
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => `<p>${line}</p>`)
          .join(""),
    {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "rel"],
    },
  );

  return (
    <article
      className="article-body"
      dangerouslySetInnerHTML={{ __html: safeContent }}
    />
  );
}
