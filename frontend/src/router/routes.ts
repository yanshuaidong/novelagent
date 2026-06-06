import type { RouteRecordRaw } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/novel',
    children: [
      {
        path: 'novel',
        name: 'novel',
        component: () => import('@/views/novel/NovelView.vue'),
        meta: { title: '小说' },
      },
      {
        path: 'map',
        name: 'map',
        component: () => import('@/views/map/MapView.vue'),
        meta: { title: '地图' },
      },
      {
        path: 'character',
        name: 'character',
        component: () => import('@/views/character/CharacterView.vue'),
        meta: { title: '人物' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/novel',
  },
]
