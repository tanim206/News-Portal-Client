"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  toggleCategoryStatus,
  updateCategory,
} from "@/api/category.api";

import { toast } from "@/components/ui/toast";

import type { ICategoryQueryParams, IUpdateCategoryPayload } from "@/types";

function getErrorMessage(error: unknown): string {
  const err = error as {
    data?: { message?: string };
    message?: string;
  };

  return (
    err?.data?.message ||
    err?.message ||
    "Something went wrong. Please try again."
  );
}

// GET ALL CATEGORIES
export function useGetAllCategories(params?: ICategoryQueryParams) {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getAllCategories(params),
    select: (res) => ({
      categories: res.data?.data ?? [],
      meta: res.data?.meta ?? {
        page: 1,
        limit: 10,
        total: 0,
        totalPage: 0,
      },
    }),
  });
}

// CREATE CATEGORY
export function useCreateCategory() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createCategory,

    onSuccess: (res) => {
      toast.add({
        title: "Category created",
        description: res.message || "Category created successfully",
        type: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      router.push("/dashboard/administrator/categories");
    },

    onError: (error) => {
      toast.add({
        title: "Creation failed",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
}

// UPDATE CATEGORY
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      payload,
    }: {
      categoryId: string;
      payload: IUpdateCategoryPayload;
    }) => updateCategory(categoryId, payload),

    onSuccess: (res) => {
      toast.add({
        title: "Category updated",
        description: res.message || "Category updated successfully",
        type: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      queryClient.invalidateQueries({
        queryKey: ["category"],
      });
    },

    onError: (error) => {
      toast.add({
        title: "Update failed",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
}

// DELETE CATEGORY
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,

    onSuccess: (res) => {
      toast.add({
        title: "Category deleted",
        description: res.message || "Category deleted successfully",
        type: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: (error) => {
      toast.add({
        title: "Delete failed",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
}

// TOGGLE CATEGORY STATUS
export function useToggleCategoryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      isActive,
    }: {
      categoryId: string;
      isActive: boolean;
    }) => toggleCategoryStatus(categoryId, isActive),

    onSuccess: (res) => {
      toast.add({
        title: "Status updated",
        description: res.message || "Category status updated successfully",
        type: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: (error) => {
      toast.add({
        title: "Status update failed",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  });
}

// GET SINGLE CATEGORY
export function useGetSingleCategory(identifier: string) {
  return useQuery({
    queryKey: ["category", identifier],
    queryFn: () => getSingleCategory(identifier),
    select: (res) => res.data ?? null,
    enabled: Boolean(identifier),
  });
}
