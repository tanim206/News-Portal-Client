import Link from "next/link";
import type { IArticle } from "@/types";

interface Props {
  article: IArticle;
}

export default function SmallArticleCard({ article }: Props) {
  return (
    <article className="group border-b border-gray-200 pb-4 last:border-0">
      <Link href={`/article/${article.articleId}`} className="flex gap-3">
        <div className="h-24 w-28 shrink-0 overflow-hidden bg-gray-100 sm:w-32">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="min-w-0">
          <span className="text-[11px] font-semibold text-[#176B45]">
            {article.category?.name ?? "সংবাদ"}
          </span>

          <h3 className="mt-1 line-clamp-3 text-sm font-bold leading-6 text-gray-800 transition-colors group-hover:text-[#176B45]">
            {article.title}
          </h3>

          <time
            dateTime={article.createdAt}
            className="mt-2 block text-[11px] text-gray-500"
          >
            {new Date(article.createdAt).toLocaleDateString("bn-BD")}
          </time>
        </div>
      </Link>
    </article>
  );
}
