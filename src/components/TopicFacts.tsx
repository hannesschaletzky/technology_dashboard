import { BookOpen, ExternalLink, Flag, Lightbulb } from "lucide-react";

import { issueUrl } from "@/config";
import type { Topic } from "@/topics/types";

/** Vereinfachungen, Quellen und Fehlermeldung – auf jeder Live-Seite gleich. */
export function TopicFacts({ topic }: { topic: Topic }) {
  return (
    <div className="mt-16 grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-inset ring-white/10">
        <h2 className="mb-4 flex items-center gap-2 font-semibold">
          <Lightbulb className="size-5 text-amber-300" aria-hidden />
          Was wir hier vereinfachen
        </h2>
        <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
          {topic.simplifications.map((s) => (
            <li key={s} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-300/70" />
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-inset ring-white/10">
        <h2 className="mb-4 flex items-center gap-2 font-semibold">
          <BookOpen className="size-5 text-sky-300" aria-hidden />
          Quellen
        </h2>
        <ol className="space-y-3 text-sm">
          {topic.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-start gap-1.5 text-slate-200 hover:text-white"
              >
                <span className="underline decoration-white/20 underline-offset-4 group-hover:decoration-white/60">
                  {s.title}
                </span>
                <ExternalLink className="mt-0.5 size-3.5 shrink-0 opacity-50" aria-hidden />
              </a>
              <p className="mt-0.5 text-xs text-slate-500">
                {s.kind === "primary" ? "Primärquelle" : "Sekundärquelle"}
                {s.publisher && ` · ${s.publisher}`} · abgerufen {s.accessed}
              </p>
            </li>
          ))}
        </ol>

        <a
          href={issueUrl(topic.slug, topic.title)}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300 ring-1 ring-inset ring-white/10 hover:bg-white/10 hover:text-white"
        >
          <Flag className="size-4" aria-hidden />
          Fachlichen Fehler melden
        </a>
      </section>
    </div>
  );
}
