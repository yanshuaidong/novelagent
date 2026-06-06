"use client";

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Alert, Skeleton } from "antd";

const CHINA_GEO_URL =
  "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json";

export default function ChinaMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let chart: echarts.ECharts | null = null;
    let disposed = false;

    async function waitForContainerSize() {
      for (let i = 0; i < 10; i++) {
        const el = containerRef.current;
        if (el && el.clientWidth > 0 && el.clientHeight > 0) return el;
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      return containerRef.current;
    }

    async function initChart() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(CHINA_GEO_URL);
        if (!response.ok) {
          throw new Error("地图数据加载失败");
        }
        const chinaJson = await response.json();
        echarts.registerMap("china", chinaJson);

        const container = await waitForContainerSize();
        if (
          disposed ||
          !container ||
          container.clientWidth === 0 ||
          container.clientHeight === 0
        ) {
          if (!disposed) throw new Error("地图容器尺寸异常，请刷新重试");
          return;
        }

        chart = echarts.init(container);
        chart.setOption({
          title: {
            text: "大明疆域",
            left: "center",
            top: 16,
            textStyle: { color: "#303133", fontSize: 18 },
          },
          tooltip: { trigger: "item", formatter: "{b}" },
          visualMap: {
            min: 0,
            max: 100,
            left: 24,
            bottom: 24,
            text: ["高", "低"],
            inRange: {
              color: ["#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
            },
            show: false,
          },
          series: [
            {
              name: "疆域",
              type: "map",
              map: "china",
              roam: true,
              emphasis: {
                label: { show: true },
                itemStyle: { areaColor: "#ffd666" },
              },
              itemStyle: {
                areaColor: "#74add1",
                borderColor: "#fff",
                borderWidth: 1,
              },
              data: [
                { name: "北京市", value: 90 },
                { name: "辽宁省", value: 70 },
                { name: "山东省", value: 60 },
                { name: "江苏省", value: 55 },
                { name: "浙江省", value: 50 },
                { name: "福建省", value: 45 },
                { name: "广东省", value: 40 },
                { name: "云南省", value: 35 },
              ],
            },
          ],
        });
      } catch (e) {
        if (!disposed) {
          setError(e instanceof Error ? e.message : "未知错误");
        }
      } finally {
        if (!disposed) setLoading(false);
      }
    }

    function handleResize() {
      chart?.resize();
    }

    initChart();
    window.addEventListener("resize", handleResize);

    return () => {
      disposed = true;
      window.removeEventListener("resize", handleResize);
      chart?.dispose();
      chart = null;
    };
  }, []);

  return (
    <div className="relative h-full min-h-[560px] bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-4">
      <div
        ref={containerRef}
        className="w-full min-h-[520px] h-[calc(100vh-160px)]"
      />
      {loading && (
        <div className="absolute inset-4 flex items-center bg-white z-[1]">
          <div className="w-full">
            <Skeleton paragraph={{ rows: 12 }} active />
          </div>
        </div>
      )}
      {error && (
        <Alert
          className="absolute top-6 left-6 right-6 z-[2]"
          message={error}
          type="error"
          showIcon
        />
      )}
    </div>
  );
}
