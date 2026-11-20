import type { ReactNode } from "react";
import CategoryNavbar from "@/components/shared/Nabvar";
import NewsNavbar from "@/components/shared/Nabvar";
import BreakingNews from "@/components/modules/public/article/breaking-news";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <NewsNavbar />
     
      {children}
    </div>
  );
}
