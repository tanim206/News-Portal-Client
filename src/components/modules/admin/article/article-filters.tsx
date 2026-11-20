"use client";

import { Search, X } from "lucide-react";

import type { IArticleQueryParams, ArticleStatus } from "@/types";

interface ArticleFiltersProps {
  filters: IArticleQueryParams;
  onChange: (filters: IArticleQueryParams) => void;
}

export default function ArticleFilters({
  filters,
  onChange,
}: ArticleFiltersProps) {
  const updateFilter = (
    key: keyof IArticleQueryParams,
    value: string | boolean | undefined,
  ) => {
    onChange({
      ...filters,
      [key]: value,
      page: 1,
    });
  };

  const clearFilters = () => {
    onChange({
      page: 1,
      limit: filters.limit || 10,
    });
  };

  const hasFilters = Boolean(
    filters.search ||
    filters.status ||
    filters.categoryId ||
    filters.division ||
    filters.district ||
    filters.isBreaking !== undefined ||
    filters.isFeatured !== undefined,
  );

  return (
    <div className="space-y-4 rounded-xl border bg-white p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            value={filters.search || ""}
            onChange={(e) =>
              updateFilter("search", e.target.value || undefined)
            }
            placeholder="Search articles..."
            className="h-10 w-full rounded-lg border border-gray-200 pl-10 pr-3 text-sm outline-none focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/10"
          />
        </div>

        <select
          value={filters.status || ""}
          onChange={(e) =>
            updateFilter(
              "status",
              (e.target.value || undefined) as ArticleStatus | undefined,
            )
          }
          className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#176B45]"
        >
          <option value="">All Status</option>
          <option value="DRAFT">Draft</option>
          <option value="PENDING">Pending</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>

        <select
          value={
            filters.isBreaking === undefined ? "" : String(filters.isBreaking)
          }
          onChange={(e) =>
            updateFilter(
              "isBreaking",
              e.target.value === "" ? undefined : e.target.value === "true",
            )
          }
          className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#176B45]"
        >
          <option value="">Breaking: All</option>
          <option value="true">Breaking only</option>
          <option value="false">Non-breaking</option>
        </select>

        <select
          value={
            filters.isFeatured === undefined ? "" : String(filters.isFeatured)
          }
          onChange={(e) =>
            updateFilter(
              "isFeatured",
              e.target.value === "" ? undefined : e.target.value === "true",
            )
          }
          className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#176B45]"
        >
          <option value="">Featured: All</option>
          <option value="true">Featured only</option>
          <option value="false">Non-featured</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Search by title, excerpt, content or tags.
        </p>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#176B45] hover:underline"
          >
            <X className="h-4 w-4" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
