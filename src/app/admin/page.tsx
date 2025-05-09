"use client";
import { useAdmin } from "@/context/AdminContext";
import AdminDashboardPage from "./dashboard/page";

export default function AdminHome() {
  const { isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <AdminDashboardPage />
    </>
  );
}
