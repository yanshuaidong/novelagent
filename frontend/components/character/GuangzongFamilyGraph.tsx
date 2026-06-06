"use client";

/**
 * 明光宗子女关系图 — Apple HIG 风格
 *
 * 设计决策：
 * - SF Pro 系统字体栈（继承 body），8pt 间距网格
 * - Apple 系统色区分角色类型，实色背景保证可读性
 * - 分组卡片 + 胶囊图例，圆角遵循同心圆规则
 * - 时间轴滑块使用 system-blue 作为主交互色
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Graph, type EdgeData, type NodeData } from "@antv/g6";
import { ConfigProvider, Slider } from "antd";

interface FamilyMember {
  id: string;
  name: string;
  title: string;
  birthYear: number;
  deathYear: number | null;
  mother: string;
  nodeType: "root" | "emperor" | "princess";
  rank: string;
  note?: string;
}

/** Apple 系统色 — 浅色模式 */
const APPLE = {
  blue: "#007AFF",
  orange: "#FF9500",
  yellow: "#FFCC00",
  purple: "#AF52DE",
  indigo: "#5856D6",
  gray: "#8E8E93",
  gray3: "#C7C7CC",
  gray4: "#D1D1D6",
  gray5: "#E5E5EA",
  gray6: "#F2F2F7",
  labelPrimary: "#000000",
  labelSecondary: "rgba(60, 60, 67, 0.6)",
  labelTertiary: "rgba(60, 60, 67, 0.3)",
  bgPrimary: "#FFFFFF",
  bgSecondary: "#F2F2F7",
  separator: "rgba(60, 60, 67, 0.29)",
} as const;

const GUANGZONG: FamilyMember = {
  id: "guangzong",
  name: "朱常洛",
  title: "明光宗·泰昌帝",
  birthYear: 1582,
  deathYear: 1620,
  mother: "",
  nodeType: "root",
  rank: "",
};

/** 仅保留成年或承袭帝位者，不含早夭子女（按出生先后排列） */
const CHILDREN: FamilyMember[] = [
  {
    id: "youjiao",
    name: "朱由校",
    title: "明熹宗·天启帝",
    birthYear: 1605,
    deathYear: 1627,
    mother: "孝和皇太后王氏",
    nodeType: "emperor",
    rank: "皇长子",
    note: "在位七年，年号天启",
  },
  {
    id: "huiyan",
    name: "朱徽妍",
    title: "宁德公主",
    birthYear: 1610,
    deathYear: null,
    mother: "傅懿妃",
    nodeType: "princess",
    rank: "皇六女",
    note: "下嫁刘有福，明亡后幸存",
  },
  {
    id: "youjian",
    name: "朱由检",
    title: "明思宗·崇祯帝",
    birthYear: 1611,
    deathYear: 1644,
    mother: "孝纯皇太后刘氏",
    nodeType: "emperor",
    rank: "皇五子",
    note: "在位十七年，年号崇祯",
  },
  {
    id: "huijing",
    name: "朱徽婧",
    title: "遂平公主",
    birthYear: 1611,
    deathYear: 1633,
    mother: "傅懿妃",
    nodeType: "princess",
    rank: "皇七女",
    note: "下嫁齐赞元",
  },
  {
    id: "huiti",
    name: "朱徽媞",
    title: "乐安公主",
    birthYear: 1611,
    deathYear: 1643,
    mother: "李康妃",
    nodeType: "princess",
    rank: "皇九女",
    note: "下嫁巩永固，死于李自成之乱",
  },
];

const ALL_MEMBERS = [GUANGZONG, ...CHILDREN];

const TIMELINE = {
  min: 1605,
  max: 1644,
  default: 1620,
} as const;

const NODE_STYLES = {
  root: {
    fill: "l(270) 0:#FFF8EC 1:#FFEDCC",
    stroke: APPLE.orange,
    lineWidth: 2,
    size: [168, 72] as [number, number],
  },
  emperor: {
    fill: "l(270) 0:#FFFBF0 1:#FFF3CC",
    stroke: APPLE.orange,
    lineWidth: 1.5,
    size: [156, 88] as [number, number],
  },
  princess: {
    fill: "l(270) 0:#F7EDFC 1:#EBD6FA",
    stroke: APPLE.purple,
    lineWidth: 1.5,
    size: [156, 88] as [number, number],
  },
  deceased: {
    fill: APPLE.gray6,
    stroke: APPLE.gray3,
    lineWidth: 1,
    size: [156, 88] as [number, number],
  },
  unborn: {
    fill: APPLE.bgPrimary,
    stroke: APPLE.gray4,
    lineWidth: 1,
    size: [156, 88] as [number, number],
  },
} as const;

