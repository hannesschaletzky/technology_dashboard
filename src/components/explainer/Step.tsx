"use client";

import { motion } from "motion/react";

/** Ein nummerierter Abschnitt einer Erklärung: Text links/oben, Demo darunter. */
export function Step({
  n,
  title,
  children,
  intro,
}: {
  n: number;
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-16"
    >
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-mono text-sm text-slate-500">{String(n).padStart(2, "0")}</span>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <div className="mt-2 max-w-3xl leading-relaxed text-slate-400">{intro}</div>
        </div>
      </div>
      <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/10 sm:p-6">{children}</div>
    </motion.section>
  );
}
