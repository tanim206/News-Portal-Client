"use client";

import { useState } from "react";
import { FolderOpen, Layers3, CheckCircle2 } from "lucide-react";

import { useGetAllCategories } from "@/hooks/category.hook";

import { CategoryHeader } from "@/components/modules/admin/category/CategoryHeader";
import { CategoryTable } from "@/components/modules/admin/category/CategoryTable";

function CategoryStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>

        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>
      </div>

      <p className="mt-3 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const { data, isPending, isError, error, refetch } = useGetAllCategories({
    search: search.trim() || undefined,
    page: 1,
    limit: 100,
  });

  const categories = data?.categories ?? [];
  const total = data?.meta.total ?? 0;

  const activeCount = categories.filter((category) => category.isActive).length;

  const inactiveCount = categories.filter(
    (category) => !category.isActive,
  ).length;

  return (
    <div className="space-y-6">
      <CategoryHeader
        search={search}
        onSearchChange={setSearch}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <CategoryStat label="Total Categories" value={total} icon={Layers3} />

        <CategoryStat
          label="Active Categories"
          value={activeCount}
          icon={CheckCircle2}
        />

        <CategoryStat
          label="Inactive Categories"
          value={inactiveCount}
          icon={FolderOpen}
        />
      </div>

      <div className="space-y-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">All Categories</h2>
            <p className="text-sm text-muted-foreground">
              View and manage all your news categories.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            {data?.meta.total ?? 0} total records
          </p>
        </div>

        {isError ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
            <p className="font-medium text-destructive">
              Failed to load categories
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {(error as Error)?.message || "Please try again."}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 text-sm font-medium text-primary underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        ) : (
          <CategoryTable categories={categories} loading={isPending} />
        )}
      </div>
    </div>
  );
}
