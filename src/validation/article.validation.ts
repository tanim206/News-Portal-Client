import { z } from "zod";

const articleStatusSchema = z.enum([
  "DRAFT",
  "PENDING",
  "PUBLISHED",
  "ARCHIVED",
]);

const optionalUrlSchema = z
  .string()
  .trim()
  .url("Enter a valid URL")
  .optional()
  .or(z.literal(""));

const tagsSchema = z
  .array(z.string().trim().min(1))
  .optional()
  .default([]);

export const createArticleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(250, "Title must not exceed 250 characters"),

  excerpt: z
    .string()
    .trim()
    .min(10, "Excerpt must be at least 10 characters")
    .max(500, "Excerpt must not exceed 500 characters"),

  content: z
    .string()
    .min(1, "Article content is required"),

  categoryId: z
    .string()
    .uuid("Please select a valid category"),

  thumbnail: z
    .custom<File>(
      (file) => file instanceof File,
      "Article thumbnail is required",
    ),

  videoUrl: optionalUrlSchema,
  source: z.string().trim().optional(),
  tags: tagsSchema,
  division: z.string().optional(),
  district: z.string().optional(),
  isBreaking: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  status: articleStatusSchema.default("DRAFT"),
});

export const updateArticleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5)
    .max(250)
    .optional(),

  excerpt: z
    .string()
    .trim()
    .min(10)
    .max(500)
    .optional(),

  content: z.string().min(1).optional(),

  categoryId: z.string().uuid().optional(),

  thumbnail: z
    .custom<File>(
      (file) => file instanceof File,
      "Invalid thumbnail file",
    )
    .optional(),

  videoUrl: optionalUrlSchema,
  source: z.string().trim().optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
  division: z.string().optional(),
  district: z.string().optional(),
  isBreaking: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  status: articleStatusSchema.optional(),
});

export type TCreateArticleFormValues = z.infer<
  typeof createArticleSchema
>;

export type TUpdateArticleFormValues = z.infer<
  typeof updateArticleSchema
>;