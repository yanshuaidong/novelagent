"use client";

import Image from "next/image";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { mainMenuItems } from "@/config/menu";
import { useSidebarStore } from "@/store/sidebar";

import SidebarItem from "./SidebarItem";

export default function AppSidebar() {
  const collapsed = useSidebarStore((s) => s.collapsed);
  const secondaryVisible = useSidebarStore((s) => s.secondaryVisible);
  const toggleCollapsed = useSidebarStore((s) => s.toggleCollapsed);

  return (
    <aside
      className={[
        "flex flex-col h-full bg-[#1d1e1f] overflow-hidden transition-all duration-250",
        collapsed ? "w-16 min-w-16" : "w-[220px] min-w-[220px]",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center justify-between h-14 px-3 border-b border-white/10",
          collapsed ? "flex-col justify-center gap-1 h-auto py-2.5" : "",
        ].join(" ")}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Image
            src="/logo.png"
            alt="小说"
            width={32}
            height={32}
            className="w-8 h-8 shrink-0 object-contain invert"
          />
          {!collapsed && (
            <span className="text-base font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis">
              小说
            </span>
          )}
        </div>
        <button
          type="button"
          className="text-[#bfcbd9] hover:text-white text-lg p-1 cursor-pointer"
          onClick={toggleCollapsed}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        {mainMenuItems.map((item) => (
          <SidebarItem key={item.key} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* 预留二级侧边栏插槽 */}
      {secondaryVisible && !collapsed && (
        <div className="border-t border-white/10 py-2" />
      )}
    </aside>
  );
}
