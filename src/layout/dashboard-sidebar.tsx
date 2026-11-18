"use client";

import { useEffect, useState } from "react";
import { LuPanelLeftClose } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { SidebarItems, UserRole } from "@/types";
import { adminRoutes } from "@/routes/admin.route";
import UserMenu from "@/components/common/user-manu";

// ======================================================
// 1. SIDEBAR STYLE CONFIGURATION
// ======================================================

const SIDEBAR_STYLES = {
  // Main Sidebar
  sidebar: {
    background: "bg-[#0c3a1e]",
    text: "text-[#a3c2b3]",
  },

  // Logo
  logo: {
    background: "bg-[#a3c2b3]/10",
    text: "text-white",
    title: "text-white",
    subtitle: "text-[#a3c2b3]/60",
  },

  // Group Heading
  group: {
    text: "text-white/50",
  },

  // Main Menu
  menu: {
    height: "h-10",
    radius: "rounded-lg",
    padding: "px-3",

    inactive: {
      background: "bg-transparent",
      text: "text-[#a3c2b3]/80",
      icon: "text-[#a3c2b3]",
    },

    active: {
      background: "!bg-white/5",
      text: "!text-white",
      icon: "!text-[#a3e635]",
    },

    hover: {
      background: "hover:!bg-[#a3c2b3]/10",
      text: "hover:!text-white",
    },

    transition: "transition-all duration-200",
  },

  // Submenu
  submenu: {
    height: "h-9",
    radius: "rounded-lg",
    padding: "px-3",

    inactive: {
      background: "bg-transparent",
      text: "text-[#a3c2b3]/65",
    },

    active: {
      background: "!bg-[#1a4d32]",
      text: "!text-[#a3e635]",
    },

    hover: {
      background: "hover:!bg-[#a3c2b3]/10",
      text: "hover:!text-white",
    },

    transition: "transition-all duration-200",
  },

  // Submenu Decoration
  submenuDecoration: {
    border: "border-[#a3c2b3]/20",
    arrow: "text-[#a3c2b3]/60",
  },

  // Badge
  badge: {
    background: "bg-[#a3e635]/20",
    text: "text-[#a3e635]",
  },

  // Collapse Button
  collapse: {
    text: "text-[#a3c2b3]/80",
    hover: "hover:bg-[#a3c2b3]/10 hover:text-white",
  },

  // Footer
  footer: {
    background: "bg-[#0c3a1e]",
    border: "border-white/10",
  },
};

// ======================================================
// 2. ROLE BASED ROUTES
// ======================================================

const sidebarRoutes: Partial<Record<UserRole, SidebarItems>> = {
  SUPER_ADMIN: adminRoutes,
  ADMIN: adminRoutes,
};

