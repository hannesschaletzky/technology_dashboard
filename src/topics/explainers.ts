import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Interaktive Erklärung je Thema. Jede Komponente wird als eigener Chunk
 * geladen. Neues Thema → hier eintragen (validate:topics prüft die Zuordnung).
 */
export const explainers: Record<string, ComponentType> = {
  blockchain: dynamic(() => import("./blockchain/Explainer")),
  llm: dynamic(() => import("./llm/Explainer")),
};
