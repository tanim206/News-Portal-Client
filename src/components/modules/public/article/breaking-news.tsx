"use client";

import Link from "next/link";
import { Radio } from "lucide-react";

import { useGetBreakingNews } from "@/hooks/article.hook";

export default function BreakingNews() {
  const { data: articles, isLoading } = useGetBreakingNews(10);

  if (isLoading || !articles?.length) return null;

  return (
    <div className="flex items-center overflow-hidden rounded-lg bg-[#104B34] text-white">
      <div className="z-10 flex shrink-0 items-center gap-2 bg-[#176B45] px-4 py-3">
        <Radio className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wide">
          Breaking
        </span>
      </div>

      <div className="min-w-0 overflow-x-auto">
        <div className="flex items-center gap-8 whitespace-nowrap px-5 py-3">
          {articles.map((article) => (
            <Link
              key={article.articleId}
              href={`/article/${article.articleId}`}
              className="text-sm transition hover:text-[#F5C542]"
            >
              {article.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
