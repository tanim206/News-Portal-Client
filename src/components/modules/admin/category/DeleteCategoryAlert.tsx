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

  const hasArticles = (category._count?.articles ?? 0) > 0;

  const handleDelete = () => {
    deleteCategory(category.categoryId, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2">
        <div className="space-y-2">
          <div className="flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <span className="text-xl font-semibold">!</span>
          </div>

          <AlertDialogTitle className="text-lg">
            Delete Category
          </AlertDialogTitle>

          <AlertDialogDescription className="leading-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {category.name}
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </div>

        {hasArticles && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            This category contains {category._count?.articles} article(s). It
            cannot be deleted until those articles are moved or deleted.
            Consider deactivating this category instead.
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
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
              "Delete Category"
            )}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
