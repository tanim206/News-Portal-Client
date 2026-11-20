export type ArticleStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "ARCHIVED";

export interface IArticleCategory {
  categoryId: string;
  name: string;
  slug: string;
}

export interface IArticleAuthor {
  userId: string;
  fullName: string;
}

export interface IArticle {
  articleId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  thumbnailPublicId?: string | null;
  videoUrl?: string | null;
  source?: string | null;
  tags: string[];
  division?: string | null;
  district?: string | null;
  isBreaking: boolean;
  isFeatured: boolean;
  status: ArticleStatus;
  views: number;
  categoryId: string;
  authorId: string;
  category: IArticleCategory;
  author: IArticleAuthor;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateArticlePayload {
  title: string;
  excerpt: string;
  content: string;
  thumbnail: File;
  categoryId: string;
  videoUrl?: string;
  source?: string;
  tags?: string[];
  division?: string;
  district?: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  status?: ArticleStatus;
}

export interface IUpdateArticlePayload {
  title?: string;
  excerpt?: string;
  content?: string;
  thumbnail?: File;
  categoryId?: string;
  videoUrl?: string | null;
  source?: string | null;
  tags?: string[];
  division?: string | null;
  district?: string | null;
  isBreaking?: boolean;
  isFeatured?: boolean;
  status?: ArticleStatus;
}

export interface IArticleQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  division?: string;
  district?: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  status?: ArticleStatus;
}

export interface IArticlePaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IArticleListData {
  meta: IArticlePaginationMeta;
  data: IArticle[];
}

export interface IArticleResponse<T = IArticle> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface IArticleListResponse {
  meta: IArticlePaginationMeta;
  data: IArticle[];
}

export interface IBreakingArticle {
  articleId: string;
  title: string;
  slug: string;
  createdAt: string;
}
