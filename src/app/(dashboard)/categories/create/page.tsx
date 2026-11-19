"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { ArrowLeft, Plus, Save, Info, Eye, Link2 } from "lucide-react";

import { useCreateCategory } from "@/hooks/category.hook";
import { createCategorySchema } from "@/validation/category.validation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

import { CategoryFormSidebar } from "@/components/modules/admin/category/CategoryFormSidebar";

const categoriesPath = "/dashboard/administrator/categories";

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

export default function CreateCategoryPage() {
  const { mutate: create, isPending } = useCreateCategory();

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      isActive: true,
    },

    validators: {
      onSubmit: createCategorySchema,
    },

    onSubmit: ({ value }) => {
      create({
        name: value.name.trim(),
        slug: value.slug.trim().toLowerCase(),
        isActive: value.isActive,
      });
    },
  });

  return (
    <main className="min-h-[calc(100vh-4rem)] w-full px-4 py-7 sm:px-6 lg:px-8">
      <div className="w-full space-y-7">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Plus className="size-5" />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Add a Category
              </h1>
            </div>

            <p className="text-sm text-slate-500 sm:text-base">
              Create a new category to organize your news articles.
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
          {/* Left: Form */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
            className="min-w-0 space-y-7 rounded-lg border border-slate-200 bg-white p-5 shadow sm:p-7 lg:p-8"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-900">
                Category Information
              </h2>
              <p className="text-sm text-slate-500">
                Enter the details for your new category.
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
                      disabled={isPending}
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
                      disabled={isPending}
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
                      disabled={isPending}
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
                The category slug will be used in the category URL. Make sure
                the name and slug are correct before creating.
              </p>
            </div>

            <Separator className="bg-slate-200" />

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href={categoriesPath}
                aria-disabled={isPending}
                className={`inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 ${
                  isPending ? "pointer-events-none opacity-50" : ""
                }`}
              >
                Cancel
              </Link>

              <Button
                type="submit"
                disabled={isPending}
                className="h-11 min-w-40 rounded-md px-6 text-sm font-semibold shadow-sm"
              >
                {isPending ? (
                  <>
                    <Spinner className="mr-2 size-4" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 size-4" />
                    Create Category
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
