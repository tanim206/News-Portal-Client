import { LucideIcon } from "lucide-react";

export type SidebarItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
  items?: { title: string; url: string }[]; // সাব-মেনুর জন্য
};

export type SidebarGroup = {
  title: string;
  items: SidebarItem[];
};

export type SidebarItems = SidebarGroup[];