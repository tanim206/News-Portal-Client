import type { Metadata } from "next";
import CategoryPageContent from "@/components/modules/public/category/category-page-content";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${decodeURIComponent(slug)} | সংবাদচিত্র`,
    description: `${decodeURIComponent(slug)} বিভাগের সর্বশেষ সংবাদ ও প্রতিবেদন পড়ুন।`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  return <CategoryPageContent slug={decodeURIComponent(slug)} />;
}