function getParentChildRelation(child: FamilyMember): "父子" | "父女" {
  return child.nodeType === "princess" ? "父女" : "父子";
}

const LEGEND_ITEMS = [
  {
    label: "父子",
    color: APPLE.orange,
    bg: "rgba(255, 149, 0, 0.1)",
  },
  {
    label: "父女",
    color: APPLE.orange,
    bg: "rgba(255, 149, 0, 0.1)",
  },
  {
    label: "皇帝",
    color: APPLE.orange,
    bg: "rgba(255, 204, 0, 0.12)",
  },
  {
    label: "公主",
    color: APPLE.purple,
    bg: "rgba(175, 82, 222, 0.1)",
  },
] as const;

function calcAge(birthYear: number, year: number): number {
  return year - birthYear + 1;
}

function getLifeStatus(
  member: FamilyMember,
  year: number,
): "unborn" | "alive" | "deceased" {
  if (year < member.birthYear) return "unborn";
  if (member.deathYear !== null && year > member.deathYear) return "deceased";
  return "alive";
}

function buildNodeLabel(member: FamilyMember, year: number): string {
  const status = getLifeStatus(member, year);
  const lines = [member.name, member.title];

  if (member.rank) lines.push(member.rank);
  if (member.mother) lines.push(`生母：${member.mother}`);

  if (status === "unborn") {
    lines.push(`${member.birthYear}年尚未诞生`);
  } else {
    const age = calcAge(member.birthYear, year);
    const lifeSpan =
      member.deathYear !== null
        ? `${member.birthYear}–${member.deathYear}`
        : `${member.birthYear}–`;
    if (status === "deceased") {
      lines.push(`${lifeSpan} · 享年${calcAge(member.birthYear, member.deathYear!)}岁`);
      lines.push(`(${year}年已不在世)`);
    } else {
      lines.push(`${lifeSpan} · ${year}年 ${age}岁`);
    }
  }

  return lines.join("\n");
}

function buildGraphData(year: number): { nodes: NodeData[]; edges: EdgeData[] } {
  const nodes: NodeData[] = ALL_MEMBERS.map((member) => {
    const status = getLifeStatus(member, year);
    const baseStyle =
      member.nodeType === "root"
        ? NODE_STYLES.root
        : status === "unborn"
          ? NODE_STYLES.unborn
          : status === "deceased"
            ? NODE_STYLES.deceased
            : NODE_STYLES[member.nodeType];

    return {
      id: member.id,
      data: { member, status },
      style: {
        labelText: buildNodeLabel(member, year),
        fill: baseStyle.fill,
        stroke: baseStyle.stroke,
        lineWidth: baseStyle.lineWidth,
        size: baseStyle.size,
        opacity: status === "unborn" ? 0.45 : status === "deceased" ? 0.7 : 1,
        labelFill:
          status === "deceased" ? APPLE.gray : APPLE.labelPrimary,
        labelFontSize: 11,
        labelFontWeight: member.nodeType === "root" ? 600 : 500,
        labelPlacement: "center",
        labelMaxWidth: 150,
        labelWordWrap: true,
        labelMaxLines: 7,
        radius: 12,
        shadowColor: "rgba(0, 0, 0, 0.04)",
        shadowBlur: 12,
        shadowOffsetY: 4,
      },
    };
  });

  const edges: EdgeData[] = [];

  for (const child of CHILDREN) {
    const childStatus = getLifeStatus(child, year);
    const relation = getParentChildRelation(child);
    edges.push({
      id: `edge-${GUANGZONG.id}-${child.id}`,
      source: GUANGZONG.id,
      target: child.id,
      data: { relation },
      style: {
        stroke: childStatus === "unborn" ? APPLE.gray5 : APPLE.orange,
        lineWidth: childStatus === "unborn" ? 1 : 1.5,
        endArrow: true,
        labelText: relation,
        labelFill: APPLE.gray,
        labelFontSize: 10,
        labelBackground: true,
        labelBackgroundFill: APPLE.bgPrimary,
        labelBackgroundOpacity: 0.92,
        labelBackgroundRadius: 6,
        lineDash: childStatus === "unborn" ? [4, 4] : undefined,
        opacity: childStatus === "unborn" ? 0.35 : 0.9,
      },
    });
  }

  return { nodes, edges };
}

