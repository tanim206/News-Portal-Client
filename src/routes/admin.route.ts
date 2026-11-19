import {
  LayoutDashboard,
  Newspaper,
  FilePlus2,
  Flame,
  Star,
  LayoutGrid,
  MapPin,
  Tags,
  Megaphone,
  Image as ImageIcon,
  UserCog,
  KeyRound,
  Settings,
  Globe,
} from "lucide-react";
import type { SidebarItems } from "@/types/sidebar.type";

// const prefix = "/dashboard/administrator";

export const adminRoutes: SidebarItems = [
  // ১. ওভারভিউ এবং অ্যানালিটিক্স
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/administrator",
        icon: LayoutDashboard,
      },
    ],
  },

  // ২. কন্টেন্ট ও আর্টিকেল ম্যানেজমেন্ট (মূল অংশ)
  {
    title: "Editorial & Content",
    items: [
      {
        title: "All Articles",
        url: `/articles`,
        icon: Newspaper,
      },
      {
        title: "Create Article",
        url: `/articles/create`,
        icon: FilePlus2,
      },
      {
        title: "Breaking News",
        url: `/articles/breaking`,
        icon: Flame,
      },
      {
        title: "Featured / Lead News",
        url: `/articles/featured`,
        icon: Star,
      },
    ],
  },

  // ৩. ক্যাটাগরি ও লোকেশন অর্গানাইজেশন
  {
    title: "Taxonomy & Location",
    items: [
      {
        title: "Categories",
        url: `/categories`,
        icon: LayoutGrid,
      },
      {
        title: "Divisions & Districts",
        url: `/locations`,
        icon: MapPin,
      },
      {
        title: "Tags & Keywords",
        url: `/tags`,
        icon: Tags,
      },
    ],
  },

  // ৪. মিডিয়া ও বিজ্ঞাপন ম্যানেজমেন্ট (নিউজ পোর্টালের আয়ের উৎস)
  {
    title: "Media & Ads",
    items: [
      {
        title: "Media Gallery",
        url: `$/media`,
        icon: ImageIcon,
      },
      {
        title: "Ad Placements",
        url: `/ads`,
        icon: Megaphone,
      },
    ],
  },

  // ৫. অ্যাডমিন অ্যাকাউন্ট ও সাইট সেটিংস
  {
    title: "Settings & Security",
    items: [
      {
        title: "Admin Profile",
        url: `/profile`,
        icon: UserCog,
      },
      {
        title: "Change Password",
        url: `/change-password`,
        icon: KeyRound,
      },
      {
        title: "Portal Settings",
        url: `/settings`,
        icon: Settings,
      },
      {
        title: "Visit Live Site",
        url: "/",
        icon: Globe,
      },
    ],
  },
];
