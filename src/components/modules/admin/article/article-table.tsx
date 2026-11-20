"use client";

import Link from "next/link";
import { Edit3, Eye, Trash2 } from "lucide-react";

import type { IArticle } from "@/types";

interface ArticleTableProps {
  articles: IArticle[];
  isLoading?: boolean;
  onDelete: (article: IArticle) => void;
}

function StatusBadge({ status }: { status: IArticle["status"] }) {
  const styles: Record<IArticle["status"], string> = {
    DRAFT: "bg-gray-100 text-gray-700",
    PENDING: "bg-amber-100 text-amber-700",
    PUBLISHED: "bg-green-100 text-green-700",
    ARCHIVED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

export default function ArticleTable({
  articles,
  isLoading,
  onDelete,
}: ArticleTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3 p-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-lg bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
        <div className="mb-3 rounded-full bg-gray-100 p-4">
          <Eye className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="font-semibold text-gray-800">No articles found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px] text-left">
        <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-5 py-4 font-semibold">Article</th>
            <th className="px-4 py-4 font-semibold">Category</th>
            <th className="px-4 py-4 font-semibold">Author</th>
            <th className="px-4 py-4 font-semibold">Status</th>
            <th className="px-4 py-4 font-semibold">Views</th>
            <th className="px-4 py-4 font-semibold">Date</th>
            <th className="px-4 py-4 text-right font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {articles.map((article) => (
            <tr
              key={article.articleId}
              className="transition-colors hover:bg-gray-50/80"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="h-12 w-16 shrink-0 rounded-md object-cover"
                  />

                  <div className="max-w-[300px]">
                    <p className="line-clamp-2 text-sm font-semibold text-gray-800">
                      {article.title}
                    </p>

                    <div className="mt-1 flex flex-wrap gap-1">
                      {article.isBreaking && (
                        <span className="text-[10px] font-semibold text-red-600">
                          BREAKING
                        </span>
                      )}

                      {article.isFeatured && (
                        <span className="text-[10px] font-semibold text-amber-600">
                          FEATURED
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-4 py-4 text-sm text-gray-600">
                {article.category?.name || "—"}
              </td>

              <td className="px-4 py-4 text-sm text-gray-600">
                {article.author?.fullName || "—"}
              </td>

              <td className="px-4 py-4">
                <StatusBadge status={article.status} />
              </td>

              <td className="px-4 py-4 text-sm text-gray-600">
                {article.views.toLocaleString()}
              </td>

              <td className="px-4 py-4 text-sm text-gray-500">
                {new Date(article.createdAt).toLocaleDateString("en-US")}
              </td>

              <td className="px-4 py-4">
                <div className="flex items-center justify-end gap-1">
                  {article.status === "PUBLISHED" && (
                    <Link
                      href={`/article/${article.articleId}`}
                      target="_blank"
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-[#176B45]"
                      title="View article"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  )}

                  <Link
                    href={`/articles/edit/${article.articleId}`}
                    className="rounded-lg p-2 text-gray-500 hover:bg-green-50 hover:text-[#176B45]"
                    title="Edit article"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onDelete(article)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                    title="Delete article"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
