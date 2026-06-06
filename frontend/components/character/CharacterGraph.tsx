"use client";

import { useEffect, useRef } from "react";
import { Graph, treeToGraphData, type NodeData } from "@antv/g6";

import { characterTreeData } from "@/lib/characterTreeData";

export default function CharacterGraph() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let graph: Graph | null = null;
    let destroyed = false;
    const container = containerRef.current;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    const graphData = treeToGraphData(characterTreeData, {
      getNodeData: (datum, depth) => {
        const { children: _children, label, ...rest } = datum;
        void _children;
        return {
          ...rest,
          depth,
          style: {
            labelText: label ?? datum.id,
          },
        } as NodeData;
      },
    });

    graph = new Graph({
      container,
      width,
      height,
      autoFit: "view",
      data: graphData,
      layout: {
        type: "compact-box",
        direction: "TB",
        getHeight: () => 32,
        getWidth: () => 120,
        getVGap: () => 24,
        getHGap: () => 48,
      },
      node: {
        type: "rect",
        style: {
          size: [140, 36],
          radius: 6,
          fill: "#ecf5ff",
          stroke: "#409eff",
          lineWidth: 1.5,
          labelFill: "#303133",
          labelFontSize: 13,
          labelPlacement: "center",
        },
      },
      edge: {
        type: "polyline",
        style: {
          stroke: "#c0c4cc",
          lineWidth: 1.5,
          endArrow: true,
        },
      },
      behaviors: ["drag-canvas", "zoom-canvas", "drag-element"],
    });

    // render() 是异步的；StrictMode 下组件会挂载→卸载→再挂载。
    // 必须等 render 完成后再 destroy，否则 G6 会警告“实例正在 render 时被销毁”。
    const renderPromise = graph.render().catch(() => {});

    function handleResize() {
      if (!graph || destroyed) return;
      graph.setSize(container.clientWidth, container.clientHeight || 520);
      graph.fitView();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      destroyed = true;
      window.removeEventListener("resize", handleResize);
      renderPromise.finally(() => {
        graph?.destroy();
        graph = null;
      });
    };
  }, []);

  return (
    <div className="h-full min-h-[560px] bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 flex flex-col">
      <p className="m-0 mb-3 text-[13px] text-[#909399]">
        人物父子关系架构图（示例数据，可后续接入真实人物库）
      </p>
      <div ref={containerRef} className="flex-1 min-h-[520px]" />
    </div>
  );
}
