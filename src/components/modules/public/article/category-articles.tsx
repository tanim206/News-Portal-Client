"use client";

import Link from "next/link";
import { useGetAllPublishedArticles } from "@/hooks/article.hook";
import SmallArticleCard from "./small-article-card";

export default function CategoryArticles() {
  const { data, isLoading } = useGetAllPublishedArticles({
    page: 1,
    limit: 30,
  });

  const articles = data?.articles ?? [];

  const groupedArticles = articles.reduce<Record<string, typeof articles>>(
    (groups, article) => {
      const categoryId = article.categoryId;

      if (!groups[categoryId]) {
        groups[categoryId] = [];
      }

      if (groups[categoryId].length < 3) {
        groups[categoryId].push(article);
      }

      return groups;
    },
    {},
  );

  const categories = Object.values(groupedArticles).filter(
    (group) => group.length > 0,
  );

  if (!isLoading && !categories.length) return null;

  return (
    <section className="space-y-8">
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="h-7 w-1/3 animate-pulse bg-gray-100" />
              <div className="h-24 animate-pulse bg-gray-100" />
              <div className="h-24 animate-pulse bg-gray-100" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
          {categories.map((group) => {
            const category = group[0].category;

            return (
              <div key={group[0].categoryId}>
                <div className="mb-4 flex items-center justify-between border-b-2 border-[#176B45] pb-3">
                  <h2 className="text-xl font-bold text-gray-900">
                    {category.name}
                  </h2>

                  <Link
                    href={`/article-category/${encodeURIComponent(category.slug)}`}
                    className="text-xs font-semibold text-[#176B45] hover:underline"
                  >
                    আরও সংবাদ
                  </Link>
                </div>

                <div className="space-y-4">
                  {group.map((article) => (
                    <SmallArticleCard
                      key={article.articleId}
                      article={article}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