// ======================================================
// 3. DASHBOARD SIDEBAR
// ======================================================

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();

  const routes: SidebarItems = sidebarRoutes[role] || [];

  // ======================================================
  // 4. ACTIVE ROUTE CHECK
  // ======================================================

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(`${url}/`);
  };

  // ======================================================
  // 5. SUBMENU STATE
  // ======================================================

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};

    routes.forEach((group) => {
      group.items.forEach((item) => {
        const hasActiveChild = item.items?.some((subItem) =>
          isActive(subItem.url),
        );

        if ((item.items && isActive(item.url)) || hasActiveChild) {
          initial[item.title] = true;
        }
      });
    });

    return initial;
  });

  // Automatically Expand Active Parent
  useEffect(() => {
    const activeMenus: Record<string, boolean> = {};

    routes.forEach((group) => {
      group.items.forEach((item) => {
        const hasActiveChild = item.items?.some((subItem) =>
          isActive(subItem.url),
        );

        if (hasActiveChild) {
          activeMenus[item.title] = true;
        }
      });
    });

    setOpenMenus((previous) => ({
      ...previous,
      ...activeMenus,
    }));
  }, [pathname]);

  // Toggle Submenu
  const toggleMenu = (title: string) => {
    setOpenMenus((previous) => ({
      ...previous,
      [title]: !previous[title],
    }));
  };

  // ======================================================
  // 6. MENU STYLE HELPERS
  // ======================================================

  const getMenuClass = (active: boolean) => {
    const style = active
      ? SIDEBAR_STYLES.menu.active
      : SIDEBAR_STYLES.menu.inactive;

    return `
      ${SIDEBAR_STYLES.menu.height}
      ${SIDEBAR_STYLES.menu.radius}
      ${SIDEBAR_STYLES.menu.padding}
      ${SIDEBAR_STYLES.menu.transition}
      ${style.background}
      ${style.text}
      ${SIDEBAR_STYLES.menu.hover.background}
      ${SIDEBAR_STYLES.menu.hover.text}
    `;
  };

  const getSubmenuClass = (active: boolean) => {
    const style = active
      ? SIDEBAR_STYLES.submenu.active
      : SIDEBAR_STYLES.submenu.inactive;

    return `
      ${SIDEBAR_STYLES.submenu.height}
      ${SIDEBAR_STYLES.submenu.radius}
      ${SIDEBAR_STYLES.submenu.padding}
      ${SIDEBAR_STYLES.submenu.transition}
      ${style.background}
      ${style.text}
      ${SIDEBAR_STYLES.submenu.hover.background}
      ${SIDEBAR_STYLES.submenu.hover.text}
    `;
  };

  // ======================================================
  // 7. RENDER
  // ======================================================

  return (
    <Sidebar
      collapsible="icon"
      className="
        [&_[data-sidebar=sidebar]]:bg-[#0c3a1e]
        [&_[data-sidebar=sidebar]]:text-[#a3c2b3]
      "
    >
      {/* SIDEBAR HEADER */}

      <SidebarHeader
        className={`
          ${SIDEBAR_STYLES.sidebar.background}
          ${SIDEBAR_STYLES.sidebar.text}
          px-3 pb-3 pt-3
        `}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex h-10 items-center justify-between gap-2">
              {/* Logo */}

              <Link
                href="/"
                className="
                  flex min-w-0 flex-1 items-center gap-2
                  overflow-hidden
                "
              >
                <div
                  className={`
                    flex size-8 shrink-0 items-center
                    justify-center rounded-lg
                    ${SIDEBAR_STYLES.logo.background}
                    ${SIDEBAR_STYLES.logo.text}
                    text-sm font-bold
                  `}
                >
                  Logo
                </div>
              </Link>

              {/* Collapse Button */}

              <SidebarTrigger
                className={`
                  hidden size-8 shrink-0 rounded-lg
                  ${SIDEBAR_STYLES.collapse.text}
                  ${SIDEBAR_STYLES.collapse.hover}
                  transition-colors
                  md:flex
                `}
              >
                <LuPanelLeftClose className="size-[18px]" />
              </SidebarTrigger>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* SIDEBAR CONTENT */}

      <SidebarContent
        className={`
          ${SIDEBAR_STYLES.sidebar.background}
          ${SIDEBAR_STYLES.sidebar.text}
          px-2
        `}
      >
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="py-2">
            {/* Group Heading */}

            <SidebarGroupLabel
              className={`
                px-3 pb-2 pt-1
                text-[10px] font-semibold
                uppercase tracking-[0.12em]
                ${SIDEBAR_STYLES.group.text}
                group-data-[collapsible=icon]:hidden
              `}
            >
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const hasSubItems = Boolean(
                    item.items && item.items.length > 0,
                  );

                  const active = isActive(item.url);

                  const childActive = Boolean(
                    item.items?.some((subItem) => isActive(subItem.url)),
                  );

                  const parentActive = active || childActive;

                  const isOpen = Boolean(openMenus[item.title]);

                  return (
                    <SidebarMenuItem key={item.title}>
                      {/* PARENT MENU WITH SUBMENU */}

                      {hasSubItems ? (
                        <>
                          <SidebarMenuButton
                            tooltip={item.title}
                            isActive={parentActive}
                            onClick={() => toggleMenu(item.title)}
                            className={getMenuClass(parentActive)}
                          >
                            <item.icon
                              className={`
                                size-[17px] shrink-0
                                ${
                                  parentActive
                                    ? SIDEBAR_STYLES.menu.active.icon
                                    : SIDEBAR_STYLES.menu.inactive.icon
                                }
                              `}
                            />

                            <span
                              className="
                                min-w-0 flex-1 truncate
                                text-xs font-semibold
                                group-data-[collapsible=icon]:hidden
                              "
                            >
                              {item.title}
                            </span>

                            <ChevronRight
                              className={`
                                ml-auto size-4 shrink-0
                                ${SIDEBAR_STYLES.submenuDecoration.arrow}
                                transition-transform duration-200
                                group-data-[collapsible=icon]:hidden
                                ${isOpen ? "rotate-90" : ""}
                              `}
                            />
                          </SidebarMenuButton>

                          {/* Submenu Container */}

                          <div
                            className={`
                              grid
                              transition-[grid-template-rows]
                              duration-200 ease-in-out
                              group-data-[collapsible=icon]:hidden
                              ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                            `}
                          >
                            <div className="overflow-hidden">
                              <SidebarMenuSub
                                className={`
                                  mx-3 mt-1 border-l
                                  ${SIDEBAR_STYLES.submenuDecoration.border}
                                  px-2 py-1
                                `}
                              >
                                {item.items?.map((subItem) => {
                                  const subActive = isActive(subItem.url);

                                  return (
                                    <SidebarMenuSubItem key={subItem.url}>
                                      <SidebarMenuSubButton
                                        isActive={subActive}
                                        render={<Link href={subItem.url} />}
                                        className={getSubmenuClass(subActive)}
                                      >
                                        <span className="truncate text-xs">
                                          {subItem.title}
                                        </span>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  );
                                })}
                              </SidebarMenuSub>
                            </div>
                          </div>
                        </>
                      ) : (
                        /* NORMAL MENU ITEM */

                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={active}
                          render={<Link href={item.url} />}
                          className={getMenuClass(active)}
                        >
                          <item.icon
                            className={`
                              size-[17px] shrink-0
                              ${
                                active
                                  ? SIDEBAR_STYLES.menu.active.icon
                                  : SIDEBAR_STYLES.menu.inactive.icon
                              }
                            `}
                          />

                          <span className="min-w-0 flex-1 truncate text-xs font-medium">
                            {item.title}
                          </span>
                        </SidebarMenuButton>
                      )}

                      {/* MENU BADGE */}

                      {item.badge !== undefined && (
                        <SidebarMenuBadge
                          className={`
                            right-2 rounded-md border-0
                            px-1.5 py-0.5
                            text-[10px] font-semibold
                            ${SIDEBAR_STYLES.badge.background}
                            ${SIDEBAR_STYLES.badge.text}
                          `}
                        >
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* SIDEBAR FOOTER */}

      <SidebarFooter
        className={`
          ${SIDEBAR_STYLES.footer.background}
          ${SIDEBAR_STYLES.footer.border}
          border-t p-2
        `}
      >
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
