"use client";

import { useEffect, useRef } from "react";
import { Graph, treeToGraphData, type NodeData } from "@antv/g6";

const treeData = {
  id: "root",
  label: "大明皇室",
  children: [
    {
      id: "shenzong",
      label: "神宗显皇帝",
      children: [
        {
          id: "guangzong",
          label: "光宗贞皇帝",
          children: [{ id: "xizong", label: "熹宗悊皇帝" }],
        },
        { id: "wang-guifei", label: "王恭妃（皇贵妃）" },
      ],
    },
    { id: "cishou", label: "慈圣皇太后" },
    {
      id: "wang-xuanshi",
      label: "王选侍（孝和皇太后）",
      children: [{ id: "xizong-mother", label: "熹宗生母" }],
    },
    { id: "li-xuanshi", label: "先帝选侍李氏" },
  ],
};

export default function ExampleTreeGraph() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let graph: Graph | null = null;
    let destroyed = false;
    const container = containerRef.current;

    const graphData = treeToGraphData(treeData, {
      getNodeData: (datum, depth) => {
        const { children: _children, label, ...rest } = datum;
        void _children;
        return {
          ...rest,
          depth,
          style: { labelText: label ?? datum.id },
        } as NodeData;
      },
    });

    graph = new Graph({
      container,
      width: container.clientWidth,
      height: container.clientHeight || 520,
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
        style: { stroke: "#c0c4cc", lineWidth: 1.5, endArrow: true },
      },
      behaviors: ["drag-canvas", "zoom-canvas", "drag-element"],
    });

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
    <div className="h-full flex flex-col">
      <p className="m-0 mb-3 text-[13px] text-[#909399]">
        人物父子关系架构图（示例数据，可后续接入真实人物库）
      </p>
      <div ref={containerRef} className="flex-1 min-h-[520px]" />
    </div>
  );
}
