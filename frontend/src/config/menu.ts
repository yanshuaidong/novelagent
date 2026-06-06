import { Document, MapLocation, User } from '@element-plus/icons-vue'

import type { MenuItem } from '@/types/menu'

export const mainMenuItems: MenuItem[] = [
  {
    key: 'novel',
    title: '小说',
    icon: Document,
    path: '/novel',
    // children: [{ key: 'chapter-1', title: '第一章', ... }]  // 后期二级侧边栏
  },
  {
    key: 'map',
    title: '地图',
    icon: MapLocation,
    path: '/map',
  },
  {
    key: 'character',
    title: '人物',
    icon: User,
    path: '/character',
  },
]
