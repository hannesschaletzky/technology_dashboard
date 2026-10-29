# Technology Dashboard

**Wie funktioniert eigentlich …?** – Moderne Technologien interaktiv erklärt.
Blockchain, Large Language Models, Quantencomputing, 6G und mehr: jedes Thema hat eine
eigene Seite mit Demos zum Ausprobieren, benannten Vereinfachungen und überprüfbaren Quellen.

> **Spielerisch, aber korrekt.** Jede Erklärung nennt ihre Quellen, legt offen, was sie
> vereinfacht, und zeigt, ob sie bereits fachlich geprüft wurde.
> → [Fact-Checking-Prozess](docs/FACT_CHECKING.md)

## Themen

| Thema                   | Status   | Interaktion                                                        |
| ----------------------- | -------- | ------------------------------------------------------------------ |
| Blockchain              | Live     | Echtes SHA-256, eine Kette zum Manipulieren, Proof-of-Work-Mining  |
| Large Language Models   | Live     | Tokens, Softmax mit Temperatur-Regler, Token-für-Token-Generierung |
| Quantencomputing        | Geplant  |                                                                    |
| 6G                      | Geplant  |                                                                    |
| Public-Key-Kryptografie | Geplant  |                                                                    |
| Neuronale Netze         | Geplant  |                                                                    |
| Das Internet            | Geplant  |                                                                    |
| GPS                     | Geplant  |                                                                    |
| Transistoren & Chips    | Geplant  |                                                                    |
| CRISPR/Cas9             | Geplant  |                                                                    |
| Lithium-Ionen-Akku      | Geplant  |                                                                    |
| Photovoltaik            | Geplant  |                                                                    |
| Kernfusion              | Geplant  |                                                                    |

Du willst ein Thema übernehmen? → [CONTRIBUTING.md](CONTRIBUTING.md)

## Tech-Stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components) & React 19
- TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Motion](https://motion.dev) für Animationen
- [Lucide](https://lucide.dev) Icons

Alle Themenseiten werden beim Build statisch vorgerendert. Jede interaktive Erklärung ist
ein eigener JavaScript-Chunk und wird erst beim Aufruf ihrer Seite geladen.

## Schnellstart

Voraussetzung: Node.js ≥ 22 (empfohlen: 24, siehe `.nvmrc`).

```bash
npm install
npm run dev          # Entwicklungsserver auf http://localhost:3000
```

| Script                             | Zweck                                                         |
| ---------------------------------- | ------------------------------------------------------------- |
| `npm run dev`                      | Entwicklungsserver                                            |
| `npm run build` / `npm start`      | Produktions-Build bzw. -Server                                |
| `npm run lint`                     | ESLint                                                        |
| `npm run typecheck`                | Route-Typen generieren + TypeScript-Prüfung                   |
| `npm run validate:topics`          | Prüft Registry: Quellen, Vereinfachungen, Review-Status usw.  |
| `npm run validate:topics -- --links` | zusätzlich: Sind alle Quellen-URLs erreichbar?              |
| `npm run check`                    | Lint + Typecheck + Validierung (läuft in CI)                  |

## Projektstruktur

```
src/
├── app/                          # Next.js App Router (Routen)
│   ├── layout.tsx                # Root-Layout: Fonts, Header, Footer
│   ├── page.tsx                  # Dashboard (Homescreen mit Kacheln)
│   ├── tech/[slug]/page.tsx      # Detailseite je Thema (statisch vorgerendert)
│   ├── methodik/page.tsx         # Wie wir fachliche Richtigkeit sicherstellen
│   └── not-found.tsx
├── components/
│   ├── TopicGrid.tsx             # Filter, Suche, animiertes Kachel-Raster
│   ├── TopicCard.tsx             # Einzelne Kachel (Spotlight-Hover)
│   ├── TopicFacts.tsx            # „Was wir vereinfachen“ + Quellen + Fehler melden
│   ├── Badges.tsx                # Status- & Review-Badges
│   ├── SiteShell.tsx             # Header, Hintergrund, Footer
│   └── explainer/Step.tsx        # Baustein für nummerierte Erklär-Schritte
├── topics/
│   ├── types.ts                  # Datenmodell (Topic, Source, Review …)
│   ├── registry.ts               # ★ Alle Themen inkl. Quellen & Vereinfachungen
│   ├── explainers.ts             # Slug → lazy geladene Explainer-Komponente
│   ├── blockchain/Explainer.tsx
│   └── llm/Explainer.tsx
└── config.ts                     # Seitenname, Repo-URL
scripts/validate-topics.ts        # Inhaltliche Mindeststandards (CI)
docs/
├── FACT_CHECKING.md              # Prüfprozess & Prüfstufen
├── REVIEWERS.md                  # Fachliche Reviewer:innen
└── ROADMAP.md                    # Ideen für die Weiterentwicklung
.github/                          # CI, Issue- & PR-Vorlagen
```

### Wie ein Thema aufgebaut ist

Ein Thema besteht aus zwei Teilen:

1. **Metadaten** in `src/topics/registry.ts`: Titel, Kurztext, Kategorie, Icon, Akzentfarbe,
   Status (`planned` → `draft` → `live`), **Quellen**, **Vereinfachungen** und **Review-Status**.
2. **Interaktive Erklärung** in `src/topics/<slug>/Explainer.tsx`: eine Client-Komponente,
   die in `src/topics/explainers.ts` registriert wird.

Die Detailseite setzt beides automatisch zusammen: Kopfbereich mit Review-Badge → Explainer →
Vereinfachungen & Quellen → „Fehler melden“-Button. Themen mit Status `planned` zeigen eine
„Mitmachen“-Seite.

## Fachliche Richtigkeit

Das ist der Kern des Projekts, deshalb ist er technisch abgesichert:

- **Datenmodell erzwingt Transparenz:** Quellen (mit Primär/Sekundär-Kennzeichnung und
  Abrufdatum), Vereinfachungen und Review-Status sind Pflichtfelder.
- **Automatische Prüfung (CI):** Live-Themen brauchen ≥ 2 Quellen, davon ≥ 1 Primärquelle,
  benannte Vereinfachungen und – für höhere Prüfstufen – eingetragene Reviewer:innen.
  Quellen-Links werden wöchentlich auf Erreichbarkeit geprüft.
- **Echte Verfahren statt Fake-Animationen:** Die Blockchain-Demo rechnet echtes SHA-256
  (Web Crypto API), die LLM-Demo die echte Softmax-Formel. Handgewählte Beispielwerte sind
  im UI gekennzeichnet.
- **Prüfstufen sichtbar:** `unreviewed` → `community-reviewed` → `expert-reviewed`.
- **Fehler melden mit einem Klick:** vorausgefülltes GitHub-Issue auf jeder Themenseite.

Details: [docs/FACT_CHECKING.md](docs/FACT_CHECKING.md)

## Deployment

Standard-Next.js-App, z. B. auf [Vercel](https://vercel.com) oder per `npm run build && npm start`
auf jedem Node-Server.

## Mitmachen

Beiträge sind willkommen – besonders **fachliches Gegenlesen**!
Siehe [CONTRIBUTING.md](CONTRIBUTING.md). Ideen für die Weiterentwicklung der App sammelt
die [Roadmap](docs/ROADMAP.md).

## Lizenz

[MIT](LICENSE)
