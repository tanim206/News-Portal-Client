import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ArticleForm from "@/components/modules/admin/article/article-form";

export default function CreateArticlePage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <Link
          href="/dashboard/administrator/articles"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#176B45]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Link>

        <h1 className="text-2xl font-bold text-gray-900">Create Article</h1>

        <p className="mt-1 text-sm text-gray-500">
          Write and publish a new news article.
        </p>
      </div>

      <ArticleForm mode="create" />
    </div>
  );
}
