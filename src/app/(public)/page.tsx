import FeaturedArticles from "@/components/modules/public/article/featured-articles";
import LatestArticles from "@/components/modules/public/article/latest-articles";
import PopularArticles from "@/components/modules/public/article/popular-articles";
import CategoryArticles from "@/components/modules/public/article/category-articles";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[1320px] space-y-10 px-4 py-6">
      {/* Featured News */}
      <FeaturedArticles />

      {/* Latest News and Important News */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LatestArticles />
        </div>

        <div>
          <PopularArticles />
        </div>
      </section>

      {/* Category Wise News */}
      <CategoryArticles />
    </main>
  );
}
