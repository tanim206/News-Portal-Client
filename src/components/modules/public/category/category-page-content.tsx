"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGetAllPublishedArticles } from "@/hooks/article.hook";
import { getPublicCategories } from "@/api/category.api";
import SmallArticleCard from "@/components/modules/public/article/small-article-card";

interface Props {
  slug: string;
}

export default function CategoryPageContent({ slug }: Props) {
  const [page, setPage] = useState(1);
  const limit = 12;

  // Get active categories
  const {
    data: categories = [],
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useQuery({
    queryKey: ["public-categories"],
    queryFn: getPublicCategories,
  });

  // Find category by URL slug
  const category = Array.isArray(categories)
    ? categories.find((item) => item.slug === slug)
    : undefined;

  // Get articles by category ID
  const {
    data,
    isLoading: isArticlesLoading,
    isError: isArticlesError,
  } = useGetAllPublishedArticles(
    {
      page,
      limit,
      categoryId: category?.categoryId,
    },
    Boolean(category?.categoryId),
  );

  const articles = data?.articles ?? [];
  const meta = data?.meta;

  if (isCategoryLoading) {
    return (
      <div className="mx-auto max-w-[1320px] px-4 py-12">
        <div className="h-8 w-56 animate-pulse bg-gray-100" />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-64 animate-pulse bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  if (isCategoryError || !category) {
    return (
      <div className="mx-auto max-w-[1320px] px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          ক্যাটাগরি পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-[1320px] px-4 py-8">
      {/* Category Heading */}
      <div className="mb-8 border-b-2 border-[#176B45] pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-[#176B45]">
          News Category
        </p>

        <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
          {category.name}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {meta?.total ?? 0} টি সংবাদ পাওয়া গেছে
        </p>
      </div>

      {/* Articles */}
      {isArticlesLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-64 animate-pulse bg-gray-100" />
          ))}
        </div>
      ) : isArticlesError ? (
        <div className="py-16 text-center text-sm text-red-600">
          সংবাদ লোড করা সম্ভব হয়নি। আবার চেষ্টা করুন।
        </div>
      ) : articles.length > 0 ? (
        <>
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <SmallArticleCard key={article.articleId} article={article} />
            ))}
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => {
                  setPage((current) => Math.max(1, current - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="rounded-md border px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-[#176B45] hover:text-[#176B45] disabled:cursor-not-allowed disabled:opacity-40"
              >
                আগের পৃষ্ঠা
              </button>

              <span className="text-sm text-gray-600">
                {page} / {meta.totalPages}
              </span>

              <button
                type="button"
                disabled={page >= meta.totalPages}
                onClick={() => {
                  setPage((current) => Math.min(meta.totalPages, current + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="rounded-md border px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-[#176B45] hover:text-[#176B45] disabled:cursor-not-allowed disabled:opacity-40"
              >
                পরের পৃষ্ঠা
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="border border-gray-200 py-16 text-center">
          <h2 className="text-lg font-bold text-gray-800">
            এই ক্যাটাগরিতে এখনো কোনো সংবাদ প্রকাশিত হয়নি।
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            নতুন সংবাদ প্রকাশিত হলে এখানে দেখা যাবে।
          </p>
        </div>
      )}
    </main>
  );
}
