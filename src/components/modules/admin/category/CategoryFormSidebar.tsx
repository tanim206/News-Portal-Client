
"use client";

import {
  FolderOpen,
  Link2,
  CheckCircle2,
  Lightbulb,
  Globe,
  FileText,
} from "lucide-react";

export function CategoryFormSidebar() {
  return (
    <aside className="space-y-5">
      {/* Guidelines */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Lightbulb className="size-5" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              Category Guidelines
            </h3>
            <p className="text-xs text-slate-500">
              Helpful tips for creating categories
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            "Choose a short and meaningful category name.",
            "Use a simple and readable URL slug.",
            "Avoid creating duplicate categories.",
            "Keep category names consistent across your portal.",
          ].map((tip, index) => (
            <div key={index} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-sm leading-5 text-slate-600">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slug Example */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Link2 className="size-5" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">URL Slug Example</h3>
            <p className="text-xs text-slate-500">
              How category URLs work
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <p className="mb-2 text-xs text-slate-500">Example URL</p>
          <p className="break-all text-sm font-medium text-primary">
            /category/technology
          </p>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          A slug creates a readable URL for each category. Use lowercase
          English letters and hyphens between words.
        </p>
      </div>

      {/* Publishing Info */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Globe className="size-5" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              Publishing Information
            </h3>
            <p className="text-xs text-slate-500">
              Category visibility
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" />
            <div>
              <p className="text-sm font-medium text-slate-700">
                Active
              </p>
              <p className="text-xs leading-5 text-slate-500">
                Visible to public visitors and available for publishing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <FileText className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-700">
                Inactive
              </p>
              <p className="text-xs leading-5 text-slate-500">
                Hidden from public category listings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Small Footer Card */}
      <div className="rounded-xl border border-primary/15 bg-primary/[0.04] p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FolderOpen className="size-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              News Portal
            </p>
            <p className="text-xs text-slate-500">
              Category Management
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
