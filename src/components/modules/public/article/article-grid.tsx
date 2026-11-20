import ArticleCard from "./article-card";

import type { IArticle } from "@/types";

interface ArticleGridProps {
  articles: IArticle[];
  isLoading?: boolean;
}

export default function ArticleGrid({ articles, isLoading }: ArticleGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border bg-white"
          >
            <div className="aspect-video animate-pulse bg-gray-100" />
            <div className="space-y-3 p-4">
              <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
              <div className="h-5 animate-pulse rounded bg-gray-100" />
              <div className="h-4 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        <p className="font-medium text-gray-700">No articles available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.articleId} article={article} />
      ))}
    </div>
  );
}
