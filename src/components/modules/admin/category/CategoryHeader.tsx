"use client";

import { Plus, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface CategoryHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  // onAdd: () => void;
}

export function CategoryHeader({
  search,
  onSearchChange,
  // onAdd,
}: CategoryHeaderProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Categories</h1>

        <p className="text-sm text-muted-foreground">
          Manage and organize your news categories.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search categories..."
            className="h-10 pl-9 pr-9"
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <Link
          href="/categories/create"
          className="h-10 bg-primary flex justify-center items-center px-4 text-white rounded-lg text-sm shrink-0"
        >
          <Plus className="mr-2 size-4" />
          Add Category
        </Link>
      </div>
    </div>
  );
}
