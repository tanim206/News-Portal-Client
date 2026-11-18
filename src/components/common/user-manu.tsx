"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useGetMe, useLogout } from "@/hooks";
import type { UserRole } from "@/types";
import { toast } from "../ui/toast";

export default function UserMenu() {
  const { isMobile } = useSidebar();
  const { mutate: logout } = useLogout();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useGetMe();
  const user = data?.data;

  const role: UserRole | undefined = user?.role;

  if (!user || !role) {
    return null;
  }

  // Logout Handler
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "User Logout Successfully",
          description: "Welcome Back",
          type: "success",
        });

        queryClient.clear();
        queryClient.removeQueries({ queryKey: ["user"] });

        router.push("/");
      },

      onError: (err) => {
        toast.add({
          title: "Logout Failed",
          description: err.message || "Something went wrong, Please try again",
          type: "error",
        });
      },
    });
  };

  // User Initials
  const getInitials = (name: string) => {
    return name ? name.substring(0, 2).toUpperCase() : "AD";
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* User Profile Trigger */}

          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="
                  h-12
                  cursor-pointer
                  rounded-lg
                  px-2
                  text-white
                  transition-all duration-200
                  hover:!bg-white/10
                  hover:!text-white
                  data-[state=open]:!bg-white/10
                  data-[state=open]:!text-white
                "
              />
            }
          >
            {/* Avatar */}

            <Avatar className="size-9 shrink-0 rounded-lg border border-white/10">
              <AvatarImage src={user.avatar} alt={user.fullName} />

              <AvatarFallback className="rounded-lg bg-[#1a4d32] font-semibold text-[#a3e635]">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>

            {/* User Information */}

            <div className="grid min-w-0 flex-1 text-left leading-tight">
              <span className="truncate text-sm font-semibold text-white">
                {user.fullName}
              </span>

              <span className="truncate text-xs text-[#a3c2b3]/70">
                {user.email}
              </span>
            </div>

            {/* Dropdown Indicator */}

            <ChevronsUpDown className="ml-auto size-4 shrink-0 text-[#a3c2b3]/70 transition-colors group-hover:text-white" />
          </DropdownMenuTrigger>

          {/* Dropdown Content */}

          <DropdownMenuContent
            className="
              z-50
              w-[--radix-dropdown-menu-trigger-width]
              min-w-56
              overflow-hidden
              rounded-xl
              border border-white/10
              bg-[#0c3a1e]
              p-1.5
              text-white
              shadow-xl
            "
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuGroup>
              {/* User Information Header */}

              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 rounded-lg px-2 py-2.5">
                  <Avatar className="size-10 shrink-0 rounded-lg border border-white/10">
                    <AvatarImage src={user.avatar} alt={user.fullName} />

                    <AvatarFallback className="rounded-lg bg-[#1a4d32] font-semibold text-[#a3e635]">
                      {getInitials(user.fullName)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid min-w-0 flex-1 text-left leading-tight">
                    <span className="truncate text-sm font-semibold text-white">
                      {user.fullName}
                    </span>

                    <span className="truncate text-xs text-[#a3c2b3]/70">
                      {user.email}
                    </span>
                  </div>

                  <ChevronsUpDown className="size-4 shrink-0 text-[#a3c2b3]/70" />
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            {/* Divider */}

            <div className="my-1 h-px bg-white/10" />

            {/* Logout */}

            <DropdownMenuItem
              onClick={handleLogout}
              className="
                flex
                cursor-pointer
                items-center
                gap-2
                rounded-lg
                px-2.5
                py-2
                text-sm
                font-medium
                text-red-300
                transition-colors
                hover:!bg-red-500/10
                hover:!text-red-300
                focus:!bg-red-500/10
                focus:!text-red-300
              "
            >
              <LogOut className="size-4 shrink-0" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
