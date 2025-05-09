"use client";

import { AdminProvider } from "@/context/AdminContext";
import AuthGuard from "./AuthGuard";
import AppSidebar from "@/components/AppSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AuthGuard>
        <AppSidebar>{children}</AppSidebar>
      </AuthGuard>
    </AdminProvider>
  );
}
