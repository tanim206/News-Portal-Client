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
} from "lucide-react";
import { LuFacebook, LuInstagram, LuLinkedin, LuYoutube } from "react-icons/lu";

// ==========================================
// TYPES
// ==========================================

type Category = {
  name: string;
  slug: string;
};

type NavigationGroup = {
  name: string;
  slug: string;
  children: Category[];
  divisions?: Category[];
};

// ==========================================
// MAIN NAVIGATION
// ==========================================

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
    divisions: [
      { name: "ঢাকা বিভাগ", slug: "dhaka" },
      { name: "চট্টগ্রাম বিভাগ", slug: "chattogram" },
      { name: "রাজশাহী বিভাগ", slug: "rajshahi" },
      { name: "খুলনা বিভাগ", slug: "khulna" },
      { name: "বরিশাল বিভাগ", slug: "barishal" },
      { name: "সিলেট বিভাগ", slug: "sylhet" },
      { name: "রংপুর বিভাগ", slug: "rangpur" },
      { name: "ময়মনসিংহ বিভাগ", slug: "mymensingh" },
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

// ==========================================
// MORE CATEGORIES
// ==========================================

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

// ==========================================
// QUICK LINKS
// ==========================================

const QUICK_LINKS = [
  { name: "সর্বশেষ", href: "/latest" },
  { name: "জনপ্রিয়", href: "/popular" },
  { name: "আর্কাইভ", href: "/archive" },
];

// ==========================================
// SOCIAL LINKS
// ==========================================

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    Icon: LuFacebook,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    Icon: LuInstagram,
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    Icon: LuYoutube,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    Icon: LuLinkedin,
  },
];

// ==========================================
// BREAKING NEWS
// ==========================================

const BREAKING_NEWS = [
  "দেশ ও বিদেশের সর্বশেষ গুরুত্বপূর্ণ সংবাদ",
  "বাংলাদেশের প্রতিটি মুহূর্তের সংবাদ জানতে আমাদের সাথেই থাকুন",
  "রাজনীতি, অর্থনীতি, খেলাধুলা ও বিনোদনের সর্বশেষ আপডেট",
  "সারাদেশের গুরুত্বপূর্ণ সংবাদ একসাথে পড়ুন",
];

// ==========================================
// CATEGORY URL
// ==========================================

const getCategoryUrl = (slug: string) =>
  `/article-category/${encodeURIComponent(slug)}`;

const getDivisionUrl = (slug: string) =>
  `${getCategoryUrl("country")}?division=${encodeURIComponent(slug)}`;

// ==========================================
// DYNAMIC BANGLA DATE
// ==========================================

function getBanglaDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

// ==========================================
// NEWS NAVBAR
// ==========================================

