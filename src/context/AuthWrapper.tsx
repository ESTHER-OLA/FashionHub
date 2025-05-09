"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthWrapper({
  children,
  requireAuth = false,
}: AuthWrapperProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.replace("/login");
    }
  }, [requireAuth, isAuthenticated, router]);

  return <>{children}</>;
}
