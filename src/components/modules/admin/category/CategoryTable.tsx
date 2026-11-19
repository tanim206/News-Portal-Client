"use client";

import { useState } from "react";
import { FolderOpen, CalendarDays, Clock3, Layers3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

import { DeleteCategoryAlert } from "./DeleteCategoryAlert";
import { CategoryActions } from "./CategoryActions";

import { useToggleCategoryStatus } from "@/hooks/category.hook";

import type { ICategory } from "@/types";

interface CategoryTableProps {
  categories: ICategory[];
  loading: boolean;
}

export function CategoryTable({ categories, loading }: CategoryTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );

  const [deleteOpen, setDeleteOpen] = useState(false);

  const {
    mutate: toggleStatus,
    variables: statusVariables,
    isPending: statusPending,
  } = useToggleCategoryStatus();

  const handleStatusToggle = (category: ICategory) => {
    toggleStatus({
      categoryId: category.categoryId,
      isActive: !category.isActive,
    });
  };

  const openDeleteDialog = (category: ICategory) => {
    setSelectedCategory(category);
    setDeleteOpen(true);
  };

  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow">
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-800 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-0 bg-primary hover:bg-primary">
                <TableCell
                  header
                  className="min-w-56 border-0 px-5 py-4 font-semibold text-white"
                >
                  Category
                </TableCell>

                <TableCell
                  header
                  className="min-w-36 border-0 px-4 py-4 font-semibold text-white"
                >
                  Slug
                </TableCell>

                <TableCell
                  header
                  className="border-0 px-4 py-4 text-center font-semibold text-white"
                >
                  Articles
                </TableCell>

                <TableCell
                  header
                  className="border-0 px-4 py-4 font-semibold text-white"
                >
                  Status
                </TableCell>

                <TableCell
                  header
                  className="min-w-36 border-0 px-4 py-4 font-semibold text-white"
                >
                  Created
                </TableCell>

                <TableCell
                  header
                  className="border-0 px-5 py-4 text-right font-semibold text-white"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.map((category) => {
                const isUpdatingThisCategory =
                  statusPending &&
                  statusVariables?.categoryId === category.categoryId;

                const createdAt = new Date(category.createdAt);

                const formattedDate = createdAt.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                const formattedTime = createdAt.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                return (
                  <TableRow
                    key={category.categoryId}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50/80"
                  >
                    {/* Category */}
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/10 text-primary">
                          <FolderOpen className="size-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-800">
                            {category.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Slug */}
                    <TableCell className="px-4 py-4">
                      <code className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs text-slate-600">
                        {category.slug}
                      </code>
                    </TableCell>

                    {/* Articles */}
                    <TableCell className="px-4 py-4 text-center">
                      <Badge
                        variant="secondary"
                        className="gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-600"
                      >
                        <Layers3 className="size-3.5" />
                        {category._count?.articles ?? 0}
                      </Badge>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-4 py-4">
                      <Badge
                        variant="outline"
                        className={
                          category.isActive
                            ? "gap-1.5 rounded-full border-green-200 bg-green-50 px-2.5 py-1 text-green-700"
                            : "gap-1.5 rounded-full border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-500"
                        }
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            category.isActive ? "bg-green-500" : "bg-slate-400"
                          }`}
                        />

                        {category.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>

                    {/* Created date and time */}
                    <TableCell className="px-4 py-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          <CalendarDays className="size-3.5 text-slate-400" />
                          {formattedDate}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Clock3 className="size-3.5" />
                          {formattedTime}
                        </div>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-5 py-4 text-right">
                      <div className="flex justify-end">
                        <CategoryActions
                          category={category}
                          isUpdating={isUpdatingThisCategory}
                          onToggleStatus={handleStatusToggle}
                          onDelete={openDeleteDialog}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}

              {/* Empty state */}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-56">
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100">
                        <FolderOpen className="size-7 text-slate-400" />
                      </div>

                      <div className="space-y-1">
                        <p className="font-semibold text-slate-700">
                          No categories found
                        </p>

                        <p className="text-sm text-slate-400">
                          Create a category to get started.
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Table footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-5 py-3">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {categories.length}
            </span>{" "}
            {categories.length === 1 ? "category" : "categories"}
          </p>

          <p className="text-xs text-slate-400">Category Management</p>
        </div>
      </div>

      <DeleteCategoryAlert
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        category={selectedCategory}
      />
    </>
  );
}