export default function NewsNavbar() {
  const pathname = usePathname();

  const [today, setToday] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(
    null,
  );
  const [moreOpen, setMoreOpen] = useState(false);

  // ----------------------------------------
  // UPDATE DATE
  // ----------------------------------------

  useEffect(() => {
    const updateDate = () => {
      setToday(getBanglaDate());
    };

    updateDate();

    const interval = window.setInterval(updateDate, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  // ----------------------------------------
  // CLOSE MENUS ON ROUTE CHANGE
  // ----------------------------------------

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenMobileCategory(null);
    setMoreOpen(false);
  }, [pathname]);

  // ----------------------------------------
  // MOBILE BODY SCROLL CONTROL
  // ----------------------------------------

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  // ----------------------------------------
  // ACTIVE CATEGORY
  // ----------------------------------------

  const isCategoryActive = (slug: string) => {
    return pathname === getCategoryUrl(slug);
  };

  const isGroupActive = (group: NavigationGroup) => {
    return (
      isCategoryActive(group.slug) ||
      group.children.some((category) => isCategoryActive(category.slug))
    );
  };

  // ----------------------------------------
  // TOGGLE MOBILE CATEGORY
  // ----------------------------------------

  const toggleMobileCategory = (slug: string) => {
    setOpenMobileCategory((current) => (current === slug ? null : slug));
  };

  // ----------------------------------------
  // RENDER
  // ----------------------------------------

  return (
    <header className="relative z-50 w-full bg-white text-[#26352D]">
      {/* ================================== */}
      {/* TOP INFORMATION BAR */}
      {/* ================================== */}

      <div className="hidden bg-[#104B34] text-white lg:block">
        <div className="mx-auto flex h-[36px] max-w-[1320px] items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <span className="size-1.5 rounded-full bg-[#F5C542]" />

            <p className="text-[12px] font-medium tracking-wide text-white/95">
              {today || "আজকের তারিখ"}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-5">
              {QUICK_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[12px] font-medium text-white/90 transition-colors hover:text-[#F5C542]"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="h-4 w-px bg-white/25" />

            <div className="flex items-center gap-1.5">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex size-[25px] items-center justify-center rounded-sm bg-white/10 transition-all hover:bg-[#F5C542] hover:text-[#104B34]"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================================== */}
      {/* BRANDING HEADER */}
      {/* ================================== */}

      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex min-h-[96px] max-w-[1320px] items-center justify-between gap-5 px-4 py-4 md:px-5 lg:min-h-[112px]">
          <Link
            href="/"
            aria-label="হোম পেজ"
            className="flex shrink-0 items-center gap-3"
          >
            <div className="flex size-11 items-center justify-center rounded-md bg-[#176B45] text-white shadow-sm md:size-[54px]">
              <Newspaper size={30} strokeWidth={2} />
            </div>

            <div>
              <h1 className="text-[25px] font-bold leading-none tracking-tight text-[#172D24] sm:text-[29px] md:text-[34px]">
                সংবাদচিত্র
              </h1>

              <p className="mt-1.5 text-[10px] font-semibold tracking-wide text-[#176B45] md:text-[12px]">
                সত্য, ন্যায় ও নির্ভীক সংবাদ
              </p>
            </div>
          </Link>

          {/* ADVERTISEMENT */}
          <div className="hidden h-[76px] w-full max-w-[560px] items-center justify-center rounded-md bg-[#176B45] px-5 text-white md:flex">
            <div className="text-center">
              <p className="text-[19px] font-bold">
                বিজ্ঞাপন দিতে যোগাযোগ করুন
              </p>

              <p className="mt-1 text-[12px] text-white/85">
                আপনার প্রতিষ্ঠানের প্রচারে আমাদের সাথে থাকুন
              </p>
            </div>

            <Link
              href="/advertise"
              className="ml-6 shrink-0 rounded-md bg-white px-5 py-2.5 text-[12px] font-bold text-[#176B45] transition-colors hover:bg-[#F5C542]"
            >
              বিজ্ঞাপন দিন
            </Link>
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/search"
              aria-label="Search"
              className="flex size-10 items-center justify-center rounded-md text-[#176B45] transition-colors hover:bg-[#F0F6F1]"
            >
              <Search size={22} />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              className="flex size-10 items-center justify-center rounded-md bg-[#176B45] text-white transition-colors hover:bg-[#104B34]"
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </div>

      {/* ================================== */}
      {/* DESKTOP MAIN NAVIGATION */}
      {/* ================================== */}

      <nav
        aria-label="Main navigation"
        className="hidden border-b border-[#104B34] bg-[#176B45] text-white shadow-sm lg:block"
      >
        <div className="mx-auto flex min-h-[50px] max-w-[1320px] items-stretch px-5">
          {/* HOME ICON */}
          <Link
            href="/"
            aria-label="Home"
            className={`flex w-[48px] shrink-0 items-center justify-center transition-colors ${
              pathname === "/"
                ? "bg-[#F5C542] text-[#104B34]"
                : "bg-[#104B34] text-white hover:bg-[#F5C542] hover:text-[#104B34]"
            }`}
          >
            <Home size={19} />
          </Link>

          {/* MAIN CATEGORY GROUPS */}
          <div className="flex min-w-0 flex-1 items-stretch">
            {NAVIGATION_GROUPS.map((group) => {
              const active = isGroupActive(group);

              return (
                <div
                  key={group.slug}
                  className="group relative flex shrink-0 items-stretch"
                >
                  <Link
                    href={getCategoryUrl(group.slug)}
                    className={`flex min-h-[50px] items-center gap-1.5 px-3 text-[14px] font-semibold tracking-wide transition-colors xl:px-4 ${
                      active
                        ? "bg-[#104B34] text-[#F5C542]"
                        : "text-white hover:bg-[#104B34] hover:text-[#F5C542]"
                    }`}
                  >
                    {group.name}

                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  </Link>

                  {/* CATEGORY DROPDOWN */}
                  <div className="invisible absolute left-0 top-full z-[80] min-w-[245px] translate-y-2 border-t-[3px] border-[#F5C542] bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {group.children.map((category) => (
                      <Link
                        key={category.slug}
                        href={getCategoryUrl(category.slug)}
                        className={`flex min-h-[42px] items-center justify-between px-4 text-[13px] transition-colors hover:bg-[#F0F6F1] hover:text-[#176B45] ${
                          isCategoryActive(category.slug)
                            ? "bg-[#F0F6F1] font-bold text-[#176B45]"
                            : "font-medium text-[#34443A]"
                        }`}
                      >
                        {category.name}

                        <ChevronRight size={14} className="text-gray-400" />
                      </Link>
                    ))}

                    {/* BANGLADESH DIVISIONS */}
                    {group.divisions && (
                      <>
                        <div className="mx-4 my-2 border-t border-gray-200" />

                        <div className="px-4 pb-2">
                          <p className="text-[12px] font-bold text-[#176B45]">
                            বাংলাদেশের ৮টি বিভাগ
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-1 px-2 pb-1">
                          {group.divisions.map((division) => (
                            <Link
                              key={division.slug}
                              href={getDivisionUrl(division.slug)}
                              className="rounded-sm px-2.5 py-2.5 text-[12px] font-medium text-[#34443A] transition-colors hover:bg-[#F0F6F1] hover:text-[#176B45]"
                            >
                              {division.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* MORE MENU */}
          <div className="group relative flex shrink-0 items-stretch">
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
              className="flex min-h-[50px] items-center gap-2 px-4 text-[14px] font-bold text-white transition-colors hover:bg-[#104B34] hover:text-[#F5C542]"
            >
              আরও
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  moreOpen ? "rotate-180" : "group-hover:rotate-180"
                }`}
              />
            </button>

            {/* MORE DROPDOWN */}
            <div
              className={`invisible absolute right-0 top-full z-[80] w-[min(90vw,540px)] translate-y-2 border-t-[3px] border-[#F5C542] bg-white p-4 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
                moreOpen ? "visible translate-y-0 opacity-100" : ""
              }`}
            >
              <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-[15px] font-bold text-[#176B45]">
                    অন্যান্য বিভাগ
                  </h3>

                  <p className="mt-1 text-[11px] text-gray-500">
                    আরও খবর ও বিষয়ভিত্তিক বিভাগ
                  </p>
                </div>

                <span className="rounded-full bg-[#F0F6F1] px-3 py-1 text-[11px] font-bold text-[#176B45]">
                  {MORE_CATEGORIES.length} বিভাগ
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-3">
                {MORE_CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    href={getCategoryUrl(category.slug)}
                    onClick={() => setMoreOpen(false)}
                    className={`flex min-h-[42px] items-center justify-between border-b border-gray-100 px-2.5 text-[13px] transition-colors hover:bg-[#F0F6F1] hover:text-[#176B45] ${
                      isCategoryActive(category.slug)
                        ? "font-bold text-[#176B45]"
                        : "font-medium text-[#34443A]"
                    }`}
                  >
                    {category.name}

                    <ChevronRight size={13} className="text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <Link
            href="/search"
            aria-label="Search"
            className="ml-1 flex w-[46px] shrink-0 items-center justify-center transition-colors hover:bg-[#104B34] hover:text-[#F5C542]"
          >
            <Search size={19} />
          </Link>
        </div>
      </nav>

      {/* ================================== */}
      {/* TABLET AND MOBILE CATEGORY BAR */}
      {/* ================================== */}

      <div className="border-b border-gray-200 bg-white lg:hidden">
        <div className="scrollbar-none flex items-center overflow-x-auto whitespace-nowrap">
          {NAVIGATION_GROUPS.map((group) => (
            <Link
              key={group.slug}
              href={getCategoryUrl(group.slug)}
              className={`shrink-0 border-r border-gray-100 px-4 py-3.5 text-[14px] font-semibold transition-colors ${
                isGroupActive(group)
                  ? "bg-[#F0F6F1] text-[#176B45]"
                  : "text-[#34443A] hover:bg-[#F0F6F1]"
              }`}
            >
              {group.name}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="shrink-0 px-4 py-3.5 text-[14px] font-bold text-[#176B45]"
          >
            আরও
          </button>
        </div>
      </div>

      {/* ================================== */}
      {/* BREAKING NEWS */}
      {/* ================================== */}

      <div className="mx-auto flex max-w-[1320px] items-stretch overflow-hidden border-b border-gray-200 bg-white">
        <div className="relative z-10 flex shrink-0 items-center bg-[#F5C542] px-3 py-3 text-[12px] font-bold text-[#26352D] md:px-5 md:text-[14px]">
          <span className="mr-2 size-2 animate-pulse rounded-full bg-red-600" />
          ব্রেকিং নিউজ
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="breaking-news-track flex w-max items-center gap-10 whitespace-nowrap px-5 py-3">
            {[...BREAKING_NEWS, ...BREAKING_NEWS].map((news, index) => (
              <Link
                key={index}
                href="/latest"
                className="flex items-center gap-2 text-[12px] font-medium text-[#34443A] transition-colors hover:text-[#176B45] md:text-[13px]"
              >
                <span className="size-1.5 shrink-0 rotate-45 bg-[#F5C542]" />
                {news}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ================================== */}
      {/* MOBILE DRAWER BACKDROP */}
      {/* ================================== */}

      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* ================================== */}
      {/* MOBILE DRAWER */}
      {/* ================================== */}

      <aside
        aria-label="Mobile navigation menu"
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-y-0 left-0 z-[100] flex w-[310px] max-w-[88vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="flex h-[60px] shrink-0 items-center justify-between bg-[#104B34] px-4 text-white">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-[18px] font-bold"
          >
            <Newspaper size={23} />
            সংবাদচিত্র
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="flex size-9 items-center justify-center rounded-md bg-white/10 transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>
        </div>

        {/* DRAWER DATE */}
        <div className="border-b border-gray-200 bg-[#F5F8F5] px-4 py-3">
          <p className="text-[12px] font-semibold text-[#176B45]">
            {today || "আজকের তারিখ"}
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="grid shrink-0 grid-cols-3 border-b border-gray-200">
          {QUICK_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="border-r border-gray-100 px-1 py-3 text-center text-[12px] font-semibold text-[#176B45] last:border-r-0"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* DRAWER CATEGORY LIST */}
        <div className="flex-1 overflow-y-auto">
          {/* HOME */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex min-h-[47px] items-center gap-3 border-b border-gray-100 px-4 text-[14px] font-bold text-[#176B45] transition-colors hover:bg-[#F0F6F1]"
          >
            <Home size={17} />
            হোম
          </Link>

          {/* MAIN CATEGORY GROUPS */}
          {NAVIGATION_GROUPS.map((group) => {
            const expanded = openMobileCategory === group.slug;
            const active = isGroupActive(group);

            return (
              <div key={group.slug} className="border-b border-gray-100">
                {/* CATEGORY NAME + ARROW: BOTH OPEN DROPDOWN */}
                <button
                  type="button"
                  aria-label={`${group.name} subcategories`}
                  aria-expanded={expanded}
                  onClick={() => toggleMobileCategory(group.slug)}
                  className={`flex min-h-[48px] w-full items-center justify-between px-4 text-left text-[14px] font-semibold transition-colors hover:bg-[#F0F6F1] ${
                    active || expanded ? "text-[#176B45]" : "text-[#34443A]"
                  }`}
                >
                  <span>{group.name}</span>

                  <ChevronDown
                    size={19}
                    className={`shrink-0 text-[#176B45] transition-transform duration-200 ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* EXPANDED CATEGORY */}
                {expanded && (
                  <div className="border-t border-gray-100 bg-[#F5F8F5] py-1">
                    {/* RELATED CATEGORIES */}
                    {group.children.map((category) => (
                      <Link
                        key={category.slug}
                        href={getCategoryUrl(category.slug)}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex min-h-[41px] items-center pl-8 pr-4 text-[13px] transition-colors hover:text-[#176B45] ${
                          isCategoryActive(category.slug)
                            ? "font-bold text-[#176B45]"
                            : "text-[#536158]"
                        }`}
                      >
                        <span className="mr-2.5 size-1.5 rounded-full bg-[#F5C542]" />
                        {category.name}
                      </Link>
                    ))}

                    {/* DIVISIONS */}
                    {group.divisions && (
                      <>
                        <div className="mx-5 my-2 border-t border-gray-200" />

                        <p className="px-8 pb-2 text-[12px] font-bold text-[#176B45]">
                          বাংলাদেশের ৮টি বিভাগ
                        </p>

                        <div className="grid grid-cols-2 gap-1 px-5 pb-3">
                          {group.divisions.map((division) => (
                            <Link
                              key={division.slug}
                              href={getDivisionUrl(division.slug)}
                              onClick={() => setMobileMenuOpen(false)}
                              className="rounded-md bg-white px-2 py-2.5 text-[12px] font-medium text-[#34443A] transition-colors hover:bg-[#E8F2EB] hover:text-[#176B45]"
                            >
                              {division.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* MORE CATEGORIES */}
          <div className="border-b border-gray-100">
            <button
              type="button"
              onClick={() => toggleMobileCategory("more")}
              aria-expanded={openMobileCategory === "more"}
              className="flex min-h-[48px] w-full items-center justify-between px-4 text-left text-[14px] font-bold text-[#176B45] transition-colors hover:bg-[#F0F6F1]"
            >
              <span>আরও বিভাগ</span>

              <ChevronDown
                size={19}
                className={`transition-transform duration-200 ${
                  openMobileCategory === "more" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openMobileCategory === "more" && (
              <div className="border-t border-gray-100 bg-[#F5F8F5] py-1">
                {MORE_CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    href={getCategoryUrl(category.slug)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex min-h-[41px] items-center pl-8 pr-4 text-[13px] transition-colors hover:text-[#176B45] ${
                      isCategoryActive(category.slug)
                        ? "font-bold text-[#176B45]"
                        : "text-[#536158]"
                    }`}
                  >
                    <span className="mr-2.5 size-1.5 rounded-full bg-[#F5C542]" />
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DRAWER FOOTER */}
        <div className="shrink-0 border-t border-gray-200 bg-white p-4">
          <p className="mb-3 text-[12px] font-semibold text-gray-500">
            সামাজিক যোগাযোগমাধ্যম
          </p>

          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex size-9 items-center justify-center rounded-md bg-[#F0F6F1] text-[#176B45] transition-colors hover:bg-[#176B45] hover:text-white"
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
