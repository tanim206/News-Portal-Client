import type { ReactNode } from "react";
import CategoryNavbar from "@/components/shared/Nabvar";
import NewsNavbar from "@/components/shared/Nabvar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <NewsNavbar
        // categories={categories}
        // isLoading={isLoading}
        // breakingNews={breakingNews}
      />
      {children}
    </div>
  );
}
