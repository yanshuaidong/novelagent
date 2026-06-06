import type { Component } from 'vue'

export interface MenuItem {
  key: string
  title: string
  icon: Component
  path: string
  /** 预留二级侧边栏 */
  children?: MenuItem[]
}
