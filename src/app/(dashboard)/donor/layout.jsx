"use client";

import AppHeader from "@/src/layout/AppHeader";
import AppSidebar from "@/src/layout/AppSidebar";
import Backdrop from "@/src/layout/Backdrop";
import { useSidebar } from "@/src/context/SidebarContext";
import AppFooter from "@/src/layout/AppFooter";

export default function DonorLayout({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[260px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar role="donor" />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <main className="p-4 md:p-6">{children}</main>
        <AppFooter/>
      </div>
    </div>
  );
}
