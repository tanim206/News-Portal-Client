import type { ReactNode } from "react";

import AuthGuard from "@/auth/auth-guard";
import RoleGuard from "@/auth/role-guard";
import DashboardShell from "@/layout/dashboard-shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <RoleGuard roles={["ADMIN", "SUPER_ADMIN"]}>
        <DashboardShell role="ADMIN">{children}</DashboardShell>
      </RoleGuard>
    </AuthGuard>
  );
}
