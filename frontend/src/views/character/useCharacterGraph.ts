import { onMounted, onUnmounted, type Ref } from 'vue'
import { Graph, treeToGraphData, type NodeData } from '@antv/g6'

import { characterTreeData } from './characterTreeData'

export function useCharacterGraph(containerRef: Ref<HTMLElement | null>) {
  let graph: Graph | null = null

  function initGraph() {
    if (!containerRef.value) return

    const width = containerRef.value.clientWidth
    const height = containerRef.value.clientHeight || 520

    const graphData = treeToGraphData(characterTreeData, {
      getNodeData: (datum, depth) => {
        const { children: _children, label, ...rest } = datum
        return {
          ...rest,
          depth,
          style: {
            labelText: label ?? datum.id,
          },
        } as NodeData
      },
    })

    graph = new Graph({
      container: containerRef.value,
      width,
      height,
      autoFit: 'view',
      data: graphData,
      layout: {
        type: 'compact-box',
        direction: 'TB',
        getHeight: () => 32,
        getWidth: () => 120,
        getVGap: () => 24,
        getHGap: () => 48,
      },
      node: {
        type: 'rect',
        style: {
          size: [140, 36],
          radius: 6,
          fill: '#ecf5ff',
          stroke: '#409eff',
          lineWidth: 1.5,
          labelFill: '#303133',
          labelFontSize: 13,
          labelPlacement: 'center',
        },
      },
      edge: {
        type: 'polyline',
        style: {
          stroke: '#c0c4cc',
          lineWidth: 1.5,
          endArrow: true,
        },
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    })

    graph.render()
  }

  function handleResize() {
    if (!graph || !containerRef.value) return
    const width = containerRef.value.clientWidth
    const height = containerRef.value.clientHeight || 520
    graph.setSize(width, height)
    graph.fitView()
  }

  onMounted(() => {
    initGraph()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    graph?.destroy()
    graph = null
  })
}
