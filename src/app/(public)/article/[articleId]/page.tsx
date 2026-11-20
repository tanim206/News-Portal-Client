import { notFound } from "next/navigation";

import { getSinglePublishedArticle } from "@/api/article.api";

interface ArticleDetailsPageProps {
  params: Promise<{
    articleId: string;
  }>;
}

export default async function ArticleDetailsPage({
  params,
}: ArticleDetailsPageProps) {
  const { articleId } = await params;

  let article;

  try {
    article = await getSinglePublishedArticle(articleId);
  } catch {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-4">
        <p className="text-sm text-green-700">{article.category?.name}</p>

        <h1 className="mt-2 text-3xl font-bold leading-tight">
          {article.title}
        </h1>

        <p className="mt-3 text-gray-600">{article.excerpt}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
        

          <span>Views: {article.views}</span>

          <span>{new Date(article.createdAt).toLocaleDateString("en-US")}</span>
        </div>
      </div>

      <div className="my-6 overflow-hidden rounded-xl">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="h-auto w-full object-cover"
        />
      </div>

      {article.videoUrl && (
        <div className="mb-8">
          <a
            href={article.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 underline"
          >
            Watch Video
          </a>
        </div>
      )}

      <article className="prose prose-lg max-w-none">{article.content}</article>

      {article.source && (
        <p className="mt-8 text-sm text-gray-500">Source: {article.source}</p>
      )}

      {article.tags?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {article.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </main>
  );
}
