"use client";

import Link from "next/link";
import { useGetFeaturedArticles } from "@/hooks/article.hook";

import FeaturedArticleCard from "./featured-article-card";
import SmallArticleCard from "./small-article-card";

export default function FeaturedArticles() {
  const { data: articles, isLoading } = useGetFeaturedArticles(6);

  const mainArticle = articles?.[0];
  const middleArticles = articles?.slice(1, 4) ?? [];
  const sideArticles = articles?.slice(4, 6) ?? [];

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between border-b-2 border-[#176B45] pb-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#176B45]">
            Editor's Choice
          </p>
          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            নির্বাচিত সংবাদ
          </h2>
        </div>

        <Link
          href="/latest"
          className="text-sm font-semibold text-[#176B45] hover:underline"
        >
          সব সংবাদ
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="h-80 animate-pulse bg-gray-100 lg:col-span-1" />
          <div className="space-y-4 lg:col-span-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-24 animate-pulse bg-gray-100" />
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-24 animate-pulse bg-gray-100" />
            <div className="h-24 animate-pulse bg-gray-100" />
          </div>
        </div>
      ) : mainArticle ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <FeaturedArticleCard article={mainArticle} />
          </div>

          <div className="space-y-4 lg:col-span-1">
            {middleArticles.map((article) => (
              <SmallArticleCard key={article.articleId} article={article} />
            ))}
          </div>

          <div className="border-l border-gray-200 pl-0 lg:pl-5">
            <h3 className="mb-4 border-b pb-3 text-lg font-bold text-gray-900">
              আরও নির্বাচিত সংবাদ
            </h3>

            <div className="space-y-4">
              {sideArticles.map((article) => (
                <SmallArticleCard key={article.articleId} article={article} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="rounded-lg border py-10 text-center text-sm text-gray-500">
          নির্বাচিত সংবাদ পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
