"use client";

import Link from "next/link";
import { useGetFeaturedArticles } from "@/hooks/article.hook";

export default function PopularArticles() {
  const { data: articles, isLoading } = useGetFeaturedArticles(6);

  return (
    <aside className="border border-gray-200 bg-white">
      <div className="border-b-2 border-[#176B45] px-4 py-3">
        <h2 className="text-lg font-bold text-gray-900">গুরুত্বপূর্ণ সংবাদ</h2>
      </div>

      <div className="space-y-4 p-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-3">
              <div className="h-16 w-20 animate-pulse bg-gray-100" />
              <div className="flex-1 space-y-2">
                <div className="h-3 animate-pulse bg-gray-100" />
                <div className="h-3 w-2/3 animate-pulse bg-gray-100" />
              </div>
            </div>
          ))
        ) : articles?.length ? (
          articles.slice(0, 5).map((article, index) => (
            <Link
              key={article.articleId}
              href={`/article/${article.articleId}`}
              className="group flex gap-3"
            >
              <span className="text-2xl font-bold text-[#176B45]/40">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="line-clamp-3 text-sm font-semibold leading-6 text-gray-800 transition-colors group-hover:text-[#176B45]">
                  {article.title}
                </h3>
                <span className="mt-1 block text-xs text-gray-500">
                  {article.category?.name}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-sm text-gray-500">কোনো সংবাদ পাওয়া যায়নি।</p>
        )}
      </div>
    </aside>
  );
}
