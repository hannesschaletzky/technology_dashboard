# Roadmap & Ideen

Ideen für die **App selbst**, also Funktionen, Werkzeuge und Infrastruktur. Neue Themen
werden über die Issue-Vorlage „Neues Thema“ vorgeschlagen.

Das ist eine Ideensammlung, keine Zusage. Wer etwas davon umsetzen will, öffnet bitte
vorher ein Issue.

**Aufwand:** S = ein paar Stunden · M = ein paar Tage · L = eine Woche oder mehr
**★** = zahlt direkt auf die fachliche Richtigkeit ein

---

## Als Nächstes

Fundament, bevor viele weitere Themen dazukommen.

| Idee | Aufwand | Warum |
| --- | :-: | --- |
| ★ **Unit-Tests für die Rechenlogik** der Demos (Vitest), z. B. „SHA-256 von `abc` ergibt den Testvektor aus FIPS 180-4“ oder „Softmax summiert sich zu 1“ | S | Die Demos sollen echte Verfahren zeigen. Tests stellen sicher, dass das so bleibt. |
| **Explainer-Baukasten**: wiederverwendbare Bausteine wie Schrittsteuerung, Slider mit Einheit, Formelanzeige (KaTeX), Vorher/Nachher-Vergleich, Hinweisbox „Beispielwert“ | M | Neue Themen gehen schneller und sehen einheitlich aus. |
| ★ **Inhalte als MDX** statt Text in TSX: Fließtext in `content.mdx`, Demos als eingebettete Komponenten | M | Fachleute können Texte ändern, ohne React zu können. Reviews werden lesbarer. |
| **Open-Graph-Bilder pro Thema** (`next/og`), Sitemap, strukturierte Daten | S | Gutes Aussehen beim Teilen auf Social Media, besser auffindbar. |
| **E2E- und Screenshot-Tests** (Playwright) für Dashboard und jede Themenseite | M | Kaputte Animationen oder Layouts fallen vor dem Merge auf. |
| **Echter 404-Status** für unbekannte Themen (Prüfung in `proxy.ts`) | S | Saubere Antworten für Suchmaschinen. |

## Lernerlebnis

| Idee | Aufwand | Beschreibung |
| --- | :-: | --- |
| **Wissensstufen** | M | Umschalter „Einsteiger / Fortgeschritten / Tiefgang“ pro Seite. Gleiche Demo, mehr Details und Formeln auf höherer Stufe. |
| ★ **Verständnis-Check** | M | 2–3 Fragen am Ende jedes Themas, auch interaktiv („Mache die Kette wieder gültig“). Jede Erklärung zur Antwort verweist auf eine Quelle. |
| **Glossar mit Tooltips** | M | Fachbegriffe werden automatisch verlinkt. Eine Definition gilt für alle Themen, damit keine Widersprüche entstehen. |
| **Lernpfade & Abhängigkeiten** | M | „Baut auf“-Angaben in der Registry, z. B. Hashfunktion → Public-Key → Blockchain. Auf der Themenseite erscheinen „Vorher lesen“ und „Danach spannend“. |
| **Wissensgraph auf dem Dashboard** | L | Alternative Ansicht: Themen als Knoten, Abhängigkeiten als Kanten (z. B. mit d3-force). |
| **Fortschritt merken** | S | Gelesene Themen und bestandene Checks lokal speichern (`localStorage`, ohne Konto). |
| **Mythen vs. Fakten** | S | Pro Thema 2–3 verbreitete Irrtümer mit Richtigstellung und Quelle. |
| **Zeitleiste** | M | Wichtige Meilensteine eines Themas mit Jahreszahl und Quelle. |
| **Größenordnungen fühlbar machen** | M | Gemeinsamer Baustein für Vergleiche wie Nanometer bis Haar oder Hashrate bis Würfelwürfe. |

## Interaktion & Gestaltung

| Idee | Aufwand | Beschreibung |
| --- | :-: | --- |
| **Scrollytelling** | M | Text scrollt, die Demo bleibt stehen und reagiert auf den aktuellen Abschnitt. |
| **3D-Szenen** | L | z. B. Bloch-Kugel für Qubits oder Satellitenbahnen für GPS (react-three-fiber). Nur auf der jeweiligen Themenseite geladen. |
| **Demo-Zustand teilen** | S | Zustand steckt in der URL (z. B. Temperatur 0.3), damit man genau diese Ansicht verlinken kann. |
| **Einbetten** | M | `/embed/<slug>/<step>` als schlanke Seite für Blogs, Moodle oder Notion. |
| **Präsentationsmodus** | M | Vollbild, ein Schritt pro Folie, Pfeiltasten. Für Lehrkräfte und Vorträge. |
| **Befehlspalette (⌘K)** | S | Schnell zu Themen und Glossarbegriffen springen. |
| **Helles Design** | S | Bisher gibt es nur dunkel. Farben dafür als Design-Variablen anlegen. |
| **Dezenter Sound** | S | Optional und standardmäßig aus, z. B. ein „Klick“ beim erfolgreichen Minen. |

