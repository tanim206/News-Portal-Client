"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createArticle,
  deleteArticle,
  getAllArticlesForAdmin,
  getAllPublishedArticles,
  getBreakingNews,
  getFeaturedArticles,
  getSinglePublishedArticle,
  updateArticle,
} from "@/api/article.api";

import { toast } from "@/components/ui/toast";

import type {
  IArticleQueryParams,
  ICreateArticlePayload,
  IUpdateArticlePayload,
} from "@/types";

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

// GET ALL ARTICLES - ADMIN
export function useGetAllArticlesForAdmin(params?: IArticleQueryParams) {
  return useQuery({
    queryKey: ["admin-articles", params],
    queryFn: () => getAllArticlesForAdmin(params),
    select: (res) => ({
      articles: res.data?.data ?? [],
      meta: res.data?.meta ?? {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    }),
  });
}

export const useGetAllPublishedArticles = (
  params?: IArticleQueryParams,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["published-articles", params],
    queryFn: () => getAllPublishedArticles(params),
    enabled,
    select: (res) => ({
      articles: res.data?.data ?? [],
      meta: res.data?.meta ?? {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
      },
    }),
  });
};
// GET SINGLE ARTICLE
export const useSinglePublishedArticle = (articleId: string) => {
  return useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getSinglePublishedArticle(articleId),
    enabled: Boolean(articleId),
  });
};

// GET BREAKING NEWS
export function useGetBreakingNews(limit = 10) {
  return useQuery({
    queryKey: ["breaking-news", limit],
    queryFn: () => getBreakingNews(limit),
    select: (res) => res.data ?? [],
  });
}

// GET FEATURED ARTICLES
export function useGetFeaturedArticles(limit = 10) {
  return useQuery({
    queryKey: ["featured-articles", limit],
    queryFn: () => getFeaturedArticles(limit),
    select: (res) => res.data ?? [],
  });
}

// CREATE ARTICLE
export function useCreateArticle() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ICreateArticlePayload) => createArticle(payload),

    onSuccess: (res) => {
      toast.add({
        title: "Article created",
        description: res.message || "Article created successfully",
        type: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-articles"],
      });

      queryClient.invalidateQueries({
        queryKey: ["published-articles"],
      });

      router.push("/articles");
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

// UPDATE ARTICLE
// UPDATE ARTICLE
export function useUpdateArticle() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      articleId,
      payload,
    }: {
      articleId: string;
      payload: IUpdateArticlePayload;
    }) => updateArticle(articleId, payload),

    onSuccess: (res) => {
      toast.add({
        title: "Article updated",
        description: res.message || "Article updated successfully",
        type: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-articles"],
      });

      queryClient.invalidateQueries({
        queryKey: ["published-articles"],
      });

      queryClient.invalidateQueries({
        queryKey: ["article"],
      });

      queryClient.invalidateQueries({
        queryKey: ["breaking-news"],
      });

      queryClient.invalidateQueries({
        queryKey: ["featured-articles"],
      });

      // Redirect to Admin Article Table
      router.push("/articles");
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

// DELETE ARTICLE
export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArticle,

    onSuccess: (res) => {
      toast.add({
        title: "Article deleted",
        description: res.message || "Article deleted successfully",
        type: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-articles"],
      });

      queryClient.invalidateQueries({
        queryKey: ["published-articles"],
      });

      queryClient.invalidateQueries({
        queryKey: ["breaking-news"],
      });

      queryClient.invalidateQueries({
        queryKey: ["featured-articles"],
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
