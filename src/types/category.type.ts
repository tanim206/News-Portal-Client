export interface ICategory {
  categoryId: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  _count?: {
    articles: number;
  };
}

export interface ICreateCategoryPayload {
  name: string;
  slug: string;
  isActive?: boolean;
}

export interface IUpdateCategoryPayload {
  name?: string;
  slug?: string;
  isActive?: boolean;
}

export interface ICategoryResponse<T = ICategory> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ICategoryListResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: ICategory[];
}

export interface ICategoryQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}

