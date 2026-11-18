"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetMe } from "@/hooks";

export default function UserProfile() {
  const { data } = useGetMe();
  const user = data?.data;

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name ? name.substring(0, 2).toUpperCase() : "AD";
  };

  return (
    <div className="flex items-center border-l pl-3 gap-2">
      <Avatar className="h-8 w-8 shrink-0 rounded-lg">
        <AvatarImage src={user.avatar} alt={user.fullName} />
        <AvatarFallback className="rounded-full bg-primary text-white font-medium">
          {getInitials(user.fullName)}
        </AvatarFallback>
      </Avatar>

      <div className="hidden sm:grid flex-1 text-left text-sm leading-tight">
        <span className="truncate text-primary font-semibold">
          {user.fullName}
        </span>

        <span className="truncate text-xs text-muted-foreground">
          {user.email}
        </span>
      </div>
    </div>
  );
}
