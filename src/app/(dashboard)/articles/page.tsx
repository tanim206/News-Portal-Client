"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Plus, RefreshCw } from "lucide-react";

import {
  useDeleteArticle,
  useGetAllArticlesForAdmin,
} from "@/hooks/article.hook";

import ArticleFilters from "@/components/modules/admin/article/article-filters";
import ArticleTable from "@/components/modules/admin/article/article-table";
import ArticlePagination from "@/components/modules/admin/article/article-pagination";
import ArticleDeleteDialog from "@/components/modules/admin/article/article-delete-dialog";

import type { IArticle, IArticleQueryParams } from "@/types";

export default function ArticlesPage() {
  const [filters, setFilters] = useState<IArticleQueryParams>({
    page: 1,
    limit: 10,
  });

  const [selectedArticle, setSelectedArticle] = useState<IArticle | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading, refetch, isFetching } =
    useGetAllArticlesForAdmin(filters);

  const deleteMutation = useDeleteArticle();

  const handleDelete = () => {
    if (!selectedArticle) return;

    deleteMutation.mutate(selectedArticle.articleId, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedArticle(null);
      },
    });
  };

  const articles = data?.articles ?? [];
  const meta = data?.meta;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#176B45]" />
            <h1 className="text-2xl font-bold text-gray-900">
              Article Management
            </h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Create, manage and publish news articles.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => refetch()}
            className="flex h-10 items-center gap-2 rounded-lg border bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </button>

          <Link
            href="/articles/create"
            className="flex h-10 items-center gap-2 rounded-lg bg-[#176B45] px-4 text-sm font-medium text-white hover:bg-[#104B34]"
          >
            <Plus className="h-4 w-4" />
            Create Article
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-4">
          <p className="text-sm text-gray-500">Total Articles</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {meta?.total ?? 0}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <p className="text-sm text-gray-500">Current Results</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {articles.length}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <p className="text-sm text-gray-500">Breaking News</p>
          <p className="mt-2 text-2xl font-bold text-red-600">
            {articles.filter((article) => article.isBreaking).length}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <p className="text-sm text-gray-500">Featured</p>
          <p className="mt-2 text-2xl font-bold text-amber-600">
            {articles.filter((article) => article.isFeatured).length}
          </p>
        </div>
      </div>

      <ArticleFilters filters={filters} onChange={setFilters} />

      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="font-semibold text-gray-900">All Articles</h2>
            <p className="mt-1 text-xs text-gray-500">
              Manage your news content.
            </p>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-[#176B45]">
            {meta?.total ?? 0} articles
          </span>
        </div>

        <ArticleTable
          articles={articles}
          isLoading={isLoading}
          onDelete={(article) => {
            setSelectedArticle(article);
            setIsDeleteOpen(true);
          }}
        />

        {meta && (
          <ArticlePagination
            page={meta.page}
            totalPages={meta.totalPages}
            total={meta.total}
            limit={meta.limit}
            onPageChange={(page) =>
              setFilters((previous) => ({
                ...previous,
                page,
              }))
            }
          />
        )}
      </div>

      <ArticleDeleteDialog
        article={selectedArticle}
        isOpen={isDeleteOpen}
        isDeleting={deleteMutation.isPending}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedArticle(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