async function updateGraphForYear(graph: Graph, currentYear: number) {
  const { nodes, edges } = buildGraphData(currentYear);

  graph.updateNodeData(
    nodes.map((node) => ({
      id: node.id,
      data: node.data,
      style: node.style,
    })),
  );

  const currentEdgeIds = graph.getEdgeData().map((edge) => edge.id as string);
  const nextEdgeIds = new Set(edges.map((edge) => edge.id as string));
  const edgesToRemove = currentEdgeIds.filter((id) => !nextEdgeIds.has(id));

  if (edgesToRemove.length > 0) {
    graph.removeEdgeData(edgesToRemove);
  }

  const existingEdgeIds = new Set(
    currentEdgeIds.filter((id) => nextEdgeIds.has(id)),
  );
  const edgesToAdd = edges.filter((edge) => !existingEdgeIds.has(edge.id as string));
  const edgesToUpdate = edges.filter((edge) => existingEdgeIds.has(edge.id as string));

  if (edgesToAdd.length > 0) {
    graph.addEdgeData(edgesToAdd);
  }
  if (edgesToUpdate.length > 0) {
    graph.updateEdgeData(edgesToUpdate);
  }

  await graph.draw();
}

const SLIDER_MARKS: Record<number, string> = {
  1605: "1605",
  1620: "1620\n光宗崩",
  1627: "1627\n天启崩",
  1633: "1633",
  1643: "1643",
  1644: "1644\n明亡",
};

function getYearAnnotation(year: number): string | null {
  if (year === 1620) return "泰昌元年，光宗崩";
  if (year === 1627) return "天启七年，熹宗崩";
  if (year === 1644) return "崇祯十七年，明亡";
  return null;
}

