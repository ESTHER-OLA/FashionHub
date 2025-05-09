"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const HeaderWrapper = () => {
  const pathname = usePathname();
  const noHeaderPages = [
    "/admin",
    "/admin/login",
    "/admin/signup",
    "/admin/dashboard",
    "/admin/products",
    "/admin/orders",
    "/admin/stats",
    "/admin/users",
    "/admin/settings",
    "/admin/notifications",
  ];

  return !noHeaderPages.includes(pathname) ? <Header /> : null;
};

export default HeaderWrapper;
