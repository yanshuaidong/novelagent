<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { MenuItem } from '@/types/menu'

const props = defineProps<{
  item: MenuItem
  collapsed: boolean
}>()

const route = useRoute()
const router = useRouter()

const isActive = computed(() => route.path === props.item.path)

function navigate() {
  router.push(props.item.path)
}
</script>

<template>
  <div
    class="sidebar-item"
    :class="{ active: isActive, collapsed }"
    :title="collapsed ? item.title : undefined"
    @click="navigate"
  >
    <el-icon class="sidebar-item__icon">
      <component :is="item.icon" />
    </el-icon>
    <span v-show="!collapsed" class="sidebar-item__title">{{ item.title }}</span>
  </div>
</template>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--sidebar-text);
  transition: background-color 0.2s, color 0.2s;
}

.sidebar-item:hover {
  background-color: var(--sidebar-hover-bg);
}

.sidebar-item.active {
  background-color: var(--sidebar-active-bg);
  color: var(--sidebar-active-text);
}

.sidebar-item.collapsed {
  justify-content: center;
  padding: 12px;
  margin: 4px 6px;
}

.sidebar-item__icon {
  font-size: 20px;
  flex-shrink: 0;
}

.sidebar-item__title {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
}
</style>
