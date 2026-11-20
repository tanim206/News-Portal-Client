"use client";

import Link from "next/link";
import { useGetAllPublishedArticles } from "@/hooks/article.hook";
import SmallArticleCard from "./small-article-card";

export default function LatestArticles() {
  const { data, isLoading } = useGetAllPublishedArticles({
    page: 1,
    limit: 6,
  });

  const articles = data?.articles ?? [];

  return (
    <section>
      <div className="mb-5 flex items-center justify-between border-b-2 border-[#176B45] pb-3">
        <h2 className="text-xl font-bold text-gray-900">সর্বশেষ সংবাদ</h2>

        <Link
          href="/latest"
          className="text-sm font-semibold text-[#176B45] hover:underline"
        >
          সব সংবাদ
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-3">
              <div className="h-24 w-28 animate-pulse bg-gray-100" />
              <div className="flex-1 space-y-3">
                <div className="h-4 animate-pulse bg-gray-100" />
                <div className="h-4 w-2/3 animate-pulse bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      ) : articles.length ? (
        <div className="space-y-4">
          {articles.map((article) => (
            <SmallArticleCard key={article.articleId} article={article} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-gray-500">
          কোনো সংবাদ পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