export default function GuangzongFamilyGraph() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<Graph | null>(null);
  const graphReadyRef = useRef(false);
  const yearRef = useRef<number>(TIMELINE.default);
  const [year, setYear] = useState<number>(TIMELINE.default);

  yearRef.current = year;

  const ageSummary = useMemo(() => {
    return CHILDREN.map((member) => {
      const status = getLifeStatus(member, year);
      return {
        ...member,
        status,
        age: status === "alive" ? calcAge(member.birthYear, year) : null,
      };
    });
  }, [year]);

  const yearAnnotation = getYearAnnotation(year);

  useEffect(() => {
    if (!containerRef.current) return;

    let destroyed = false;
    graphReadyRef.current = false;
    const container = containerRef.current;
    const initialData = buildGraphData(TIMELINE.default);

    const graph = new Graph({
      container,
      width: container.clientWidth,
      height: container.clientHeight || 480,
      autoFit: "view",
      padding: [40, 32, 24, 32],
      data: initialData,
      layout: {
        type: "antv-dagre",
        rankdir: "TB",
        nodesep: 48,
        ranksep: 96,
        controlPoints: true,
        nodeSize: (node: NodeData) => {
          const member = (node.data as { member: FamilyMember }).member;
          return NODE_STYLES[member.nodeType === "root" ? "root" : member.nodeType].size;
        },
      },
      node: {
        type: "rect",
      },
      edge: {
        type: "polyline",
      },
      behaviors: ["drag-canvas", "zoom-canvas", "drag-element"],
    });

    graphRef.current = graph;
    const renderPromise = graph
      .render()
      .then(() => {
        if (destroyed) return;
        graphReadyRef.current = true;
        return updateGraphForYear(graph, yearRef.current);
      })
      .catch(() => {});

    function handleResize() {
      if (destroyed || !graphRef.current) return;
      graphRef.current.setSize(container.clientWidth, container.clientHeight || 480);
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

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph || !graphReadyRef.current) return;

    updateGraphForYear(graph, year).catch(() => {});
  }, [year]);

  return (
    <div
      className="h-full flex flex-col gap-4 font-[family-name:var(--font-system,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Helvetica_Neue',sans-serif)]"
      role="region"
      aria-label="明光宗朱常洛子女关系图"
    >
      {/* 标题区 */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3
            className="m-0 text-[20px] font-semibold leading-tight tracking-[-0.01em]"
            style={{ color: APPLE.labelPrimary }}
          >
            明光宗朱常洛子女关系图
          </h3>
          <p
            className="m-0 mt-2 text-[13px] leading-[1.4]"
            style={{ color: APPLE.labelSecondary }}
          >
            已排除早夭子女，仅展示 2 子 3 女（共 5 人）的父子、父女关系
          </p>
        </div>

        {/* 图例 — 胶囊标签 */}
        <div
          className="flex flex-wrap gap-2"
          role="list"
          aria-label="关系图图例"
        >
          {LEGEND_ITEMS.map((item) => (
            <span
              key={item.label}
              role="listitem"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium"
              style={{
                background: item.bg,
                color: item.color,
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-[3px] shrink-0"
                style={{
                  background: item.color,
                  border: `1px solid ${item.color}`,
                }}
                aria-hidden
              />
              {item.label}
            </span>
          ))}
        </div>
      </header>

      {/* 关系图画布 — 分组卡片容器 */}
      <div
        ref={containerRef}
        className="flex-1 min-h-[420px] rounded-2xl overflow-hidden"
        style={{
          background: APPLE.bgSecondary,
          border: `0.5px solid ${APPLE.separator}`,
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.04)",
        }}
        aria-hidden
      />

      {/* 时间轴面板 — 分组列表样式 */}
      <section
        className="rounded-2xl px-5 py-4"
        style={{
          background: APPLE.bgSecondary,
          border: `0.5px solid ${APPLE.separator}`,
        }}
        aria-label="时间轴控制"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span
            className="text-[13px] font-normal uppercase tracking-[0.02em]"
            style={{ color: APPLE.labelSecondary }}
          >
            时间轴
          </span>
          <p className="m-0 text-[15px]" style={{ color: APPLE.labelSecondary }}>
            当前年份：
            <strong
              className="font-semibold ml-1"
              style={{ color: APPLE.blue }}
            >
              {year} 年
            </strong>
            {yearAnnotation && (
              <span className="ml-1" style={{ color: APPLE.orange }}>
                · {yearAnnotation}
              </span>
            )}
          </p>
        </div>

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: APPLE.blue,
              borderRadius: 8,
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
            },
            components: {
              Slider: {
                trackBg: APPLE.blue,
                trackHoverBg: APPLE.blue,
                railBg: APPLE.gray5,
                handleColor: APPLE.bgPrimary,
                handleActiveColor: APPLE.bgPrimary,
                dotBorderColor: APPLE.gray4,
                dotActiveBorderColor: APPLE.blue,
              },
            },
          }}
        >
          <Slider
            min={TIMELINE.min}
            max={TIMELINE.max}
            value={year}
            marks={SLIDER_MARKS}
            tooltip={{ formatter: (v) => `${v} 年` }}
            onChange={setYear}
            aria-label="选择年份"
          />
        </ConfigProvider>

        {/* 成员年龄卡片 — 分组列表项 */}
        <div
          className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
          role="list"
          aria-label="子女年龄概览"
        >
          {ageSummary.map((item) => {
            const isAlive = item.status === "alive";
            const isDeceased = item.status === "deceased";

            return (
              <div
                key={item.id}
                role="listitem"
                className="rounded-xl px-3 py-3 min-h-[72px] transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{
                  background: isAlive ? APPLE.bgPrimary : APPLE.gray6,
                  border: isAlive
                    ? `0.5px solid ${APPLE.separator}`
                    : isDeceased
                      ? `0.5px solid ${APPLE.gray4}`
                      : `0.5px dashed ${APPLE.gray4}`,
                  opacity: isAlive ? 1 : isDeceased ? 0.75 : 0.55,
                  boxShadow: isAlive
                    ? "0 1px 3px rgba(0, 0, 0, 0.04)"
                    : undefined,
                }}
              >
                <div
                  className="text-[15px] font-medium truncate leading-snug"
                  style={{ color: APPLE.labelPrimary }}
                >
                  {item.name}
                </div>
                <div
                  className="text-[13px] truncate mt-0.5"
                  style={{ color: APPLE.labelSecondary }}
                >
                  {item.title}
                </div>
                <div className="mt-2 text-[13px]">
                  {isAlive && (
                    <span
                      className="font-semibold tabular-nums"
                      style={{ color: APPLE.blue }}
                    >
                      {item.age} 岁
                    </span>
                  )}
                  {isDeceased && (
                    <span style={{ color: APPLE.gray }}>已不在世</span>
                  )}
                  {item.status === "unborn" && (
                    <span style={{ color: APPLE.labelTertiary }}>尚未诞生</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
