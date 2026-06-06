import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const collapsed = ref(false)
  const secondaryVisible = ref(false)

  function toggleCollapsed() {
    collapsed.value = !collapsed.value
  }

  function setSecondaryVisible(visible: boolean) {
    secondaryVisible.value = visible
  }

  return {
    collapsed,
    secondaryVisible,
    toggleCollapsed,
    setSecondaryVisible,
  }
})
