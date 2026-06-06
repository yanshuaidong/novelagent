import type { ComponentType } from "react";

export interface MenuItem {
  key: string;
  title: string;
  icon: ComponentType;
  path: string;
  /** 预留二级侧边栏 */
  children?: MenuItem[];
}
