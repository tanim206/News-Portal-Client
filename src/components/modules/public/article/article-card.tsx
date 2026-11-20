import Link from "next/link";

import type { IArticle } from "@/types";

interface ArticleCardProps {
  article: IArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/article/${article.articleId}`}>
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {article.isBreaking && (
            <span className="absolute left-3 top-3 rounded bg-red-600 px-2 py-1 text-[10px] font-bold uppercase text-white">
              Breaking
            </span>
          )}
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-center gap-2 text-xs text-[#176B45]">
            <span className="font-semibold">{article.category?.name}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400">
              {new Date(article.createdAt).toLocaleDateString("bn-BD")}
            </span>
          </div>

          <h2 className="line-clamp-2 text-base font-bold leading-7 text-gray-900 transition group-hover:text-[#176B45]">
            {article.title}
          </h2>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
