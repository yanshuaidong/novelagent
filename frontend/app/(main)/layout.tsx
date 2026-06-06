"use client";

import { usePathname } from "next/navigation";

import AppSidebar from "@/components/layout/AppSidebar";
import { mainMenuItems } from "@/config/menu";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageTitle =
    mainMenuItems.find((item) => item.path === pathname)?.title ?? "";

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-[#f5f7fa]">
        <header className="h-14 px-6 flex items-center bg-white border-b border-[#e4e7ed] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <h1 className="m-0 text-lg font-semibold text-[#303133]">
            {pageTitle}
          </h1>
        </header>
        <section className="flex-1 px-6 py-5 overflow-auto">{children}</section>
      </main>
    </div>
  );
}
