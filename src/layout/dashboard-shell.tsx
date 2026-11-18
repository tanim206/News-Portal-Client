"use client";

import type { ReactNode, CSSProperties } from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import type { UserRole } from "@/types/user.type";

import { DashboardSidebar } from "./dashboard-sidebar";
import UserProfile from "@/components/common/user-profile";

export default function DashboardShell({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) {
  const dashboardTitle =
    role === "ADMIN" || role === "SUPER_ADMIN"
      ? "Dashboard"
      : `${String(role).replaceAll("_", " ")} Dashboard`;

  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "4.25rem",
        } as CSSProperties
      }
    >
      <DashboardSidebar role={role} />

      <SidebarInset className="min-h-svh min-w-0 bg-background">
        {/* Dashboard Header */}
        <header
          className="
            sticky top-0 z-40 flex h-16 shrink-0
            items-center justify-between gap-3
            border-b border-border
            bg-background/95 px-3 backdrop-blur-xl
            sm:px-5 lg:px-7
          "
        >
          {/* Left Section */}
          <div className="flex min-w-0 items-center gap-3">
            {/* Mobile Sidebar Toggle */}
            <SidebarTrigger
              className="
                flex size-9 shrink-0 items-center justify-center
                rounded-lg border border-border
                text-foreground transition-colors
                hover:bg-muted
                md:hidden
              "
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {dashboardTitle}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex shrink-0 items-center gap-2">
            <UserProfile />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="min-w-0 flex-1">
          <div
            className="
              mx-auto flex w-full max-w-[1800px]
              flex-col gap-5
              p-3 sm:gap-6 sm:p-5 lg:p-7
            "
          >
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
