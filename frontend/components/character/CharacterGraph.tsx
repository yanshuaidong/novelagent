"use client";

import { useState, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import { ApartmentOutlined, RightOutlined } from "@ant-design/icons";
import { Modal } from "antd";

import ExampleTreeGraph from "./ExampleTreeGraph";
import GuangzongFamilyGraph from "./GuangzongFamilyGraph";
import RelationNetworkGraph from "./RelationNetworkGraph";

/** Apple 系统色 — 浅色模式（字体与按钮） */
const APPLE = {
  blue: "#007AFF",
  labelPrimary: "#000000",
  labelSecondary: "rgba(60, 60, 67, 0.6)",
  labelQuaternary: "rgba(60, 60, 67, 0.18)",
} as const;

const FONT_SYSTEM =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif";

export const DEFAULT_GRAPH_ID = "relation-network";

interface GraphEntry {
  id: string;
  name: string;
  path: string;
  description: string;
  component: ComponentType;
}

const graphs: GraphEntry[] = [
  {
    id: "relation-network",
    name: "人物关系网络",
    path: "/character/relation-network",
    description: "明朝末年人物力导向关系图，涵盖人物志全部人物",
    component: RelationNetworkGraph,
  },
  {
    id: "guangzong-family",
    name: "明光宗子女家庭树",
    path: "/character/guangzong-family",
    description: "明光宗朱常洛在世子女关系图，含时间轴与年龄展示",
    component: GuangzongFamilyGraph,
  },
  {
    id: "example-tree",
    name: "大明皇室示例",
    path: "/character/example-tree",
    description: "基于小说第一章涉及人物的关系示例",
    component: ExampleTreeGraph,
  },
];

function getGraph(id: string) {
  return graphs.find((g) => g.id === id) ?? graphs[0];
}

interface CharacterGraphProps {
  graphId?: string;
}

export default function CharacterGraph({
  graphId = DEFAULT_GRAPH_ID,
}: CharacterGraphProps) {
  const router = useRouter();
  const [pickerOpen, setPickerOpen] = useState(false);

  const activeGraph = getGraph(graphId);
  const ActiveGraphComponent = activeGraph.component;

  return (
    <div
      className="flex flex-col h-full min-h-[560px] gap-4 font-[family-name:var(--font-system,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Helvetica_Neue',sans-serif)]"
    >
      <div className="shrink-0 bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-4 py-3">
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg text-[13px] font-normal leading-[1.4] cursor-pointer transition-[background,transform] duration-100 hover:bg-[rgba(0,122,255,0.1)] active:bg-[rgba(0,122,255,0.15)] active:scale-[0.98]"
          style={{ fontFamily: FONT_SYSTEM, color: APPLE.blue }}
          title="选择关系图"
        >
          <ApartmentOutlined aria-hidden />
          <span>关系图</span>
        </button>
      </div>

      <div className="flex-1 min-h-0 bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4 flex flex-col">
        <ActiveGraphComponent />
      </div>

      <Modal
        title="选择关系图"
        open={pickerOpen}
        onCancel={() => setPickerOpen(false)}
        footer={null}
        width={480}
        destroyOnHidden
        styles={{
          header: { fontFamily: FONT_SYSTEM },
          title: {
            fontSize: 17,
            fontWeight: 600,
            lineHeight: 1.3,
            color: APPLE.labelPrimary,
          },
          body: { fontFamily: FONT_SYSTEM },
        }}
      >
        <div className="flex flex-col gap-2 py-1">
          {graphs.map((graph) => {
            const isActive = graph.id === activeGraph.id;
            return (
              <button
                key={graph.id}
                type="button"
                onClick={() => {
                  setPickerOpen(false);
                  router.push(graph.path);
                }}
                className={[
                  "w-full flex items-center justify-between gap-3 px-4 py-3 min-h-[44px] rounded-[10px] border text-left cursor-pointer transition-[background,transform,border-color] duration-100 active:scale-[0.99]",
                  isActive
                    ? "border-[#007AFF] bg-[rgba(0,122,255,0.1)]"
                    : "border-transparent bg-white hover:bg-[#F2F2F7] active:bg-[rgba(0,122,255,0.08)]",
                ].join(" ")}
                style={{ fontFamily: FONT_SYSTEM }}
              >
                <div className="min-w-0 flex-1">
                  <div
                    className="text-[17px] font-normal leading-[1.3] truncate"
                    style={{ color: APPLE.labelPrimary }}
                  >
                    {graph.name}
                  </div>
                  <div
                    className="mt-0.5 text-[13px] leading-[1.4] line-clamp-2"
                    style={{ color: APPLE.labelSecondary }}
                  >
                    {graph.description}
                  </div>
                </div>
                <RightOutlined
                  className="shrink-0 text-[14px]"
                  style={{ color: isActive ? APPLE.blue : APPLE.labelQuaternary }}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
