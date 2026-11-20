import apiClient from "@/lib/apiClient";

import type {
  IArticle,
  IArticleListResponse,
  IArticleQueryParams,
  IArticleResponse,
  IBreakingArticle,
  ICreateArticlePayload,
  IUpdateArticlePayload,
} from "@/types";

function createArticleFormData(
  payload: ICreateArticlePayload | IUpdateArticlePayload,
): FormData {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined) return;

    if (value === null) {
      formData.append(key, "");
      return;
    }

    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, String(value));
  });

  return formData;
}

// GET ALL ARTICLES FOR ADMIN
export async function getAllArticlesForAdmin(
  params?: IArticleQueryParams,
): Promise<IArticleResponse<IArticleListResponse>> {
  const res = await apiClient("/articles/admin/all", {
    method: "GET",
    params: params as Record<string, string | number | boolean | undefined>,
  });

  return res as IArticleResponse<IArticleListResponse>;
}

// GET ALL PUBLISHED ARTICLES
export async function getAllPublishedArticles(
  params?: IArticleQueryParams,
): Promise<IArticleResponse<IArticleListResponse>> {
  const res = await apiClient("/articles/", {
    method: "GET",
    params: params as Record<string, string | number | boolean | undefined>,
  });

  return res as IArticleResponse<IArticleListResponse>;
}

// GET SINGLE PUBLISHED ARTICLE
export const getSinglePublishedArticle = async (
  articleId: string,
): Promise<IArticle> => {
  const response = await apiClient<{
    success: boolean;
    message: string;
    data: IArticle;
  }>(`/articles/${articleId}`);

  return response.data;
};

// GET BREAKING NEWS
export async function getBreakingNews(
  limit = 10,
): Promise<IArticleResponse<IBreakingArticle[]>> {
  const res = await apiClient("/articles/breaking", {
    method: "GET",
    params: { limit },
  });

  return res as IArticleResponse<IBreakingArticle[]>;
}

// GET FEATURED ARTICLES
export async function getFeaturedArticles(
  limit = 10,
): Promise<IArticleResponse<IArticle[]>> {
  const res = await apiClient("/articles/featured", {
    method: "GET",
    params: { limit },
  });

  return res as IArticleResponse<IArticle[]>;
}

// CREATE ARTICLE
export async function createArticle(
  payload: ICreateArticlePayload,
): Promise<IArticleResponse<IArticle>> {
  const formData = createArticleFormData(payload);

  const res = await apiClient("/articles/", {
    method: "POST",
    body: formData,
  });

  return res as IArticleResponse<IArticle>;
}

// UPDATE ARTICLE
export async function updateArticle(
  articleId: string,
  payload: IUpdateArticlePayload,
): Promise<IArticleResponse<IArticle>> {
  const formData = createArticleFormData(payload);

  const res = await apiClient(`/articles/${encodeURIComponent(articleId)}`, {
    method: "PATCH",
    body: formData,
  });

  return res as IArticleResponse<IArticle>;
}

// DELETE ARTICLE
export async function deleteArticle(
  articleId: string,
): Promise<IArticleResponse<null>> {
  const res = await apiClient(`/articles/${encodeURIComponent(articleId)}`, {
    method: "DELETE",
  });

  return res as IArticleResponse<null>;
}
