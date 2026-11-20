import Link from "next/link";
import type { IArticle } from "@/types";

interface Props {
  article: IArticle;
}

export default function FeaturedArticleCard({ article }: Props) {
  return (
    <article className="group overflow-hidden bg-white">
      <Link href={`/article/${article.articleId}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute left-3 top-3 bg-[#F5C542] px-3 py-1 text-xs font-bold text-[#26352D]">
            {article.category?.name ?? "নির্বাচিত"}
          </span>
        </div>

        <div className="pt-4">
          <h2 className="text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#176B45] md:text-2xl">
            {article.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-600">
            {article.excerpt}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <span>{article.author?.fullName}</span>
            <span>•</span>
            <time dateTime={article.createdAt}>
              {new Date(article.createdAt).toLocaleDateString("bn-BD")}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
