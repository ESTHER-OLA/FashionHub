"use client";

import { useAdmin } from "@/context/AdminContext";
import { usePathname } from "next/navigation";

const titlesMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/orders": "Orders",
  "/admin/stats": "Stats",
  "/admin/users": "Users",
  "/admin/settings": "Settings",
};

export default function DashboardHeader() {
  const { admin } = useAdmin();
  const pathname = usePathname();

  const title = pathname ? titlesMap[pathname] : "Dashboard";

  return (
    <div className="border-b border-border bg-white p-6 shadow-sm mb-4">
      <div className="flex justify-between items-center dashboardHeader">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {admin?.name && (
          <div className="text-sm text-muted-foreground">
            Welcome, <span className="font-medium">{admin.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
