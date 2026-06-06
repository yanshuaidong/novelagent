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
        <section className="flex-1 overflow-auto">{children}</section>
      </main>
    </div>
  );
}
