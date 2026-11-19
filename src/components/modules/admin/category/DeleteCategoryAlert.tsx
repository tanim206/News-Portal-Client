"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import type { ICategory } from "@/types";
import { useDeleteCategory } from "@/hooks/category.hook";

import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteCategoryAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: ICategory | null;
}

export function DeleteCategoryAlert({
  open,
  onOpenChange,
  category,
}: DeleteCategoryAlertProps) {
  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  if (!category) return null;

  const articleCount = category._count?.articles ?? 0;
  const hasArticles = articleCount > 0;

  const handleDelete = () => {
    if (hasArticles || isPending) return;

    deleteCategory(category.categoryId, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;
    onOpenChange(nextOpen);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`flex size-11 shrink-0 items-center justify-center rounded-full ${
                hasArticles
                  ? "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                  : "bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400"
              }`}
            >
              <AlertTriangle className="size-5" />
            </div>

            <div className="space-y-1">
              <AlertDialogTitle className="text-lg font-semibold">
                Delete Category
              </AlertDialogTitle>

              <AlertDialogDescription>
                Are you sure you want to delete this category? This action
                cannot be undone.
              </AlertDialogDescription>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            aria-label="Close dialog"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Category Information */}
        <div className="mt-5 rounded-lg border border-border bg-muted/40 p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Selected Category
          </p>

          <p className="mt-1 font-semibold text-foreground">{category.name}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Slug: {category.slug}
          </p>
        </div>

        {/* Article Warning */}
        {hasArticles && (
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />

            <div className="space-y-1">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                This category contains articles
              </p>

              <p className="text-sm leading-6 text-amber-800 dark:text-amber-300">
                This category contains {articleCount} article(s). You cannot
                delete it until those articles are moved or deleted. Consider
                deactivating this category instead.
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending || hasArticles}
          >
            {isPending ? (
              <>
                <Spinner className="mr-2 size-4" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 size-4" />
                Delete Category
              </>
            )}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
