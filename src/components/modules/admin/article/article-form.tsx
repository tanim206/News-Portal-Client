"use client";

import { useEffect, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

import { useGetAllCategories } from "@/hooks/category.hook";
import { useCreateArticle, useUpdateArticle } from "@/hooks/article.hook";

import type {
  IArticle,
  ArticleStatus,
  ICreateArticlePayload,
  IUpdateArticlePayload,
} from "@/types";

interface ArticleFormProps {
  article?: IArticle;
  mode: "create" | "edit";
}

interface FormState {
  title: string;
  excerpt: string;
  content: string;
  categoryId: string;
  videoUrl: string;
  source: string;
  tags: string;
  division: string;
  district: string;
  isBreaking: boolean;
  isFeatured: boolean;
  status: ArticleStatus;
}

const initialState: FormState = {
  title: "",
  excerpt: "",
  content: "",
  categoryId: "",
  videoUrl: "",
  source: "",
  tags: "",
  division: "",
  district: "",
  isBreaking: false,
  isFeatured: false,
  status: "DRAFT",
};

const divisions = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

export default function ArticleForm({ article, mode }: ArticleFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: categoryData, isLoading: categoriesLoading } =
    useGetAllCategories({ page: 1, limit: 100 });

  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();

  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!article) return;

    setForm({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      categoryId: article.categoryId,
      videoUrl: article.videoUrl || "",
      source: article.source || "",
      tags: article.tags?.join(", ") || "",
      division: article.division || "",
      district: article.district || "",
      isBreaking: article.isBreaking,
      isFeatured: article.isFeatured,
      status: article.status,
    });

    setPreview(article.thumbnail);
  }, [article]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [key]: "",
    }));
  };

  const handleThumbnail = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((previous) => ({
        ...previous,
        thumbnail: "Please select an image file.",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((previous) => ({
        ...previous,
        thumbnail: "Image size must be less than 5MB.",
      }));
      return;
    }

    setThumbnail(file);
    setPreview(URL.createObjectURL(file));

    setErrors((previous) => ({
      ...previous,
      thumbnail: "",
    }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (form.title.trim().length < 5) {
      nextErrors.title = "Title must be at least 5 characters.";
    }

    if (form.excerpt.trim().length < 10) {
      nextErrors.excerpt = "Excerpt must be at least 10 characters.";
    }

    if (!form.content.trim()) {
      nextErrors.content = "Article content is required.";
    }

    if (!form.categoryId) {
      nextErrors.categoryId = "Please select a category.";
    }

    if (mode === "create" && !thumbnail) {
      nextErrors.thumbnail = "Article thumbnail is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    const tags = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (mode === "create") {
      if (!thumbnail) return;

      const payload: ICreateArticlePayload = {
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content,
        categoryId: form.categoryId,
        thumbnail,
        videoUrl: form.videoUrl || undefined,
        source: form.source || undefined,
        tags,
        division: form.division || undefined,
        district: form.district || undefined,
        isBreaking: form.isBreaking,
        isFeatured: form.isFeatured,
        status: form.status,
      };

      createMutation.mutate(payload);
      return;
    }

    if (!article) return;

    const payload: IUpdateArticlePayload = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content,
      categoryId: form.categoryId,
      thumbnail: thumbnail || undefined,
      videoUrl: form.videoUrl || null,
      source: form.source || null,
      tags,
      division: form.division || null,
      district: form.district || null,
      isBreaking: form.isBreaking,
      isFeatured: form.isFeatured,
      status: form.status,
    };

    updateMutation.mutate({
      articleId: article.articleId,
      payload,
    });
  };

  const inputClass =
    "h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/10";

  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="space-y-4 rounded-xl border bg-white p-5">
            <div>
              <h2 className="font-semibold text-gray-900">
                Article Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Add the main information of your news article.
              </p>
            </div>

            <div>
              <label className={labelClass}>Article Title *</label>
              <input
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="Enter article headline"
                className={inputClass}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Excerpt *</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setField("excerpt", e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Write a short summary of the article..."
                className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/10"
              />
              <div className="mt-1 flex justify-between">
                {errors.excerpt ? (
                  <p className="text-xs text-red-600">{errors.excerpt}</p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-gray-400">
                  {form.excerpt.length}/500
                </span>
              </div>
            </div>

            <div>
              <label className={labelClass}>Article Content *</label>
              <textarea
                value={form.content}
                onChange={(e) => setField("content", e.target.value)}
                rows={16}
                placeholder="Write your full article content..."
                className="w-full rounded-lg border border-gray-200 p-3 text-sm leading-7 outline-none focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/10"
              />
              {errors.content && (
                <p className="mt-1 text-xs text-red-600">{errors.content}</p>
              )}
              <p className="mt-1 text-xs text-gray-400">
                Plain text content is supported by this form.
              </p>
            </div>
          </section>

          <section className="space-y-4 rounded-xl border bg-white p-5">
            <div>
              <h2 className="font-semibold text-gray-900">
                Additional Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Add source, video, tags and location.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>Video URL</label>
                <input
                  type="url"
                  value={form.videoUrl}
                  onChange={(e) => setField("videoUrl", e.target.value)}
                  placeholder="https://youtube.com/..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>News Source</label>
                <input
                  value={form.source}
                  onChange={(e) => setField("source", e.target.value)}
                  placeholder="Source name"
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Tags</label>
                <input
                  value={form.tags}
                  onChange={(e) => setField("tags", e.target.value)}
                  placeholder="Bangladesh, Politics, Economy"
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-gray-400">
                  Separate tags using commas.
                </p>
              </div>

              <div>
                <label className={labelClass}>Division</label>
                <select
                  value={form.division}
                  onChange={(e) => {
                    setField("division", e.target.value);
                    setField("district", "");
                  }}
                  className={inputClass}
                >
                  <option value="">Select Division</option>
                  {divisions.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>District</label>
                <input
                  value={form.district}
                  onChange={(e) => setField("district", e.target.value)}
                  placeholder="Enter district"
                  className={inputClass}
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="space-y-4 rounded-xl border bg-white p-5">
            <div>
              <h2 className="font-semibold text-gray-900">Thumbnail</h2>
              <p className="mt-1 text-xs text-gray-500">
                Recommended: 1200 × 675px, maximum 5MB.
              </p>
            </div>

            <label className="group relative flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-center hover:border-[#176B45]">
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Article thumbnail preview"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-medium text-white opacity-0 transition group-hover:opacity-100">
                    Change thumbnail
                  </span>
                </>
              ) : (
                <>
                  <ImagePlus className="mb-2 h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Upload thumbnail
                  </span>
                  <span className="mt-1 text-xs text-gray-400">
                    PNG, JPG or WEBP
                  </span>
                </>
              )}

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => handleThumbnail(e.target.files?.[0])}
              />
            </label>

            {preview && (
              <button
                type="button"
                onClick={() => {
                  setThumbnail(null);
                  setPreview(article?.thumbnail || null);
                }}
                className="flex items-center gap-1 text-xs text-red-600 hover:underline"
              >
                <X className="h-3 w-3" />
                Remove new selection
              </button>
            )}

            {errors.thumbnail && (
              <p className="text-xs text-red-600">{errors.thumbnail}</p>
            )}
          </section>

          <section className="space-y-4 rounded-xl border bg-white p-5">
            <h2 className="font-semibold text-gray-900">Publishing Settings</h2>

            <div>
              <label className={labelClass}>Category *</label>
              <select
                value={form.categoryId}
                onChange={(e) => setField("categoryId", e.target.value)}
                disabled={categoriesLoading}
                className={inputClass}
              >
                <option value="">
                  {categoriesLoading
                    ? "Loading categories..."
                    : "Select category"}
                </option>

                {categoryData?.categories
                  ?.filter((category) => category.isActive)
                  .map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.name}
                    </option>
                  ))}
              </select>

              {errors.categoryId && (
                <p className="mt-1 text-xs text-red-600">{errors.categoryId}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Article Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  setField("status", e.target.value as ArticleStatus)
                }
                className={inputClass}
              >
                <option value="DRAFT">Draft</option>
                <option value="PENDING">Pending</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div className="space-y-3 border-t pt-4">
              <label className="flex cursor-pointer items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Breaking News
                  </p>
                  <p className="text-xs text-gray-500">
                    Show in breaking news ticker.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={form.isBreaking}
                  onChange={(e) => setField("isBreaking", e.target.checked)}
                  className="h-4 w-4 accent-[#176B45]"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Featured Article
                  </p>
                  <p className="text-xs text-gray-500">
                    Highlight on homepage.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setField("isFeatured", e.target.checked)}
                  className="h-4 w-4 accent-[#176B45]"
                />
              </label>
            </div>
          </section>

          <button
            type="submit"
            disabled={isPending}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#176B45] px-5 text-sm font-semibold text-white transition hover:bg-[#104B34] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}

            {mode === "create" ? "Create Article" : "Save Changes"}
          </button>
        </aside>
      </div>
    </form>
  );
}
