import { CircleAlert, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from "next";

import { site } from "@/config";

export const metadata: Metadata = {
  title: "Methodik",
  description: "Wie wir sicherstellen, dass die Erklärungen fachlich korrekt sind.",
};

const principles = [
  ["Quellen zuerst", "Jede Live-Erklärung nennt mindestens zwei Quellen, davon mindestens eine Primärquelle (Paper, Standard, offizielle Spezifikation)."],
  ["Vereinfachungen offenlegen", "Didaktische Vereinfachung ist erwünscht – aber jede wird auf der Seite unter „Was wir hier vereinfachen“ benannt."],
  ["Rechnen statt malen", "Wo möglich, laufen Demos mit echten Verfahren (z. B. echtes SHA-256, echte Softmax) statt mit vorgefertigten Animationen."],
  ["Prüfstatus sichtbar machen", "Jede Seite zeigt, ob und von wem sie fachlich gegengelesen wurde – auch wenn das noch niemand getan hat."],
];

const levels = [
  { Icon: CircleAlert, color: "text-amber-300", title: "Noch nicht fachlich geprüft", text: "Inhalt ist mit Quellen belegt, aber noch nicht unabhängig gegengelesen." },
  { Icon: Users, color: "text-sky-300", title: "Von der Community geprüft", text: "Mindestens zwei Personen außer der Autorin bzw. dem Autor haben Inhalt und Quellen geprüft." },
  { Icon: ShieldCheck, color: "text-emerald-300", title: "Von Fachleuten geprüft", text: "Mindestens eine Person mit nachweisbarer Fachexpertise im Thema hat den Inhalt freigegeben." },
];

export default function MethodikPage() {
  return (
    <article className="mx-auto max-w-3xl pt-16">
      <h1 className="text-4xl font-bold tracking-tight">Methodik</h1>
      <p className="mt-4 text-lg text-slate-400">
        Spielerisch heißt nicht ungenau. So stellen wir sicher, dass du hier nichts Falsches lernst.
      </p>

      <ol className="mt-10 space-y-4">
        {principles.map(([title, text], i) => (
          <li key={title} className="flex gap-4 rounded-2xl bg-white/[0.03] p-5 ring-1 ring-inset ring-white/10">
            <span className="font-mono text-sm text-slate-500">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-1 text-slate-400">{text}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 text-2xl font-semibold">Prüfstufen</h2>
      <ul className="mt-6 space-y-4">
        {levels.map(({ Icon, color, title, text }) => (
          <li key={title} className="flex gap-4">
            <Icon className={`mt-0.5 size-5 shrink-0 ${color}`} aria-hidden />
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-slate-400">{text}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-14 text-slate-400">
        Fehler entdeckt? Jede Seite hat einen Button „Fachlichen Fehler melden“. Den kompletten Prozess
        beschreibt{" "}
        <a href={`${site.repoUrl}/blob/main/docs/FACT_CHECKING.md`} className="text-indigo-300 underline">
          docs/FACT_CHECKING.md
        </a>
        .
      </p>
    </article>
  );
}
