import type { TimelineEvent } from "../timelineTypes";

const CHUNK_LOADERS = [
  () => import("./events-01").then((m) => m.TIMELINE_EVENTS_01),
  () => import("./events-02").then((m) => m.TIMELINE_EVENTS_02),
  () => import("./events-03").then((m) => m.TIMELINE_EVENTS_03),
  () => import("./events-04").then((m) => m.TIMELINE_EVENTS_04),
  () => import("./events-05").then((m) => m.TIMELINE_EVENTS_05),
  () => import("./events-06").then((m) => m.TIMELINE_EVENTS_06),
  () => import("./events-07").then((m) => m.TIMELINE_EVENTS_07),
  () => import("./events-08").then((m) => m.TIMELINE_EVENTS_08),
  () => import("./events-09").then((m) => m.TIMELINE_EVENTS_09),
  () => import("./events-10").then((m) => m.TIMELINE_EVENTS_10),
] as const;

export async function loadTimelineEvents(): Promise<TimelineEvent[]> {
  const chunks = await Promise.all(CHUNK_LOADERS.map((load) => load()));
  return chunks.flat();
}
