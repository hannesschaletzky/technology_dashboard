import { ArrowLeft, Hammer } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReviewBadge, StatusBadge } from "@/components/Badges";
import { TopicFacts } from "@/components/TopicFacts";
import { site } from "@/config";
import { explainers } from "@/topics/explainers";
import { categoryLabel, getTopic, topics } from "@/topics/registry";

export async function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tech/[slug]">): Promise<Metadata> {
  const topic = getTopic((await params).slug);
  return topic ? { title: topic.title, description: topic.tagline } : {};
}

export default async function TopicPage({ params }: PageProps<"/tech/[slug]">) {
  const topic = getTopic((await params).slug);
  if (!topic) notFound();

  const Icon = topic.icon;
  const Explainer = explainers[topic.slug];

  return (
    <article className="pt-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="size-4" aria-hidden /> Dashboard
      </Link>

      <header className="relative mt-8 mb-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-24 -z-10 size-80 rounded-full opacity-30 blur-3xl"
          style={{ background: topic.accent }}
        />
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="grid size-14 place-items-center rounded-2xl ring-1 ring-inset ring-white/10"
            style={{ background: `color-mix(in oklab, ${topic.accent} 18%, transparent)` }}
          >
            <Icon className="size-7" style={{ color: topic.accent }} aria-hidden />
          </span>
          <p className="text-xs uppercase tracking-wider text-slate-500">{categoryLabel(topic.category)}</p>
          <StatusBadge status={topic.status} />
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{topic.title}</h1>
        <p className="mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-slate-300">{topic.summary}</p>
        {topic.status !== "planned" && (
          <div className="mt-6">
            <ReviewBadge status={topic.review.status} lastReviewed={topic.review.lastReviewed} />
          </div>
        )}
      </header>

      {Explainer ? (
        <>
          <Explainer />
          <TopicFacts topic={topic} />
        </>
      ) : (
        <section className="rounded-2xl border border-dashed border-white/15 p-10 text-center">
          <Hammer className="mx-auto size-8 text-slate-500" aria-hidden />
          <h2 className="mt-4 text-xl font-semibold">Diese Erklärung ist noch in Planung</h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-400">
            Du kennst dich mit {topic.title} aus? Wir suchen Menschen, die Inhalte schreiben,
            Animationen bauen oder fachlich gegenlesen.
          </p>
          <a
            href={`${site.repoUrl}/blob/main/CONTRIBUTING.md`}
            className="mt-6 inline-block rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-950 hover:bg-slate-200"
          >
            Mitmachen
          </a>
        </section>
      )}
    </article>
  );
}