## Fachliche Qualität ★

| Idee | Aufwand | Beschreibung |
| --- | :-: | --- |
| **Quellen pro Aussage** | M | Fußnoten im Text statt nur einer Liste am Ende. Reviewer:innen sehen direkt, welche Quelle welchen Satz belegt. |
| **Änderungshistorie pro Thema** | S | Seite „Was hat sich geändert?“, erzeugt aus Git-Historie und PR-Links. |
| **Link zum Review** | S | Das Review-Badge verlinkt auf den PR, in dem geprüft wurde. Wer was geprüft hat, wird nachvollziehbar. |
| **Quellen archivieren** | S | Beim Hinzufügen automatisch einen Snapshot bei archive.org anlegen und als Fallback speichern. |
| **Veraltungs-Warnung** | S | Themen, deren `lastReviewed` älter als X Monate ist, bekommen einen Hinweis. Die Frist hängt vom Thema ab, z. B. KI kürzer als Photovoltaik. |
| **„Stand“-Kennzeichnung für Zahlen** | S | Baustein `<Fact value="…" asOf="2026" source="…">`, damit keine Zahl ohne Datum und Quelle erscheint. |
| **KI-Vorprüfung im PR** | M | Ein Bot listet Aussagen ohne Quelle und mögliche Widersprüche auf. **Nur als Hinweis für Menschen, nie als Freigabe.** |

## Barrierefreiheit & Sprachen

| Idee | Aufwand | Beschreibung |
| --- | :-: | --- |
| **Englisch** (i18n mit `[locale]`-Segment) | L | Größere Reichweite und mehr potenzielle Mitwirkende. Übersetzungen brauchen ebenfalls ein Review. |
| **Textalternative pro Demo** | M | Für Screenreader eine Beschreibung des Zustands, z. B. „Block 2 ist ungültig, weil …“. |
| **Leichte Sprache** | L | Eigene Textstufe, idealerweise mit Fachleuten für Leichte Sprache. |
| **Varianten bei reduzierter Bewegung** | S | Statt Animationen einen Schritt-für-Schritt-Wechsel, nicht nur ausgeschaltete Bewegung. |
| **Barrierefreiheits-Prüfung in CI** | S | axe-core in den Playwright-Tests. |

## Schule & Lehre

| Idee | Aufwand | Beschreibung |
| --- | :-: | --- |
| **Material für Lehrkräfte** | M | Pro Thema ein druckbares Arbeitsblatt (PDF) mit Aufgaben zur Demo. |
| **Offline-Version** | M | Als App installierbar (PWA), damit es auch bei schlechtem Schul-WLAN läuft. |
| **Bezug zum Lehrplan** | S | Kennzeichnung, zu welchen Fächern und Klassenstufen ein Thema passt. |

## Community & Projekt

| Idee | Aufwand | Beschreibung |
| --- | :-: | --- |
| **Spielwiese für Bausteine** (Storybook o. ä.) | M | Mitwirkende sehen alle verfügbaren Bausteine an einem Ort. |
| **Seite mit Mitwirkenden** | S | Autor:innen und Reviewer:innen pro Thema würdigen. |
| **„War das verständlich?“-Feedback** | M | Daumen hoch/runter pro Schritt, datensparsam ohne Cookies. Zeigt, wo Erklärungen nicht funktionieren. |
| **Datensparsame Statistik** (z. B. Plausible) | S | Welche Themen interessieren, ohne Tracking. |
| **Vorlage für neue Themen** | S | `npm run new-topic <slug>` erzeugt Registry-Eintrag und Explainer-Grundgerüst. |

---

## Bewusst (vorerst) nicht

- **Benutzerkonten:** Fortschritt bleibt lokal. Konten bringen Datenschutzaufwand für wenig Nutzen.
- **KI-Chat „Frag das Thema“:** Verträgt sich schlecht mit dem Anspruch „fachlich geprüft“, weil Antworten nicht vorab geprüft werden können. Ein Chat, der nur geprüfte Inhalte zitiert, wäre später denkbar.
- **Nutzergenerierte Inhalte ohne Review:** Alles Inhaltliche läuft über Pull Requests.
