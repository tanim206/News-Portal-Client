"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Home,
  ChevronDown,
  ChevronRight,
  Newspaper,
  Radio,
} from "lucide-react";
import { LuFacebook, LuInstagram, LuYoutube, LuLinkedin } from "react-icons/lu";

import { useGetBreakingNews } from "@/hooks/article.hook";

// TYPES
type Category = {
  name: string;
  slug: string;
};

type NavigationGroup = {
  name: string;
  slug: string;
  children: Category[];
};

// NAVIGATION CATEGORIES
const NAVIGATION_GROUPS: NavigationGroup[] = [
  {
    name: "জাতীয়",
    slug: "national",
    children: [
      { name: "জাতীয়", slug: "national" },
      { name: "রাজনীতি", slug: "politics" },
    ],
  },
  {
    name: "সারাদেশ",
    slug: "country",
    children: [
      { name: "সারাদেশ", slug: "country" },
      { name: "অপরাধ", slug: "crime" },
      { name: "আইন ও বিচার", slug: "law-and-justice" },
      { name: "দুর্ঘটনা", slug: "accidents" },
      { name: "পরিবেশ", slug: "environment" },
      { name: "কৃষি", slug: "agriculture" },
      { name: "নারী ও শিশু", slug: "women-and-children" },
      { name: "ভোক্তা অধিকার", slug: "consumer-rights" },
    ],
  },
  {
    name: "সিলেট বিভাগ",
    slug: "sylhet-division",
    children: [
      { name: "সিলেট", slug: "sylhet-district" },
      { name: "মৌলভীবাজার", slug: "moulvibazar-district" },
      { name: "হবিগঞ্জ", slug: "habiganj-district" },
      { name: "সুনামগঞ্জ", slug: "sunamganj-district" },
    ],
  },
  {
    name: "আন্তর্জাতিক",
    slug: "international",
    children: [
      { name: "আন্তর্জাতিক", slug: "international" },
      { name: "প্রবাস", slug: "expatriates" },
    ],
  },
  {
    name: "অর্থনীতি",
    slug: "economy",
    children: [
      { name: "অর্থনীতি", slug: "economy" },
      { name: "ব্যবসা-বাণিজ্য", slug: "business" },
    ],
  },
  {
    name: "শিক্ষা",
    slug: "education",
    children: [
      { name: "শিক্ষা", slug: "education" },
      { name: "চাকরি", slug: "jobs" },
    ],
  },
  {
    name: "প্রযুক্তি",
    slug: "technology",
    children: [
      { name: "প্রযুক্তি", slug: "technology" },
      { name: "বিজ্ঞান", slug: "science" },
    ],
  },
  {
    name: "খেলাধুলা",
    slug: "sports",
    children: [
      { name: "খেলাধুলা", slug: "sports" },
      { name: "ক্রিকেট", slug: "cricket" },
      { name: "ফুটবল", slug: "football" },
    ],
  },
  {
    name: "জীবনযাপন",
    slug: "lifestyle",
    children: [
      { name: "জীবনযাপন", slug: "lifestyle" },
      { name: "স্বাস্থ্য", slug: "health" },
      { name: "ধর্ম", slug: "religion" },
      { name: "পর্যটন", slug: "tourism" },
      { name: "আবহাওয়া", slug: "weather" },
    ],
  },
];

const MORE_CATEGORIES: Category[] = [
  { name: "প্রচ্ছদ", slug: "top-news" },
  { name: "বিনোদন", slug: "entertainment" },
  { name: "সংস্কৃতি", slug: "culture" },
  { name: "মতামত", slug: "opinion" },
  { name: "সম্পাদকীয়", slug: "editorial" },
  { name: "সাক্ষাৎকার", slug: "interview" },
  { name: "বিশেষ প্রতিবেদন", slug: "special-report" },
  { name: "ফিচার", slug: "feature" },
  { name: "ফটো গ্যালারি", slug: "photo-gallery" },
  { name: "ভিডিও", slug: "video" },
];

const QUICK_LINKS = [
  { name: "সর্বশেষ", href: "/latest" },
  { name: "জনপ্রিয়", href: "/popular" },
  { name: "আর্কাইভ", href: "/archive" },
];

