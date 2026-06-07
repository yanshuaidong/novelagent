export type EventCategory =
  | "jitong"
  | "dangzheng"
  | "liaodong"
  | "xinan"
  | "yanhuan"
  | "liukou"
  | "haifang"
  | "zaiyi";

export interface TimelineEvent {
  id: string;
  era: "taichang" | "tianqi" | "chongzhen";
  dateLabel: string;
  year: number;
  category: EventCategory;
  title: string;
  summary: string;
  characters: string[];
  source: string;
}

export interface CategoryMeta {
  key: EventCategory;
  label: string;
  dot: string;
  badge: string;
}

export interface EraMeta {
  key: TimelineEvent["era"];
  label: string;
  reign: string;
  range: string;
  accent: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    key: "jitong",
    label: "继统典礼",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    key: "dangzheng",
    label: "三案党争",
    dot: "bg-rose-500",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    key: "liaodong",
    label: "辽东战事",
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    key: "xinan",
    label: "西南奢安",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    key: "yanhuan",
    label: "内廷阉宦",
    dot: "bg-purple-500",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    key: "liukou",
    label: "流寇民变",
    dot: "bg-orange-500",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    key: "haifang",
    label: "海防外交",
    dot: "bg-cyan-500",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    key: "zaiyi",
    label: "灾异天变",
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-600 border-slate-300",
  },
];

export const CATEGORY_MAP: Record<EventCategory, CategoryMeta> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.key] = c;
    return acc;
  },
  {} as Record<EventCategory, CategoryMeta>
);

export const ERAS: EraMeta[] = [
  {
    key: "taichang",
    label: "泰昌",
    reign: "明光宗 朱常洛",
    range: "1620",
    accent: "from-amber-400 to-amber-600",
  },
  {
    key: "tianqi",
    label: "天启",
    reign: "明熹宗 朱由校",
    range: "1621 – 1627",
    accent: "from-rose-400 to-rose-600",
  },
  {
    key: "chongzhen",
    label: "崇祯",
    reign: "明思宗 朱由检",
    range: "1628 – 1644",
    accent: "from-indigo-400 to-indigo-600",
  },
];
