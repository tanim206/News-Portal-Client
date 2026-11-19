import { z } from "zod";

const slugSchema = z
  .string()
  .trim()
  .min(2, "Slug must be at least 2 characters")
  .max(120, "Slug must not exceed 120 characters")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase English letters, numbers and hyphens only",
  );

const bengaliNameSchema = z
  .string()
  .trim()
  .min(2, "Category name must be at least 2 characters")
  .max(100, "Category name must not exceed 100 characters")
  .regex(
    /^[\u0980-\u09FF\s\u0964\u0020-\u007E]+$/,
    "Enter a valid Bengali or English category name",
  );

export const createCategorySchema = z.object({
  name: bengaliNameSchema,
  slug: slugSchema,
  isActive: z.boolean(),
});

export const updateCategorySchema = createCategorySchema;
