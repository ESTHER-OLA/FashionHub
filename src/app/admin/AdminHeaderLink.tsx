"use client";
import React from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminHeaderLink: React.FC = () => {
  // const { user } = useAuth();
  // const { admin, isAdmin, adminLogout } = ();

  if (!user) {
    // Don't show admin link if user is not logged in
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hidden md:flex">
          <Settings className="h-4 w-4 mr-1" />
          {isAdmin ? "Admin" : "Admin Access"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Admin Panel</DropdownMenuLabel>
        {isAdmin ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/products">Products</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/orders">Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => adminLogout()}>
              Logout from Admin
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin/login">Admin Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/signup">Admin Signup</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminHeaderLink;
