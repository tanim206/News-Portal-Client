"use client"

import { useEffect } from "react"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { useUpdateCategory } from "@/hooks"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { updateCategorySchema } from "@/validation"
import type { ICategory, IUpdateCategoryPayload } from "@/types"

interface EditCategoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: ICategory | null
  onSuccess: () => void
}

export function EditCategoryModal({
  open,
  onOpenChange,
  category,
  onSuccess,
}: EditCategoryModalProps) {
  const { mutate: update, isPending } = useUpdateCategory()

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
      if (!category) return
      const payload: IUpdateCategoryPayload = {}
      if (value.name !== undefined && value.name !== category.name) {
        payload.name = value.name.trim()
      }
      if (value.slug !== undefined && value.slug !== category.slug) {
        payload.slug = value.slug.trim().toLowerCase()
      }
      if (value.isActive !== undefined && value.isActive !== category.isActive) {
        payload.isActive = value.isActive
      }

      update({ categoryId: category.categoryId, payload })
    },
  })

  // Pre-fill the form whenever the selected category changes.
  useEffect(() => {
    if (category && open) {
      form.reset({
        name: category.name,
        slug: category.slug,
        isActive: category.isActive,
      })
    }
  }, [category, open, form])

  if (!category || !open) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogDescription>
          Update the details for <strong>{category.name}</strong>.
        </DialogDescription>

        <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }}>
          <FieldGroup className="mt-4">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>
                      ক্যাটাগরির নাম (বাংলায়)
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="যেমন: রাজনীতি, খেলাধুলা, প্রযুক্তি"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="slug">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>Slug</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="e.g. politics, sports, technology"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    <p className="text-xs text-muted-foreground">
                      Lowercase letters, numbers and hyphens only.
                    </p>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <div className="flex items-center gap-2 pt-1">
              <input
                id="isActive"
                checked={form.state.values.isActive}
                onChange={() =>
                  form.setFieldValue(
                    "isActive",
                    !form.state.values.isActive
                  )
                }
                className="rounded border-gray-300 bg-[#0f172a] text-primary focus:ring-0 h-4 w-4 cursor-pointer appearance-none"
              />
              <Label htmlFor="isActive" className="text-sm cursor-pointer">
                Is Active
              </Label>
            </div>
          </FieldGroup>

          <Separator className="my-4" />

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !form.state.isValid}
            >
              {isPending ? (
                <>
                  <Spinner className="mr-2 size-3.5" /> Updating…
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
