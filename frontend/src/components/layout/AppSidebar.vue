<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'

import { mainMenuItems } from '@/config/menu'
import { useSidebarStore } from '@/stores/sidebar'

import SidebarItem from './SidebarItem.vue'

const sidebarStore = useSidebarStore()
</script>

<template>
  <aside class="app-sidebar" :class="{ collapsed: sidebarStore.collapsed }">
    <div class="app-sidebar__header">
      <div class="app-sidebar__brand">
        <img src="/logo.png" alt="小说" class="app-sidebar__logo" />
        <span v-show="!sidebarStore.collapsed" class="app-sidebar__brand-text">小说</span>
      </div>
      <el-button
        class="app-sidebar__toggle"
        :icon="sidebarStore.collapsed ? Expand : Fold"
        text
        @click="sidebarStore.toggleCollapsed"
      />
    </div>

    <nav class="app-sidebar__nav">
      <SidebarItem
        v-for="item in mainMenuItems"
        :key="item.key"
        :item="item"
        :collapsed="sidebarStore.collapsed"
      />
    </nav>

    <!-- 预留二级侧边栏插槽 -->
    <div v-if="sidebarStore.secondaryVisible && !sidebarStore.collapsed" class="app-sidebar__secondary">
      <slot name="secondary" />
    </div>
  </aside>
</template>

<style scoped>
.app-sidebar {
  --sidebar-text: #bfcbd9;
  --sidebar-hover-bg: rgba(255, 255, 255, 0.08);
  --sidebar-active-bg: #409eff;
  --sidebar-active-text: #fff;

  display: flex;
  flex-direction: column;
  width: 220px;
  min-width: 220px;
  height: 100%;
  background-color: #1d1e1f;
  transition: width 0.25s, min-width 0.25s;
  overflow: hidden;
}

.app-sidebar.collapsed {
  width: 64px;
  min-width: 64px;
}

.app-sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.app-sidebar.collapsed .app-sidebar__header {
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  height: auto;
  padding: 10px 0 8px;
}

.app-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.app-sidebar__logo {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  object-fit: contain;
}

.app-sidebar__brand-text {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-sidebar.collapsed .app-sidebar__brand {
  justify-content: center;
}

.app-sidebar__toggle {
  color: var(--sidebar-text);
}

.app-sidebar__nav {
  flex: 1;
  padding: 12px 0;
  overflow-y: auto;
}

.app-sidebar__secondary {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 8px 0;
}
</style>
