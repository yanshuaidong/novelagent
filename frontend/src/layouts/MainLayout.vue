<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AppSidebar from '@/components/layout/AppSidebar.vue'

const route = useRoute()

const pageTitle = computed(() => (route.meta.title as string) ?? '')
</script>

<template>
  <div class="main-layout">
    <AppSidebar />
    <main class="main-layout__content">
      <header class="main-layout__header">
        <h1 class="main-layout__title">{{ pageTitle }}</h1>
      </header>
      <section class="main-layout__body">
        <router-view />
      </section>
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-layout__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: #f5f7fa;
}

.main-layout__header {
  height: 56px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.main-layout__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.main-layout__body {
  flex: 1;
  padding: 20px 24px;
  overflow: auto;
}
</style>
