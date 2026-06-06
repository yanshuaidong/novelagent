"use client";

/**
 * 人物关系力导向图 — 参照 G6 unicorns-investors 示例
 * https://g6.antv.antgroup.com/examples/feature/default/#unicorns-investors
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import {
  Graph,
  type ElementDatum,
  type IElementEvent,
  type IPointerEvent,
  type NodeData,
} from "@antv/g6";

import {
  CHARACTER_TYPE_STYLE,
  characterRelationData,
  type CharacterNodeData,
  type CharacterNodeType,
} from "@/lib/characterRelationData";

const TYPE_LEGEND: { type: CharacterNodeType; label: string }[] = [
  { type: "皇室", label: "皇室" },
  { type: "后宫", label: "后宫" },
  { type: "大臣", label: "大臣" },
  { type: "宦官", label: "宦官" },
  { type: "武将", label: "武将" },
  { type: "外敌", label: "外敌" },
];

function nodeSize(node: NodeData): number {
  const size = node.style?.size;
  if (Array.isArray(size)) {
    return Math.max(...size.filter((v): v is number => typeof v === "number"));
  }
  if (typeof size === "number") return size;
  return 30;
}

function nodeFill(type: CharacterNodeType): string {
  return CHARACTER_TYPE_STYLE[type]?.fill ?? "#FFA07A";
}

function nodeIcon(type: CharacterNodeType): string {
  return CHARACTER_TYPE_STYLE[type]?.icon ?? "👤";
}

function getNodeData(datum: { data?: Record<string, unknown>; id?: string }): CharacterNodeData {
  const data = datum.data ?? {};
  const type = (data.type as CharacterNodeType) ?? "大臣";
  return {
    type,
    name: (data.name as string) ?? datum.id ?? "",
    title: data.title as string | undefined,
    note: data.note as string | undefined,
    degree: data.degree as number | undefined,
  };
}

interface SearchableNode {
  id: string;
  name: string;
  title: string;
  note: string;
  label: string;
}

function buildSearchIndex(): SearchableNode[] {
  return characterRelationData.nodes.map((node) => {
    const { name, title, note } = node.data;
    return {
      id: node.id,
      name,
      title: title ?? "",
      note: note ?? "",
      label: title ? `${name}（${title}）` : name,
    };
  });
}

export default function RelationNetworkGraph() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<Graph | null>(null);
  const graphReadyRef = useRef(false);
  const [searchText, setSearchText] = useState("");

  const nodeIndex = useMemo(() => buildSearchIndex(), []);

  const searchOptions = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    const matched = q
      ? nodeIndex.filter(
          (n) =>
            n.name.toLowerCase().includes(q) ||
            n.title.toLowerCase().includes(q) ||
            n.note.toLowerCase().includes(q),
        )
      : nodeIndex;
    return matched.map((n) => ({ value: n.id, label: n.label }));
  }, [searchText, nodeIndex]);

  const clearHighlight = useCallback(() => {
    const graph = graphRef.current;
    if (!graph || !graphReadyRef.current) return;

    const stateMap: Record<string, string[]> = {};
    for (const element of [...graph.getNodeData(), ...graph.getEdgeData()]) {
      stateMap[element.id as string] = [];
    }
    void graph.setElementState(stateMap);
  }, []);

  const highlightNode = useCallback((nodeId: string) => {
    const graph = graphRef.current;
    if (!graph || !graphReadyRef.current) return;

    const neighbors = graph.getNeighborNodesData(nodeId);
    const relatedEdges = graph.getRelatedEdgesData(nodeId);
    const activeNodeIds = new Set([
      nodeId,
      ...neighbors.map((n) => n.id as string),
    ]);
    const activeEdgeIds = new Set(relatedEdges.map((e) => e.id as string));

    const stateMap: Record<string, string[]> = {};
    for (const node of graph.getNodeData()) {
      const id = node.id as string;
      if (id === nodeId) stateMap[id] = ["selected"];
      else if (activeNodeIds.has(id)) stateMap[id] = [];
      else stateMap[id] = ["inactive"];
    }
    for (const edge of graph.getEdgeData()) {
      const id = edge.id as string;
      stateMap[id] = activeEdgeIds.has(id) ? ["active"] : ["inactive"];
    }

    void graph.setElementState(stateMap);
    void graph.focusElement(nodeId, { duration: 300 });
    graph.frontElement(nodeId);
  }, []);

  const handleSearchSelect = useCallback(
    (value: string) => {
      const item = nodeIndex.find((n) => n.id === value);
      if (item) setSearchText(item.name);
      highlightNode(value);
    },
    [highlightNode, nodeIndex],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchText(value);
      if (!value.trim()) clearHighlight();
    },
    [clearHighlight],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    let destroyed = false;
    const container = containerRef.current;
    graphReadyRef.current = false;

    const graph = new Graph({
      container,
      width: container.clientWidth,
      height: container.clientHeight || 560,
      data: characterRelationData,
      autoFit: "view",
      padding: 40,
      node: {
        type: "circle",
        style: {
          label: true,
          labelText: (d) => getNodeData(d).name,
          labelPlacement: "center",
          labelFill: "#fff",
          labelFontSize: 11,
          labelFontWeight: 500,
          labelBackground: false,
          icon: false,
          fill: (d) => nodeFill(getNodeData(d).type),
        },
        state: {
          inactive: {
            fillOpacity: 0.3,
            label: false,
          },
          selected: {
            stroke: "#007AFF",
            lineWidth: 3,
            halo: true,
            haloStroke: "#007AFF",
            haloLineWidth: 12,
            haloOpacity: 0.25,
          },
        },
      },
      edge: {
        style: {
          label: false,
          labelText: (d) => (d.data as { type?: string })?.type ?? "",
          labelBackground: true,
          stroke: "#C0C4CC",
          lineWidth: 1,
        },
        state: {
          active: {
            label: true,
            stroke: "#909399",
            lineWidth: 1.5,
          },
          inactive: {
            strokeOpacity: 0,
          },
        },
      },
      layout: {
        type: "d3-force",
        link: {
          distance: (edge: { source: NodeData; target: NodeData }) =>
            nodeSize(edge.source) + nodeSize(edge.target),
        },
        collide: { radius: (node: NodeData) => nodeSize(node) },
        manyBody: { strength: (node: NodeData) => -4 * nodeSize(node) },
        animation: false,
        iterations: 30,
      },
      transforms: [
        {
          type: "map-node-size",
          scale: "linear",
          maxSize: 72,
          minSize: 36,
          mapLabelSize: [10, 13],
        },
      ],
      behaviors: [
        "drag-canvas",
        "zoom-canvas",
        function () {
          return {
            key: "hover-activate",
            type: "hover-activate",
            enable: (e: IPointerEvent) => e.targetType === "node",
            degree: 1,
            inactiveState: "inactive",
            onHover: (e: IPointerEvent) => {
              const target = e.target as { id?: string };
              if (target.id) this.frontElement(target.id);
              e.view.setCursor("pointer");
            },
            onHoverEnd: (e: IPointerEvent) => {
              e.view.setCursor("default");
            },
          };
        },
        { type: "fix-element-size", enable: true },
      ],
      plugins: [
        {
          type: "tooltip",
          position: "right",
          enable: (e: IElementEvent) => e.targetType === "node",
          getContent: (_e: IElementEvent, items: ElementDatum[]) => {
            const { type, name, title, note } = getNodeData(items[0]);
            const color = nodeFill(type);
            const titleLine = title ? `<div style="opacity:0.75;font-size:12px;margin-top:2px">${title}</div>` : "";
            const noteLine = note ? `<div style="opacity:0.6;font-size:11px;margin-top:4px;max-width:200px">${note}</div>` : "";
            return `
              <div style="padding:4px 2px">
                <div style="color:${color};font-weight:600;font-size:12px">${type}</div>
                <div style="font-size:14px;margin-top:2px">${name}</div>
                ${titleLine}
                ${noteLine}
              </div>
            `;
          },
          style: {
            ".tooltip": {
              padding: "6px 10px",
              "border-radius": "8px",
            },
          },
        },
      ],
      animation: false,
    });

    graphRef.current = graph;
    const renderPromise = graph
      .render()
      .then(() => {
        if (!destroyed) graphReadyRef.current = true;
      })
      .catch(() => {});

    function handleResize() {
      if (destroyed || !graphRef.current) return;
      graphRef.current.setSize(container.clientWidth, container.clientHeight || 560);
      graphRef.current.fitView();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      destroyed = true;
      graphReadyRef.current = false;
      window.removeEventListener("resize", handleResize);
      graphRef.current = null;
      renderPromise.finally(() => {
        graph.destroy();
      });
    };
  }, []);

  return (
    <div className="h-full flex flex-col gap-3">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="m-0 text-[17px] font-semibold text-[#000]">
            明朝末年人物关系网络
          </h3>
          <p className="m-0 mt-1 text-[13px] text-[rgba(60,60,67,0.6)]">
            力导向关系图 · 悬停高亮一度关联 · 涵盖人物志全部人物
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <AutoComplete
            value={searchText}
            options={searchOptions}
            onSearch={handleSearchChange}
            onSelect={handleSearchSelect}
            onClear={() => {
              setSearchText("");
              clearHighlight();
            }}
            allowClear
            className="w-[220px]"
            placeholder="搜索人物"
            notFoundContent={
              searchText.trim() ? "未找到匹配人物" : "输入姓名或官职"
            }
          >
            <Input
              prefix={<SearchOutlined className="text-[rgba(60,60,67,0.45)]" />}
              aria-label="搜索人物节点"
            />
          </AutoComplete>
          <div className="flex flex-wrap gap-2 justify-end" role="list" aria-label="人物类型图例">
          {TYPE_LEGEND.map(({ type, label }) => (
            <span
              key={type}
              role="listitem"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium"
              style={{
                background: `${nodeFill(type)}22`,
                color: nodeFill(type),
              }}
            >
              <span aria-hidden>{nodeIcon(type)}</span>
              {label}
            </span>
          ))}
          </div>
        </div>
      </header>
      <div
        ref={containerRef}
        className="flex-1 min-h-[520px] rounded-2xl overflow-hidden"
        style={{
          background: "#F2F2F7",
          border: "0.5px solid rgba(60, 60, 67, 0.18)",
        }}
      />
      <p className="m-0 text-[12px] text-[rgba(60,60,67,0.45)]">
        搜索人物定位节点 · 拖拽画布平移 · 滚轮缩放 · 悬停查看关系
      </p>
    </div>
  );
}
