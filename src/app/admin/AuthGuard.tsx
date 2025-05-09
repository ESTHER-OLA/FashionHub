"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin, isLoading } = useAdmin();

  const publicPaths = [
    "/admin/login",
    "/admin/signup",
    "/admin/forgot-password",
  ];

  useEffect(() => {
    if (!isLoading && !isAdmin && !publicPaths.includes(pathname)) {
      router.push("/admin/login");
    }
  
    // ✅ If already logged in and on a public path, redirect to /admin
    if (!isLoading && isAdmin && publicPaths.includes(pathname)) {
      router.push("/admin");
    }
  }, [isAdmin, isLoading, pathname, router]);  

  // useEffect(() => {
  //   if (!isLoading && !isAdmin && !publicPaths.includes(pathname)) {
  //     router.push("/admin/login");
  //   }
  // }, [isAdmin, isLoading, pathname, router]);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Loading...
  //     </div>
  //   );
  // }

  // Allow rendering public paths even if not logged in
  if (!isAdmin && !publicPaths.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}
