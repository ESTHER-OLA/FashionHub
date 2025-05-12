"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";

const publicPaths = [
  "/admin/login",
  "/admin/signup",
  "/admin/forgot-password",
];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin, isLoading } = useAdmin();


  useEffect(() => {
    if (!pathname) return;

    if (!isLoading && !isAdmin && !publicPaths.includes(pathname)) {
      router.push("/admin/login");
    }

    if (!isLoading && isAdmin && publicPaths.includes(pathname)) {
      router.push("/admin");
    }
  }, [isAdmin, isLoading, pathname, router]); // ✅ clean deps

  // Also add null check here to prevent crash on initial render
  if (!pathname || (!isAdmin && !publicPaths.includes(pathname))) {
    return null;
  }

  return <>{children}</>;
}
