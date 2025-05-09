"use client";

import { usePathname, useRouter } from "next/navigation";
// import { useAdmin } from "@/context/AdminContext";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Users,
  Package,
  Home,
  LogOut,
  Settings,
  BarChart4,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import DashboardHeader from "@/components/DashboardHeader";

export default function AdminSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { admin } = useAdmin();
  const pathname = usePathname();
  const router = useRouter();

  const publicPaths = [
    "/admin/login",
    "/admin/signup",
    "/admin/forgot-password",
  ];

  if (publicPaths.includes(pathname)) {
    return <>{children}</>; // Do not show sidebar
  }

  const navItems = [
    { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/stats", icon: BarChart4, label: "Stats" },
    { href: "/admin/users", icon: Users, label: "Users" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("fashionAdmin");
    router.replace("/admin/login");
  };

  return (
    <>
      <div className="flex min-h-screen bg-muted/50">
        <Card className="w-64 rounded-none border-r border-border">
          <div className="p-2 border-b border-border">
            <h2 className="text-xl font-bold text-primary">FashionHub Admin</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`flex items-center gap-3 text-sm font-medium transition px-3 py-2 rounded-md
                    ${
                      isActive
                        ? "bg-muted text-primary font-semibold"
                        : "text-muted-foreground hover:text-primary hover:bg-muted"
                    }
                  `}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="mt-8 justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </nav>
          </ScrollArea>
        </Card>

        {/* Main Content */}
        <div className="flex-1 ">
          <DashboardHeader />
          <div className="p-4"> {children}</div>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
