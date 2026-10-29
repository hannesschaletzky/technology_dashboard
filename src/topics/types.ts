import type { LucideIcon } from "lucide-react";

/** Lebenszyklus eines Themas – steuert Darstellung auf dem Dashboard. */
export type TopicStatus = "live" | "draft" | "planned";

/**
 * Fachliche Prüfstufe. Ein Thema startet immer bei "unreviewed" und wird
 * erst durch dokumentierte Reviews hochgestuft (siehe docs/FACT_CHECKING.md).
 */
export type ReviewStatus = "unreviewed" | "community-reviewed" | "expert-reviewed";

export type CategoryId =
  | "ai"
  | "computing"
  | "security"
  | "networks"
  | "energy"
  | "life-sciences";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Source {
  title: string;
  url: string;
  /** z. B. "NIST", "arXiv", "ITU" */
  publisher?: string;
  /** Primärquelle (Paper, Standard) vs. Sekundärquelle (Lehrbuch, Doku). */
  kind: "primary" | "secondary";
  /** Datum des letzten Abrufs, ISO-Format YYYY-MM-DD. */
  accessed: string;
}

export interface Review {
  status: ReviewStatus;
  /** GitHub-Handles bzw. Namen der Reviewer:innen. */
  reviewers: string[];
  /** ISO-Datum YYYY-MM-DD */
  lastReviewed?: string;
}

export interface Topic {
  slug: string;
  title: string;
  /** Eine Zeile für die Kachel. */
  tagline: string;
  /** 2–3 Sätze für den Kopf der Detailseite. */
  summary: string;
  category: CategoryId;
  icon: LucideIcon;
  /** Akzentfarbe als Hex-Wert, wird für Glows & Highlights genutzt. */
  accent: string;
  status: TopicStatus;
  /**
   * Was die interaktive Darstellung bewusst vereinfacht. Pflicht für "live":
   * Didaktische Vereinfachung ist okay – solange sie transparent ist.
   */
  simplifications: string[];
  sources: Source[];
  review: Review;
}
