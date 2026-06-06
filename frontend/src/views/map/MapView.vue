<script setup lang="ts">
import { ref } from 'vue'

import { useChinaMap } from './useChinaMap'

const chartRef = ref<HTMLElement | null>(null)
const { loading, error } = useChinaMap(chartRef)
</script>

<template>
  <div class="map-view">
    <div ref="chartRef" class="map-view__chart" />
    <div v-if="loading" class="map-view__overlay">
      <el-skeleton :rows="12" animated />
    </div>
    <el-alert
      v-if="error"
      class="map-view__error"
      :title="error"
      type="error"
      show-icon
    />
  </div>
</template>

<style scoped>
.map-view {
  position: relative;
  height: 100%;
  min-height: 560px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 16px;
}

.map-view__chart {
  width: 100%;
  height: calc(100vh - 160px);
  min-height: 520px;
}

.map-view__overlay {
  position: absolute;
  inset: 16px;
  display: flex;
  align-items: center;
  background-color: #fff;
  z-index: 1;
}

.map-view__error {
  position: absolute;
  top: 24px;
  left: 24px;
  right: 24px;
  z-index: 2;
}
</style>
