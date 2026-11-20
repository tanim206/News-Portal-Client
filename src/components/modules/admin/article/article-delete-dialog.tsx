"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";

import type { IArticle } from "@/types";

interface ArticleDeleteDialogProps {
  article: IArticle | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ArticleDeleteDialog({
  article,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: ArticleDeleteDialogProps) {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <h2 className="mt-4 text-lg font-semibold text-gray-900">
          Delete this article?
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          You are about to permanently delete{" "}
          <span className="font-medium text-gray-800">{article.title}</span>.
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-10 rounded-lg border px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex h-10 items-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
            Delete Article
          </button>
        </div>
      </div>
    </div>
  );
}
