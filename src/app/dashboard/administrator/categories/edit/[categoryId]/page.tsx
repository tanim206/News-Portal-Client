import EditCategoryForm from "@/components/modules/admin/category/EditCategoryForm";

interface EditCategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { categoryId } = await params;

  return <EditCategoryForm categoryId={categoryId} />;
}
