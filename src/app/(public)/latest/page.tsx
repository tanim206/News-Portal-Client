"use client";

import { useState } from "react";

import { useGetAllPublishedArticles } from "@/hooks/article.hook";

import ArticleGrid from "@/components/modules/public/article/article-grid";
import ArticlePagination from "@/components/modules/admin/article/article-pagination";

export default function LatestArticlesPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllPublishedArticles({
    page,
    limit: 12,
  });

  const articles = data?.articles ?? [];
  const meta = data?.meta;

  return (
    <main className="mx-auto max-w-7xl space-y-7 px-4 py-8 md:px-6">
      <div className="border-b pb-5">
        <p className="text-sm font-semibold text-[#176B45]">NEWS & UPDATES</p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">সর্বশেষ সংবাদ</h1>

        <p className="mt-2 text-sm text-gray-500">
          সর্বশেষ প্রকাশিত সংবাদ ও প্রতিবেদন পড়ুন।
        </p>
      </div>

      <ArticleGrid articles={articles} isLoading={isLoading} />

      {meta && (
        <ArticlePagination
          page={meta.page}
          totalPages={meta.totalPages}
          total={meta.total}
          limit={meta.limit}
          onPageChange={setPage}
        />
      )}
    </main>
  );
}
