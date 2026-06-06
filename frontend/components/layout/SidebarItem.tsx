"use client";

import { usePathname, useRouter } from "next/navigation";

import type { MenuItem } from "@/types/menu";

interface SidebarItemProps {
  item: MenuItem;
  collapsed: boolean;
}

export default function SidebarItem({ item, collapsed }: SidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    pathname === item.path || pathname.startsWith(`${item.path}/`);
  const Icon = item.icon;

  return (
    <div
      className={[
        "flex items-center gap-3 mx-2 my-1 px-4 py-3 rounded-lg cursor-pointer transition-colors",
        collapsed ? "justify-center px-3 mx-1.5" : "",
        isActive
          ? "bg-[#409eff] text-white"
          : "text-[#bfcbd9] hover:bg-white/10",
      ].join(" ")}
      title={collapsed ? item.title : undefined}
      onClick={() => router.push(item.path)}
    >
      <span className="text-xl shrink-0 leading-none">
        <Icon />
      </span>
      {!collapsed && (
        <span className="text-sm whitespace-nowrap overflow-hidden">
          {item.title}
        </span>
      )}
    </div>
  );
}
