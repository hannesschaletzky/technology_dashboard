# Fact-Checking-Prozess

Spielerisch heißt nicht ungenau. Dieses Dokument beschreibt, wie wir die fachliche
Richtigkeit der Erklärungen sicherstellen. Es ist ein **erster Entwurf** und soll mit
dem Projekt wachsen.

## 1. Grundprinzipien

1. **Quellen zuerst.** Jede Live-Erklärung nennt mindestens **zwei Quellen**, davon
   mindestens **eine Primärquelle** (Originalpaper, Standard, offizielle Spezifikation).
   Wikipedia, Blogposts oder KI-generierte Texte sind höchstens Einstieg, nie Beleg.
2. **Vereinfachungen offenlegen.** Jede bewusste didaktische Vereinfachung wird im Feld
   `simplifications` der Registry benannt und auf der Seite angezeigt.
3. **Rechnen statt malen.** Wo möglich, läuft die Demo mit dem echten Verfahren
   (z. B. echtes SHA-256 via Web Crypto, echte Softmax-Formel). Handgewählte Beispielwerte
   müssen im UI als solche gekennzeichnet sein.
4. **Prüfstatus sichtbar.** Jede Seite zeigt ihren Review-Status – auch „ungeprüft“.
5. **Keine Prognosen als Fakten.** Zukunftsthemen (z. B. 6G, Fusion) trennen klar zwischen
   Standardisiertem, Demonstriertem und Erwartetem/Spekulativem.

## 2. Prüfstufen

| Status               | Bedeutung                                                          | Voraussetzung (wird von `validate:topics` geprüft) |
| -------------------- | ------------------------------------------------------------------ | -------------------------------------------------- |
| `unreviewed`         | Mit Quellen belegt, aber nicht unabhängig gegengelesen             | –                                                  |
| `community-reviewed` | Von mind. 2 Personen (außer Autor:in) inhaltlich geprüft           | ≥ 2 `reviewers`, `lastReviewed` gesetzt            |
| `expert-reviewed`    | Von mind. 1 Person mit nachweisbarer Fachexpertise freigegeben     | ≥ 1 `reviewers`, `lastReviewed` gesetzt            |

„Nachweisbare Fachexpertise“ heißt z. B. einschlägige Publikationen, Lehrtätigkeit oder
Berufserfahrung im Thema. Expert:innen werden in [`REVIEWERS.md`](./REVIEWERS.md) mit
Fachgebiet und (freiwilligem) Profil-Link geführt.

## 3. Ablauf für ein neues Thema

1. **Issue „Neues Thema“** öffnen: Lernziele, geplante Demo, Quellen.
2. **Pull Request** mit Explainer + Registry-Eintrag, Status `draft` oder `live`,
   Review-Status `unreviewed`.
3. **Fachliches Review** im PR. Reviewer:innen arbeiten die Checkliste ab (siehe unten)
   und kommentieren jede beanstandete Aussage mit Quelle.
4. Nach Freigabe trägt die Maintainerin bzw. der Maintainer `reviewers` und
   `lastReviewed` ein und hebt den Status an.

### Review-Checkliste

- [ ] Jede Kernaussage im Text ist durch eine der Quellen gedeckt.
- [ ] Die Demo verhält sich so, wie das reale Verfahren es tun würde (im Rahmen der benannten Vereinfachungen).
- [ ] Keine Vereinfachung führt zu einer **falschen** Vorstellung (vereinfacht ≠ falsch).
- [ ] Zahlen haben Einheit, Größenordnung und Stand (Jahr).
- [ ] Beispielwerte sind im UI als Beispiel gekennzeichnet.
- [ ] Aussagen zu Zukunft/Forschung sind als solche erkennbar.

## 4. Fehler melden & Korrekturen

- Jede Seite hat einen Button **„Fachlichen Fehler melden“**, der ein vorausgefülltes
  Issue (`fact-error.yml`) öffnet.
- Fachliche Fehler haben Vorrang vor neuen Features.
- Eine **inhaltliche** Änderung an einem geprüften Thema setzt den Status auf
  `unreviewed` zurück, bis sie erneut geprüft wurde. Reine Tippfehler/Design-Änderungen nicht.

## 5. Regelmäßige Wartung

- `npm run validate:topics -- --links` prüft, ob alle Quellen noch erreichbar sind
  (läuft wöchentlich in CI).
- Schnelllebige Themen (KI, Mobilfunk) sollten mindestens jährlich auf Aktualität geprüft
  werden; `lastReviewed` macht das Alter sichtbar.

## Offene Punkte

- [ ] Wie gewinnen wir Fach-Reviewer:innen (Hochschulen, Fachverbände, Community)?
- [ ] Sollen Reviews signiert/verlinkt werden (z. B. Link auf den Review-PR)?
- [ ] Brauchen wir einen Prozess für strittige Fachfragen (z. B. zweite Expertenmeinung)?
