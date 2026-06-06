<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

import chapterOne from '@/novel/第一章.md?raw'

const md = new MarkdownIt()

const htmlContent = computed(() => {
  const rendered = md.render(chapterOne)
  return DOMPurify.sanitize(rendered)
})
</script>

<template>
  <article class="novel-view">
    <h2 class="novel-view__chapter">第一章</h2>
    <div class="novel-view__content" v-html="htmlContent" />
  </article>
</template>

<style scoped>
.novel-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.novel-view__chapter {
  margin: 0 0 24px;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  text-align: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
}

.novel-view__content {
  font-size: 16px;
  line-height: 2;
  color: #303133;
  text-align: justify;
  word-break: break-all;
}

.novel-view__content :deep(p) {
  margin: 0 0 1em;
  text-indent: 2em;
}
</style>
