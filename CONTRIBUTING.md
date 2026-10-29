# Mitmachen

Danke, dass du helfen willst! Es gibt drei Wege beizutragen – Code ist nur einer davon.

| Du kannst …                       | So geht’s                                                                 |
| --------------------------------- | ------------------------------------------------------------------------- |
| **Fehler melden**                 | Button „Fachlichen Fehler melden“ auf jeder Seite oder Issue-Vorlage      |
| **Fachlich gegenlesen**           | PRs mit Label `needs-review` prüfen, siehe [Fact-Checking](docs/FACT_CHECKING.md) |
| **Ein Thema bauen**               | Anleitung unten                                                           |

## Lokales Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # Lint + Typecheck + Themen-Validierung (wie in CI)
```

## Ein neues Thema hinzufügen

1. **Issue öffnen** („Neues Thema“), damit wir Doppelarbeit vermeiden.
2. **Registry-Eintrag** in [`src/topics/registry.ts`](src/topics/registry.ts) anlegen bzw.
   den bestehenden `planned`-Eintrag ausbauen: `summary`, `simplifications`, `sources`.
3. **Explainer bauen** unter `src/topics/<slug>/Explainer.tsx`
   (Client-Komponente, `export default`). Orientiere dich an
   [`blockchain`](src/topics/blockchain/Explainer.tsx) bzw. [`llm`](src/topics/llm/Explainer.tsx)
   und nutze `Step` aus `src/components/explainer/` für eine einheitliche Gliederung.
4. **Explainer registrieren** in [`src/topics/explainers.ts`](src/topics/explainers.ts).
5. `status` auf `"live"` setzen, `review.status` bleibt `"unreviewed"`.
6. `npm run check` – der Validator sagt dir, was noch fehlt.

### Richtlinien für Erklärungen

- **Erst verstehen lassen, dann benennen.** Interaktion vor Fachbegriff.
- **3–5 Schritte** pro Thema, jeder mit einer klaren Erkenntnis.
- **Echte Verfahren** rechnen lassen, wo es geht; Beispielwerte kennzeichnen.
- **Barrierearm:** Tastaturbedienbar, ausreichender Kontrast, `prefers-reduced-motion` respektieren,
  keine Information nur über Farbe.
- **Performance:** Schwere Bibliotheken (3D etc.) nur im jeweiligen Explainer importieren –
  jeder Explainer ist ein eigener Chunk.

## Pull Requests

- Ein Thema bzw. ein Anliegen pro PR.
- Fülle die PR-Checkliste aus, insbesondere den fachlichen Teil.
- Mit dem Einreichen stimmst du zu, dass dein Beitrag unter der [Lizenz](LICENSE) des Projekts steht.
