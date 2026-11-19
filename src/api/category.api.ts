import apiClient from "@/lib/apiClient";

import type {
  ICategory,
  ICategoryListResponse,
  ICategoryQueryParams,
  ICategoryResponse,
  ICreateCategoryPayload,
  IUpdateCategoryPayload,
} from "@/types";

// GET ALL CATEGORIES
export async function getAllCategories(
  params?: ICategoryQueryParams,
): Promise<ICategoryResponse<ICategoryListResponse>> {
  const res = await apiClient("/categories/admin/all", {
    method: "GET",
    params: params as Record<string, string | number | undefined>,
  });

  return res as ICategoryResponse<ICategoryListResponse>;
}

// CREATE CATEGORY
export async function createCategory(
  payload: ICreateCategoryPayload,
): Promise<ICategoryResponse<ICategory>> {
  const res = await apiClient("/categories/", {
    method: "POST",
    body: payload,
  });

  return res as ICategoryResponse<ICategory>;
}

// GET SINGLE CATEGORY
export async function getSingleCategory(
  identifier: string,
): Promise<ICategoryResponse<ICategory>> {
  const res = await apiClient(
    `/categories/admin/${encodeURIComponent(identifier)}`,
    {
      method: "GET",
    },
  );

  return res as ICategoryResponse<ICategory>;
}

// UPDATE CATEGORY
export async function updateCategory(
  categoryId: string,
  payload: IUpdateCategoryPayload,
): Promise<ICategoryResponse<ICategory>> {
  const res = await apiClient(`/categories/${encodeURIComponent(categoryId)}`, {
    method: "PATCH",
    body: payload,
  });

  return res as ICategoryResponse<ICategory>;
}

// DELETE CATEGORY
export async function deleteCategory(
  categoryId: string,
): Promise<ICategoryResponse<null>> {
  const res = await apiClient(`/categories/${encodeURIComponent(categoryId)}`, {
    method: "DELETE",
  });

  return res as ICategoryResponse<null>;
}

// TOGGLE CATEGORY STATUS
export async function toggleCategoryStatus(
  categoryId: string,
  isActive: boolean,
): Promise<ICategoryResponse<ICategory>> {
  const res = await apiClient(`/categories/${encodeURIComponent(categoryId)}`, {
    method: "PATCH",
    body: { isActive },
  });

  return res as ICategoryResponse<ICategory>;
}
