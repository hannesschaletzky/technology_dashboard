import { TopicGrid } from "@/components/TopicGrid";
import { topics } from "@/topics/registry";

export default function Home() {
  const live = topics.filter((t) => t.status === "live").length;

  return (
    <>
      <section className="pb-12 pt-20 text-center sm:pt-28">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-indigo-300">
          {live} interaktive Erklärungen · {topics.length - live} in Planung
        </p>
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
          Wie funktioniert eigentlich{" "}
          <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
            …?
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-slate-400">
          Moderne Technologien zum Anfassen: spielerisch erklärt, mit offenen Quellen und
          transparent gemachten Vereinfachungen.
        </p>
      </section>

      <TopicGrid />
    </>
  );
}
