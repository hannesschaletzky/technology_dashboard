"use client";

import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { categories, topics } from "@/topics/registry";
import type { CategoryId } from "@/topics/types";

import { TopicCard } from "./TopicCard";

export function TopicGrid() {
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const visible = topics.filter(
    (t) =>
      (category === "all" || t.category === category) &&
      (!q || `${t.title} ${t.tagline}`.toLowerCase().includes(q)),
  );

  const chip = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-sm transition ring-1 ring-inset ${
      active
        ? "bg-white text-slate-950 ring-white"
        : "text-slate-300 ring-white/10 hover:bg-white/5"
    }`;

  return (
    <section aria-label="Themen">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button className={chip(category === "all")} onClick={() => setCategory("all")}>
            Alle
          </button>
          {categories.map((c) => (
            <button key={c.id} className={chip(category === c.id)} onClick={() => setCategory(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
        <label className="relative block lg:w-64">
          <span className="sr-only">Themen durchsuchen</span>
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suchen…"
            className="w-full rounded-full bg-white/5 py-2 pl-9 pr-4 text-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:outline-none focus:ring-indigo-400/60"
          />
        </label>
      </div>

      <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((topic, i) => (
            <motion.li
              key={topic.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.03 } }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <TopicCard topic={topic} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="py-16 text-center text-slate-500">Kein Thema gefunden – schlag eins vor!</p>
      )}
    </section>
  );
}
