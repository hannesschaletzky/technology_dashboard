"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";

import { categoryLabel } from "@/topics/registry";
import type { Topic } from "@/topics/types";

import { StatusBadge } from "./Badges";

export function TopicCard({ topic }: { topic: Topic }) {
  const Icon = topic.icon;
  const isPlanned = topic.status === "planned";

  // Spotlight folgt dem Mauszeiger (rein per CSS-Variablen, ohne Re-Render)
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      href={`/tech/${topic.slug}`}
      onMouseMove={onMove}
      style={{ "--accent": topic.accent } as CSSProperties}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.03] p-6 ring-1 ring-inset ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-[color:var(--accent)]/50 ${
        isPlanned ? "opacity-70 hover:opacity-100" : ""
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%)",
        }}
      />

      <div className="relative flex items-start justify-between">
        <span
          className="grid size-12 place-items-center rounded-xl ring-1 ring-inset ring-white/10"
          style={{ background: `color-mix(in oklab, ${topic.accent} 15%, transparent)` }}
        >
          <Icon className="size-6" style={{ color: topic.accent }} aria-hidden />
        </span>
        <StatusBadge status={topic.status} />
      </div>

      <div className="relative mt-6 flex-1">
        <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">
          {categoryLabel(topic.category)}
        </p>
        <h2 className="flex items-center gap-1 text-lg font-semibold">
          {topic.title}
          <ArrowUpRight
            className="size-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden
          />
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{topic.tagline}</p>
      </div>
    </Link>
  );
}
