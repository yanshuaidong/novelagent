<script setup lang="ts">
import { ref } from 'vue'

import { useCharacterGraph } from './useCharacterGraph'

const graphRef = ref<HTMLElement | null>(null)
useCharacterGraph(graphRef)
</script>

<template>
  <div class="character-view">
    <p class="character-view__hint">人物父子关系架构图（示例数据，可后续接入真实人物库）</p>
    <div ref="graphRef" class="character-view__graph" />
  </div>
</template>

<style scoped>
.character-view {
  height: 100%;
  min-height: 560px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.character-view__hint {
  margin: 0 0 12px;
  font-size: 13px;
  color: #909399;
}

.character-view__graph {
  flex: 1;
  min-height: 520px;
}
</style>
