"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArticlePaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function ArticlePagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: ArticlePaginationProps) {
  if (total === 0) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-500">
        Showing {start}–{end} of {total} articles
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-9 items-center gap-1 rounded-lg border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <span className="px-2 text-sm text-gray-600">
          Page {page} of {Math.max(totalPages, 1)}
        </span>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-9 items-center gap-1 rounded-lg border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
