"use client";

import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Power, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { ICategory } from "@/types";

interface CategoryActionsProps {
  category: ICategory;
  isUpdating: boolean;
  onToggleStatus: (category: ICategory) => void;
  onDelete: (category: ICategory) => void;
}

export function CategoryActions({
  category,
  isUpdating,
  onToggleStatus,
  onDelete,
}: CategoryActionsProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(
      `/dashboard/administrator/categories/edit/${category.categoryId}`,
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        aria-label={`Actions for ${category.name}`}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-all hover:border-border hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <MoreHorizontal className="size-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
          <Pencil className="mr-2 size-4" />
          Edit Category
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onToggleStatus(category)}
          disabled={isUpdating}
          className="cursor-pointer"
        >
          <Power className="mr-2 size-4" />
          {isUpdating
            ? "Updating..."
            : category.isActive
              ? "Deactivate"
              : "Activate"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => onDelete(category)}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 size-4" />
          Delete Category
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
