/**
 * Prüft die Themen-Registry auf inhaltliche Mindeststandards (läuft in CI).
 *   npm run validate:topics               – Strukturprüfung
 *   npm run validate:topics -- --links    – zusätzlich alle Quellen-URLs abrufen
 */
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { categories, topics } from "../src/topics/registry.ts";

const topicsDir = fileURLToPath(new URL("../src/topics/", import.meta.url));
const explainersSource = readFileSync(`${topicsDir}explainers.ts`, "utf8");
const checkLinks = process.argv.includes("--links");
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const errors: string[] = [];
const fail = (slug: string, msg: string) => errors.push(`[${slug}] ${msg}`);

const slugs = new Set<string>();
for (const t of topics) {
  if (slugs.has(t.slug)) fail(t.slug, "Slug ist doppelt vergeben");
  slugs.add(t.slug);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t.slug)) fail(t.slug, "Slug muss kebab-case sein");
  if (!categories.some((c) => c.id === t.category)) fail(t.slug, `Unbekannte Kategorie "${t.category}"`);
  if (!/^#[0-9a-f]{6}$/i.test(t.accent)) fail(t.slug, "accent muss ein 6-stelliger Hex-Wert sein");

  const hasExplainer = existsSync(`${topicsDir}${t.slug}/Explainer.tsx`);
  const isRegistered = explainersSource.includes(`./${t.slug}/Explainer`);

  if (t.status === "planned") {
    if (hasExplainer) fail(t.slug, 'Hat eine Explainer.tsx, steht aber auf "planned"');
    continue;
  }

  if (!hasExplainer) fail(t.slug, `Fehlt: src/topics/${t.slug}/Explainer.tsx`);
  if (!isRegistered) fail(t.slug, "Explainer ist nicht in src/topics/explainers.ts eingetragen");
  if (t.simplifications.length === 0) fail(t.slug, "Mindestens eine Vereinfachung muss benannt sein");
  if (t.sources.length < 2) fail(t.slug, "Mindestens zwei Quellen erforderlich");
  if (!t.sources.some((s) => s.kind === "primary")) fail(t.slug, "Mindestens eine Primärquelle erforderlich");

  for (const s of t.sources) {
    if (!s.url.startsWith("https://")) fail(t.slug, `Quelle muss https sein: ${s.url}`);
    if (!ISO_DATE.test(s.accessed)) fail(t.slug, `accessed muss YYYY-MM-DD sein: ${s.title}`);
  }

  const { review } = t;
  if (review.status !== "unreviewed") {
    if (!review.lastReviewed || !ISO_DATE.test(review.lastReviewed))
      fail(t.slug, "Geprüfte Themen brauchen lastReviewed (YYYY-MM-DD)");
    const minReviewers = review.status === "community-reviewed" ? 2 : 1;
    if (review.reviewers.length < minReviewers)
      fail(t.slug, `Status "${review.status}" braucht mindestens ${minReviewers} Reviewer`);
  }
}

if (checkLinks) {
  const sources = topics.flatMap((t) => t.sources.map((s) => ({ slug: t.slug, url: s.url })));
  await Promise.all(
    sources.map(async ({ slug, url }) => {
      try {
        const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15_000) });
        if (!res.ok) fail(slug, `Quelle nicht erreichbar (${res.status}): ${url}`);
      } catch (e) {
        fail(slug, `Quelle nicht erreichbar (${(e as Error).message}): ${url}`);
      }
    }),
  );
}

if (errors.length) {
  console.error(`✖ ${errors.length} Problem(e) gefunden:\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log(`✔ ${topics.length} Themen geprüft${checkLinks ? " (inkl. Links)" : ""}`);
