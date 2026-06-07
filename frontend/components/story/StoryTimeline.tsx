"use client";

import { useEffect, useMemo, useState } from "react";

import { loadTimelineEvents } from "./timelineData";
import {
  CATEGORIES,
  CATEGORY_MAP,
  ERAS,
  type EventCategory,
  type TimelineEvent,
} from "./timelineTypes";

function groupByEra(events: TimelineEvent[]) {
  return ERAS.map((era) => ({
    era,
    events: events.filter((e) => e.era === era.key),
  })).filter((g) => g.events.length > 0);
}

export default function StoryTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategories, setActiveCategories] = useState<Set<EventCategory>>(
    new Set()
  );
  const [activePerson, setActivePerson] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    loadTimelineEvents().then((data) => {
      if (!cancelled) {
        setEvents(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const allPersons = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => e.characters.forEach((c) => set.add(c)));
    return Array.from(set);
  }, [events]);

  const filtered = useMemo(() => {
    const q = query.trim();
    return events.filter((e) => {
      if (activeCategories.size > 0 && !activeCategories.has(e.category)) {
        return false;
      }
      if (activePerson && !e.characters.includes(activePerson)) {
        return false;
      }
      if (q) {
        const haystack =
          e.title + e.summary + e.characters.join("") + e.dateLabel;
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [events, activeCategories, activePerson, query]);

  const grouped = useMemo(() => groupByEra(filtered), [filtered]);

  const personCount = useMemo(() => {
    const set = new Set<string>();
    filtered.forEach((e) => e.characters.forEach((c) => set.add(c)));
    return set.size;
  }, [filtered]);

  function toggleCategory(key: EventCategory) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function resetFilters() {
    setActiveCategories(new Set());
    setActivePerson(null);
    setQuery("");
  }

  const hasFilter =
    activeCategories.size > 0 || activePerson !== null || query.trim() !== "";

  if (loading) {
    return (
      <div className="mx-auto max-w-[1100px] px-6 py-20 text-center text-[#909399]">
        加载时间线数据…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] px-6 py-8">
      <header className="mb-6">
        <h1 className="m-0 text-2xl font-semibold text-[#303133]">
          历史故事时间线
        </h1>
        <p className="mt-1.5 mb-0 text-sm text-[#909399]">
          《明熹宗实录》与《崇祯实录》摘要 · 自泰昌元年（1620）至崇祯十七年明亡（1644）·
          共 {events.length} 个关键事件
        </p>
      </header>

      {/* 统计 */}
      <div className="mb-5 flex flex-wrap gap-3">
        <StatCard label="事件" value={filtered.length} suffix="件" />
        <StatCard label="涉及人物" value={personCount} suffix="人" />
        <StatCard label="时间跨度" value={25} suffix="年" />
      </div>

      {/* 筛选栏 */}
      <div className="mb-8 rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-[#909399]">按主题筛选</span>
          {hasFilter && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-[#409eff] hover:underline cursor-pointer"
            >
              清除全部筛选
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = activeCategories.has(cat.key);
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => toggleCategory(cat.key)}
                className={[
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors cursor-pointer",
                  active
                    ? cat.badge
                    : "border-transparent bg-[#f5f7fa] text-[#606266] hover:bg-[#ecf5ff]",
                ].join(" ")}
              >
                <span className={`h-2 w-2 rounded-full ${cat.dot}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-[#909399]">检索人物 / 事件</span>
          <input
            list="story-persons"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入人物或关键词，如 袁崇焕、移宫、宁远…"
            className="min-w-[240px] flex-1 rounded-lg border border-[#dcdfe6] px-3 py-1.5 text-sm text-[#303133] outline-none focus:border-[#409eff]"
          />
          <datalist id="story-persons">
            {allPersons.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </div>

        {activePerson && (
          <div className="mt-3 flex items-center gap-2 text-xs text-[#606266]">
            <span>仅看人物：</span>
            <span className="flex items-center gap-1.5 rounded-full bg-[#409eff] px-2.5 py-1 text-white">
              {activePerson}
              <button
                type="button"
                onClick={() => setActivePerson(null)}
                className="cursor-pointer leading-none hover:opacity-80"
                aria-label="取消人物筛选"
              >
                ×
              </button>
            </span>
          </div>
        )}
      </div>

      {/* 时间线 */}
      {grouped.length === 0 ? (
        <div className="py-20 text-center text-[#909399]">
          <p className="mb-1">没有匹配的事件。</p>
          <p className="text-sm">试试调整筛选条件或清除筛选。</p>
        </div>
      ) : (
        grouped.map((group) => (
          <section key={group.era.key} className="mb-10">
            <div className="sticky top-0 z-10 mb-4 flex items-center gap-3 bg-[#f5f7fa]/90 py-2 backdrop-blur">
              <span
                className={`inline-flex h-9 items-center rounded-lg bg-gradient-to-r px-3 text-sm font-semibold text-white ${group.era.accent}`}
              >
                {group.era.label}
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium text-[#303133]">
                  {group.era.reign}
                </span>
                <span className="text-xs text-[#909399]">
                  {group.era.range} · {group.events.length} 件
                </span>
              </div>
            </div>

            <ol className="relative ml-3 border-l-2 border-[#e4e7ed] pl-6">
              {group.events.map((event) => {
                const cat = CATEGORY_MAP[event.category];
                return (
                  <li key={event.id} className="relative mb-5">
                    <span
                      className={`absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-[#f5f7fa] ${cat.dot}`}
                    />
                    <article className="rounded-xl bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_18px_rgba(0,0,0,0.1)]">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-[#409eff]">
                          {event.dateLabel}
                        </span>
                        <span
                          className={`rounded border px-1.5 py-0.5 text-[11px] ${cat.badge}`}
                        >
                          {cat.label}
                        </span>
                        <span className="rounded bg-[#f5f7fa] px-1.5 py-0.5 text-[11px] text-[#909399]">
                          {event.source}
                        </span>
                      </div>
                      <h3 className="m-0 mb-1.5 text-base font-semibold text-[#303133]">
                        {event.title}
                      </h3>
                      <p className="m-0 mb-3 text-sm leading-relaxed text-[#606266]">
                        {event.summary}
                      </p>
                      {event.characters.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {event.characters.map((person) => (
                            <button
                              key={person}
                              type="button"
                              onClick={() =>
                                setActivePerson((cur) =>
                                  cur === person ? null : person
                                )
                              }
                              className={[
                                "rounded-full px-2 py-0.5 text-xs transition-colors cursor-pointer",
                                activePerson === person
                                  ? "bg-[#409eff] text-white"
                                  : "bg-[#f0f2f5] text-[#606266] hover:bg-[#ecf5ff] hover:text-[#409eff]",
                              ].join(" ")}
                            >
                              {person}
                            </button>
                          ))}
                        </div>
                      )}
                    </article>
                  </li>
                );
              })}
            </ol>
          </section>
        ))
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) {
  return (
    <div className="rounded-xl bg-white px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="text-xs text-[#909399]">{label}</div>
      <div className="text-xl font-semibold text-[#303133]">
        {value}
        <span className="ml-0.5 text-sm font-normal text-[#909399]">
          {suffix}
        </span>
      </div>
    </div>
  );
}
