"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

import { useGetAllArticlesForAdmin } from "@/hooks/article.hook";

import ArticleForm from "@/components/modules/admin/article/article-form";

export default function EditArticlePage() {
  const params = useParams<{ articleId: string }>();
  const articleId = params.articleId;

  const { data, isLoading, isError } = useGetAllArticlesForAdmin({
    page: 1,
    limit: 100,
  });

  const article = data?.articles.find((item) => item.articleId === articleId);

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-[#176B45]" />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Article not found
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          The article could not be loaded.
        </p>
        <Link
          href="/dashboard/administrator/articles"
          className="mt-4 inline-block text-sm font-medium text-[#176B45]"
        >
          Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <Link
          href="/dashboard/administrator/articles"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#176B45]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Link>

        <h1 className="text-2xl font-bold text-gray-900">Edit Article</h1>

        <p className="mt-1 text-sm text-gray-500">
          Update your article information and publishing settings.
        </p>
      </div>

      <ArticleForm article={article} mode="edit" />
    </div>
  );
}
