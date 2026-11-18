
import RoleGuard from "@/auth/role-guard";
import DashboardShell from "@/layout/dashboard-shell";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["ADMIN", "SUPER_ADMIN"]}>
      <DashboardShell role="ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
}
