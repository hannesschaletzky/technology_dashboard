import { CircleAlert, ShieldCheck, Users } from "lucide-react";

import type { ReviewStatus, TopicStatus } from "@/topics/types";

const statusStyles: Record<TopicStatus, { label: string; className: string }> = {
  live: { label: "Live", className: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/30" },
  draft: { label: "In Arbeit", className: "bg-amber-400/15 text-amber-300 ring-amber-400/30" },
  planned: { label: "Geplant", className: "bg-white/5 text-slate-400 ring-white/10" },
};

export function StatusBadge({ status }: { status: TopicStatus }) {
  const s = statusStyles[status];
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${s.className}`}>
      {s.label}
    </span>
  );
}

const reviewStyles: Record<
  ReviewStatus,
  { label: string; className: string; Icon: typeof ShieldCheck }
> = {
  unreviewed: {
    label: "Noch nicht fachlich geprüft",
    className: "bg-amber-400/10 text-amber-200 ring-amber-400/30",
    Icon: CircleAlert,
  },
  "community-reviewed": {
    label: "Von der Community geprüft",
    className: "bg-sky-400/10 text-sky-200 ring-sky-400/30",
    Icon: Users,
  },
  "expert-reviewed": {
    label: "Von Fachleuten geprüft",
    className: "bg-emerald-400/10 text-emerald-200 ring-emerald-400/30",
    Icon: ShieldCheck,
  },
};

export function ReviewBadge({ status, lastReviewed }: { status: ReviewStatus; lastReviewed?: string }) {
  const s = reviewStyles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${s.className}`}
    >
      <s.Icon className="size-3.5" aria-hidden />
      {s.label}
      {lastReviewed && <span className="opacity-70">· {lastReviewed}</span>}
    </span>
  );
}
