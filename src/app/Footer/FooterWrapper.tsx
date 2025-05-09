"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const FooterWrapper = () => {
  const pathname = usePathname();
  const noFooterPages = [
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

  return !noFooterPages.includes(pathname) ? <Footer /> : null;
};

export default FooterWrapper;
