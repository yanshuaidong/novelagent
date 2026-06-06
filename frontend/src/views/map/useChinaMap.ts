import { nextTick, onMounted, onUnmounted, ref, type Ref } from 'vue'
import * as echarts from 'echarts'

const CHINA_GEO_URL =
  'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'

export function useChinaMap(containerRef: Ref<HTMLElement | null>) {
  let chart: echarts.ECharts | null = null

  const loading = ref(true)
  const error = ref<string | null>(null)

  async function waitForContainerSize() {
    await nextTick()
    for (let i = 0; i < 10; i++) {
      const el = containerRef.value
      if (el && el.clientWidth > 0 && el.clientHeight > 0) return el
      await new Promise((resolve) => requestAnimationFrame(resolve))
    }
    return containerRef.value
  }

  async function initChart() {
    try {
      loading.value = true
      error.value = null

      const response = await fetch(CHINA_GEO_URL)
      if (!response.ok) {
        throw new Error('地图数据加载失败')
      }
      const chinaJson = await response.json()
      echarts.registerMap('china', chinaJson)

      const container = await waitForContainerSize()
      if (!container || container.clientWidth === 0 || container.clientHeight === 0) {
        throw new Error('地图容器尺寸异常，请刷新重试')
      }

      chart = echarts.init(container)
      chart.setOption({
        title: {
          text: '大明疆域',
          left: 'center',
          top: 16,
          textStyle: { color: '#303133', fontSize: 18 },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}',
        },
        visualMap: {
          min: 0,
          max: 100,
          left: 24,
          bottom: 24,
          text: ['高', '低'],
          inRange: { color: ['#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'] },
          show: false,
        },
        series: [
          {
            name: '疆域',
            type: 'map',
            map: 'china',
            roam: true,
            emphasis: {
              label: { show: true },
              itemStyle: { areaColor: '#ffd666' },
            },
            itemStyle: {
              areaColor: '#74add1',
              borderColor: '#fff',
              borderWidth: 1,
            },
            data: [
              { name: '北京市', value: 90 },
              { name: '辽宁省', value: 70 },
              { name: '山东省', value: 60 },
              { name: '江苏省', value: 55 },
              { name: '浙江省', value: 50 },
              { name: '福建省', value: 45 },
              { name: '广东省', value: 40 },
              { name: '云南省', value: 35 },
            ],
          },
        ],
      })
    } catch (e) {
      error.value = e instanceof Error ? e.message : '未知错误'
    } finally {
      loading.value = false
    }
  }

  function handleResize() {
    chart?.resize()
  }

  onMounted(() => {
    initChart()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    chart?.dispose()
    chart = null
  })

  return { loading, error }
}