const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://facebook.com", Icon: LuFacebook },
  { name: "Instagram", href: "https://instagram.com", Icon: LuInstagram },
  { name: "YouTube", href: "https://youtube.com", Icon: LuYoutube },
  { name: "LinkedIn", href: "https://linkedin.com", Icon: LuLinkedin },
];

// CATEGORY URL
const getCategoryUrl = (slug: string) =>
  `/article-category/${encodeURIComponent(slug)}`;

// BANGLA DATE
function getBanglaDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export default function NewsNavbar() {
  const pathname = usePathname();

  const { data: breakingArticles = [], isLoading } = useGetBreakingNews(10);

  const [today, setToday] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setToday(getBanglaDate());

    const interval = window.setInterval(() => {
      setToday(getBanglaDate());
    }, 60000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreOpen(false);
    setOpenMobileCategory(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const isCategoryActive = (slug: string) => pathname === getCategoryUrl(slug);

  const isGroupActive = (group: NavigationGroup) =>
    isCategoryActive(group.slug) ||
    group.children.some((item) => isCategoryActive(item.slug));

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenMobileCategory(null);
  };

  return (
    <header className="relative z-50 w-full bg-white text-[#26352D]">
      {/* TOP BAR */}
      <div className="hidden bg-[#104B34] text-white lg:block">
        <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-between px-5">
          <p className="text-xs font-medium">{today || "আজকের তারিখ"}</p>

          <div className="flex items-center gap-6">
            <div className="flex gap-5">
              {QUICK_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs transition hover:text-[#F5C542]"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex size-7 items-center justify-center rounded bg-white/10 transition hover:bg-[#F5C542] hover:text-[#104B34]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BRAND HEADER */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex min-h-[95px] max-w-[1320px] items-center justify-between gap-4 px-4 py-4 md:px-5">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="সংবাদচিত্র হোম"
          >
            <div className="flex size-11 items-center justify-center rounded-md bg-[#176B45] text-white md:size-[54px]">
              <Newspaper size={30} />
            </div>

            <div>
              <h1 className="text-2xl font-bold leading-none text-[#172D24] md:text-3xl">
                সংবাদচিত্র
              </h1>
              <p className="mt-2 text-[10px] font-semibold text-[#176B45] md:text-xs">
                সত্য, ন্যায় ও নির্ভীক সংবাদ
              </p>
            </div>
          </Link>

          {/* ADVERTISEMENT */}
          <div className="hidden h-[76px] w-full max-w-[560px] items-center justify-center gap-5 rounded-md bg-[#176B45] px-5 text-white md:flex">
            <div className="text-center">
              <p className="text-lg font-bold">বিজ্ঞাপন দিতে যোগাযোগ করুন</p>
              <p className="mt-1 text-xs text-white/80">
                আপনার প্রতিষ্ঠানের প্রচারে আমাদের সাথে থাকুন
              </p>
            </div>

            <Link
              href="/advertise"
              className="shrink-0 rounded bg-white px-5 py-2.5 text-xs font-bold text-[#176B45] hover:bg-[#F5C542]"
            >
              বিজ্ঞাপন দিন
            </Link>
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/search"
              aria-label="Search"
              className="flex size-10 items-center justify-center rounded-md text-[#176B45] hover:bg-[#F0F6F1]"
            >
              <Search size={21} />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-md bg-[#176B45] text-white"
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP NAVIGATION */}
      <nav
        aria-label="Main navigation"
        className="hidden bg-[#176B45] text-white shadow-sm lg:block"
      >
        <div className="mx-auto flex min-h-[50px] max-w-[1320px] items-stretch px-5">
          {/* HOME */}
          <Link
            href="/"
            aria-label="Home"
            className={`flex w-12 shrink-0 items-center justify-center ${
              pathname === "/"
                ? "bg-[#F5C542] text-[#104B34]"
                : "bg-[#104B34] hover:bg-[#F5C542] hover:text-[#104B34]"
            }`}
          >
            <Home size={19} />
          </Link>

          {/* CATEGORY GROUPS */}
          <div className="flex min-w-0 flex-1 items-stretch">
            {NAVIGATION_GROUPS.map((group) => (
              <div
                key={group.slug}
                className="group relative flex shrink-0 items-stretch"
              >
                <Link
                  href={getCategoryUrl(group.slug)}
                  className={`flex items-center gap-1 px-3 text-sm font-semibold transition xl:px-4 ${
                    isGroupActive(group)
                      ? "bg-[#104B34] text-[#F5C542]"
                      : "hover:bg-[#104B34] hover:text-[#F5C542]"
                  }`}
                >
                  {group.name}
                  <ChevronDown
                    size={14}
                    className="transition group-hover:rotate-180"
                  />
                </Link>

                {/* DROPDOWN */}
                <div className="invisible absolute left-0 top-full z-[80] min-w-[220px] translate-y-2 border-t-[3px] border-[#F5C542] bg-white py-2 text-[#26352D] opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {group.children.map((category) => (
                    <Link
                      key={category.slug}
                      href={getCategoryUrl(category.slug)}
                      className={`flex min-h-10 items-center justify-between px-4 text-sm transition hover:bg-[#F0F6F1] hover:text-[#176B45] ${
                        isCategoryActive(category.slug)
                          ? "bg-[#F0F6F1] font-bold text-[#176B45]"
                          : ""
                      }`}
                    >
                      {category.name}
                      <ChevronRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* MORE */}
          <div className="group relative flex shrink-0 items-stretch">
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
              className="flex items-center gap-2 px-4 text-sm font-bold hover:bg-[#104B34] hover:text-[#F5C542]"
            >
              আরও
              <ChevronDown size={15} className={moreOpen ? "rotate-180" : ""} />
            </button>

            <div
              className={`invisible absolute right-0 top-full z-[80] w-[min(90vw,500px)] translate-y-2 border-t-[3px] border-[#F5C542] bg-white p-4 text-[#26352D] opacity-0 shadow-xl transition-all ${
                moreOpen
                  ? "visible translate-y-0 opacity-100"
                  : "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
              }`}
            >
              <h3 className="mb-3 border-b pb-3 font-bold text-[#176B45]">
                অন্যান্য বিভাগ
              </h3>

              <div className="grid grid-cols-2 gap-x-3">
                {MORE_CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    href={getCategoryUrl(category.slug)}
                    onClick={() => setMoreOpen(false)}
                    className="flex min-h-10 items-center justify-between border-b border-gray-100 px-2 text-sm hover:bg-[#F0F6F1] hover:text-[#176B45]"
                  >
                    {category.name}
                    <ChevronRight size={13} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <Link
            href="/search"
            aria-label="Search"
            className="flex w-12 shrink-0 items-center justify-center hover:bg-[#104B34] hover:text-[#F5C542]"
          >
            <Search size={19} />
          </Link>
        </div>
      </nav>

      {/* MOBILE CATEGORY BAR */}
      <div className="border-b border-gray-200 bg-white lg:hidden">
        <div className="flex items-center overflow-x-auto whitespace-nowrap">
          {NAVIGATION_GROUPS.map((group) => (
            <Link
              key={group.slug}
              href={getCategoryUrl(group.slug)}
              className={`shrink-0 border-r border-gray-100 px-4 py-3 text-sm font-semibold ${
                isGroupActive(group)
                  ? "bg-[#F0F6F1] text-[#176B45]"
                  : "text-[#34443A]"
              }`}
            >
              {group.name}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="shrink-0 px-4 py-3 text-sm font-bold text-[#176B45]"
          >
            আরও
          </button>
        </div>
      </div>

      {/* BREAKING NEWS */}
      {!isLoading && breakingArticles.length > 0 && (
        <div className="mx-auto flex max-w-[1320px] items-stretch overflow-hidden border-b border-gray-200 bg-white">
          <div className="flex shrink-0 items-center gap-2 bg-[#F5C542] px-3 py-3 text-xs font-bold text-[#26352D] md:px-5 md:text-sm">
            <Radio size={15} />
            ব্রেকিং নিউজ
          </div>

          <div className="group min-w-0 flex-1 overflow-hidden">
            <div className="breaking-news-track flex w-max items-center gap-8 whitespace-nowrap px-5 py-3">
              {[...breakingArticles, ...breakingArticles].map(
                (article, index) => (
                  <Link
                    key={`${article.articleId}-${index}`}
                    href={`/article/${article.articleId}`}
                    className="text-xs font-semibold text-[#34443A] hover:text-[#176B45] md:text-sm"
                  >
                    <span className="mr-2 text-[#F5C542]">◆</span>
                    {article.title}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BACKDROP */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* MOBILE DRAWER */}
      <aside
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-y-0 left-0 z-[100] flex w-[310px] max-w-[88vw] flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="flex h-[60px] shrink-0 items-center justify-between bg-[#104B34] px-4 text-white">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 text-lg font-bold"
          >
            <Newspaper size={22} />
            সংবাদচিত্র
          </Link>

          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close menu"
            className="flex size-9 items-center justify-center rounded bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* DATE */}
        <div className="border-b bg-[#F5F8F5] px-4 py-3">
          <p className="text-xs font-semibold text-[#176B45]">
            {today || "আজকের তারিখ"}
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="grid shrink-0 grid-cols-3 border-b">
          {QUICK_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className="border-r px-1 py-3 text-center text-xs font-semibold text-[#176B45] last:border-0"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* MOBILE CATEGORIES */}
        <div className="flex-1 overflow-y-auto">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex min-h-12 items-center gap-3 border-b px-4 text-sm font-bold text-[#176B45]"
          >
            <Home size={17} />
            হোম
          </Link>

          {NAVIGATION_GROUPS.map((group) => {
            const expanded = openMobileCategory === group.slug;

            return (
              <div key={group.slug} className="border-b">
                <div className="flex min-h-12 items-center">
                  <Link
                    href={getCategoryUrl(group.slug)}
                    onClick={closeMobileMenu}
                    className="flex-1 px-4 text-sm font-semibold text-[#34443A]"
                  >
                    {group.name}
                  </Link>

                  <button
                    type="button"
                    aria-label={`${group.name} subcategories`}
                    aria-expanded={expanded}
                    onClick={() =>
                      setOpenMobileCategory(expanded ? null : group.slug)
                    }
                    className="flex h-12 w-12 items-center justify-center text-[#176B45]"
                  >
                    <ChevronDown
                      size={19}
                      className={`transition-transform ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {expanded && (
                  <div className="border-t bg-[#F5F8F5] py-1">
                    {group.children.map((category) => (
                      <Link
                        key={category.slug}
                        href={getCategoryUrl(category.slug)}
                        onClick={closeMobileMenu}
                        className="flex min-h-10 items-center px-8 text-sm text-[#536158] hover:text-[#176B45]"
                      >
                        <span className="mr-2 size-1.5 rounded-full bg-[#F5C542]" />
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* MORE CATEGORIES */}
          <div className="border-b">
            <button
              type="button"
              onClick={() =>
                setOpenMobileCategory(
                  openMobileCategory === "more" ? null : "more",
                )
              }
              className="flex min-h-12 w-full items-center justify-between px-4 text-sm font-bold text-[#176B45]"
            >
              আরও বিভাগ
              <ChevronDown
                size={19}
                className={openMobileCategory === "more" ? "rotate-180" : ""}
              />
            </button>

            {openMobileCategory === "more" && (
              <div className="border-t bg-[#F5F8F5] py-1">
                {MORE_CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    href={getCategoryUrl(category.slug)}
                    onClick={closeMobileMenu}
                    className="flex min-h-10 items-center px-8 text-sm text-[#536158] hover:text-[#176B45]"
                  >
                    <span className="mr-2 size-1.5 rounded-full bg-[#F5C542]" />
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DRAWER FOOTER */}
        <div className="shrink-0 border-t p-4">
          <p className="mb-3 text-xs font-semibold text-gray-500">
            সামাজিক যোগাযোগমাধ্যম
          </p>

          <div className="flex gap-2">
            {SOCIAL_LINKS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex size-9 items-center justify-center rounded-md bg-[#F0F6F1] text-[#176B45] hover:bg-[#176B45] hover:text-white"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </header>
  );
}
