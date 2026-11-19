"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { ArrowLeft, Save, Pencil, Info, Eye, Link2 } from "lucide-react";

import { useGetSingleCategory, useUpdateCategory } from "@/hooks/category.hook";

import { updateCategorySchema } from "@/validation/category.validation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

import { toast } from "@/components/ui/toast";
import { CategoryFormSidebar } from "./CategoryFormSidebar";

import type { IUpdateCategoryPayload } from "@/types";

interface EditCategoryFormProps {
  categoryId: string;
}

const categoriesPath = "/categories";

function getFieldError(errors: unknown[]) {
  return errors
    .map((error) =>
      typeof error === "string"
        ? error
        : (error as { message?: string })?.message,
    )
    .filter(Boolean)
    .join(", ");
}

export default function EditCategoryForm({
  categoryId,
}: EditCategoryFormProps) {
  const router = useRouter();

  const {
    data: category,
    isPending: fetching,
    isError,
  } = useGetSingleCategory(categoryId);

  const { mutate: update, isPending: updating } = useUpdateCategory();

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      isActive: true,
    },

    validators: {
      onSubmit: updateCategorySchema,
    },

    onSubmit: ({ value }) => {
      if (!category) return;

      const payload: IUpdateCategoryPayload = {};

      if (value.name.trim() !== category.name) {
        payload.name = value.name.trim();
      }

      if (value.slug.trim().toLowerCase() !== category.slug) {
        payload.slug = value.slug.trim().toLowerCase();
      }

      if (value.isActive !== category.isActive) {
        payload.isActive = value.isActive;
      }

      if (Object.keys(payload).length === 0) {
        toast.add({
          title: "No changes detected",
          description: "Please update at least one field.",
          type: "error",
        });
        return;
      }

      update(
        {
          categoryId: category.categoryId,
          payload,
        },
        {
          onSuccess: () => {
            router.push(categoriesPath);
          },
        },
      );
    },
  });

  useEffect(() => {
    if (!category) return;

    form.reset({
      name: category.name,
      slug: category.slug,
      isActive: category.isActive,
    });
  }, [category, form]);

  if (fetching) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-100">
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-6 py-5 text-sm text-slate-600 shadow-sm">
          <Spinner className="size-5 text-primary" />
          Loading category...
        </div>
      </main>
    );
  }

  if (isError || !category) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Pencil className="size-5" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-800">
            Category not found
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The category may have been deleted or is currently unavailable.
          </p>

          <Link
            href={categoriesPath}
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="size-4" />
            Back to Categories
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] w-full bg-slate-100 px-4 py-7 sm:px-6 lg:px-8">
      <div className="w-full space-y-7">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Pencil className="size-5" />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Edit Category
              </h1>
            </div>

            <p className="text-sm text-slate-500 sm:text-base">
              Update the information for {category.name}.
            </p>
          </div>

          <Link
            href={categoriesPath}
            className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 sm:self-center"
          >
            <ArrowLeft className="size-4" />
            Back to Categories
          </Link>
        </div>

        {/* Main Two Column Layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)]">
          {/* Left: Edit Form */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
            className="min-w-0 space-y-7 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-900">
                Category Information
              </h2>
              <p className="text-sm text-slate-500">
                Update the details of this category.
              </p>
            </div>

            <Separator className="bg-slate-200" />

            {/* Category Name */}
            <form.Field name="name">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <div className="space-y-3">
                    <Label
                      htmlFor={field.name}
                      className="text-sm font-semibold text-slate-800"
                    >
                      Category Name
                      <span className="ml-1 text-destructive">*</span>
                    </Label>

                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      placeholder="Enter category name..."
                      aria-invalid={invalid}
                      disabled={updating}
                      className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15"
                    />

                    {invalid && (
                      <p className="text-sm text-destructive">
                        {getFieldError(field.state.meta.errors)}
                      </p>
                    )}

                    <p className="text-xs text-slate-500">
                      Enter a clear and recognizable category name.
                    </p>
                  </div>
                );
              }}
            </form.Field>

            {/* Category Slug */}
            <form.Field name="slug">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <div className="space-y-3">
                    <Label
                      htmlFor={field.name}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-800"
                    >
                      <Link2 className="size-4 text-primary" />
                      Category Slug
                      <span className="text-destructive">*</span>
                    </Label>

                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      placeholder="Enter category slug..."
                      aria-invalid={invalid}
                      disabled={updating}
                      className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15"
                    />

                    {invalid && (
                      <p className="text-sm text-destructive">
                        {getFieldError(field.state.meta.errors)}
                      </p>
                    )}

                    <p className="text-xs text-slate-500">
                      Use lowercase English letters, numbers and hyphens only.
                    </p>
                  </div>
                );
              }}
            </form.Field>

            <Separator className="bg-slate-200" />

            {/* Visibility */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-800">
                Category Visibility
              </Label>

              <form.Field name="isActive">
                {(field) => (
                  <label className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-slate-300 bg-slate-50/60 p-4 transition-colors hover:border-primary/50 hover:bg-primary/[0.02]">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Eye className="size-5" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <span className="block text-sm font-semibold text-slate-800">
                        Active Category
                      </span>

                      <span className="block text-xs leading-5 text-slate-500">
                        Make this category visible to public visitors.
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.checked)
                      }
                      disabled={updating}
                      className="size-5 shrink-0 cursor-pointer accent-primary"
                    />
                  </label>
                )}
              </form.Field>
            </div>

            {/* Information */}
            <div className="flex items-start gap-3 rounded-lg border border-primary/15 bg-primary/[0.04] p-4">
              <Info className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-sm leading-6 text-slate-600">
                Review your changes before saving. Only the fields you have
                modified will be submitted.
              </p>
            </div>

            <Separator className="bg-slate-200" />

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href={categoriesPath}
                aria-disabled={updating}
                className={`inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 ${
                  updating ? "pointer-events-none opacity-50" : ""
                }`}
              >
                Cancel
              </Link>

              <Button
                type="submit"
                disabled={updating}
                className="h-11 min-w-40 rounded-md px-6 text-sm font-semibold shadow-sm"
              >
                {updating ? (
                  <>
                    <Spinner className="mr-2 size-4" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 size-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Right: Static Sidebar */}
          <CategoryFormSidebar />
        </div>
      </div>
    </main>
  );
}
