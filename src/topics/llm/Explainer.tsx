"use client";

import { Dices, RotateCcw, Thermometer } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Step } from "@/components/explainer/Step";

const PROMPT_TOKENS = ["Der", " Him", "mel", " ist"];

/**
 * Handgewählte Logits (Rohwerte vor Softmax) für eine Mini-Demo.
 * Schlüssel = bisher erzeugte Fortsetzung. NICHT von einem echten Modell.
 */
const LOGITS: Record<string, [token: string, logit: number][]> = {
  "": [[" blau", 4.0], [" heute", 2.6], [" grau", 2.4], [" bewölkt", 2.0], [" klar", 1.6], [" voller", 1.4], [" grün", -0.5]],
  " blau": [[".", 3.4], [" und", 2.6], [",", 2.1], [" wie", 1.0]],
  " heute": [[" blau", 2.8], [" grau", 2.5], [" wolkenlos", 2.2], [" besonders", 1.5]],
  " grau": [[".", 3.2], [",", 1.9], [" und", 2.4], [" geworden", 1.6]],
  " bewölkt": [[".", 3.5], [" und", 2.4], [",", 2.0]],
  " klar": [[".", 3.3], [" und", 2.6], [",", 1.8]],
  " voller": [[" Sterne", 3.6], [" Wolken", 3.0], [" Vögel", 1.4]],
  " grün": [[".", 1.5], [" gefärbt", 1.2], [" –", 0.8]],
};

/** Softmax mit Temperatur: p_i = exp(z_i / T) / Σ_j exp(z_j / T) */
function softmax(logits: number[], temperature: number) {
  const scaled = logits.map((z) => z / temperature);
  const max = Math.max(...scaled); // numerische Stabilität
  const exps = scaled.map((z) => Math.exp(z - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

function sample(probs: number[]) {
  let r = Math.random();
  for (const [i, p] of probs.entries()) {
    if ((r -= p) <= 0) return i;
  }
  return probs.length - 1;
}

const TokenChip = ({ token, highlight }: { token: string; highlight?: boolean }) => (
  <motion.span
    layout
    initial={{ opacity: 0, y: -12, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    className={`whitespace-pre rounded-md px-1.5 py-0.5 font-mono text-sm ring-1 ring-inset ${
      highlight ? "bg-fuchsia-500/20 text-fuchsia-100 ring-fuchsia-400/50" : "bg-white/5 text-slate-200 ring-white/10"
    }`}
  >
    {token.replace(/^ /, "␣")}
  </motion.span>
);

function NextTokenPlayground() {
  const [temperature, setTemperature] = useState(1);
  const [generated, setGenerated] = useState<string[]>([]);
  const [picked, setPicked] = useState<number | null>(null);

  const candidates = LOGITS[generated.join("")];
  const probs = candidates ? softmax(candidates.map(([, z]) => z), temperature) : [];

  function draw() {
    if (!candidates || picked !== null) return;
    const i = sample(probs);
    setPicked(i);
    setTimeout(() => {
      setGenerated((g) => [...g, candidates[i][0]]);
      setPicked(null);
    }, 900);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="mb-2 text-sm text-slate-400">Kontext</p>
        <div className="flex min-h-14 flex-wrap items-center gap-1.5 rounded-xl bg-slate-900/80 p-3 ring-1 ring-inset ring-white/10">
          {PROMPT_TOKENS.map((t, i) => (
            <TokenChip key={`p${i}`} token={t} />
          ))}
          <AnimatePresence>
            {generated.map((t, i) => (
              <TokenChip key={`g${i}`} token={t} highlight />
            ))}
          </AnimatePresence>
          {candidates && <span className="h-5 w-0.5 animate-pulse bg-fuchsia-300" />}
        </div>

        <label className="mt-6 block">
          <span className="mb-2 flex items-center justify-between text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Thermometer className="size-4" aria-hidden /> Temperatur
            </span>
            <span className="font-mono text-fuchsia-300">{temperature.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.05}
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-fuchsia-400"
          />
          <span className="mt-1 flex justify-between text-xs text-slate-500">
            <span>vorhersehbar</span>
            <span>kreativ / chaotisch</span>
          </span>
        </label>

        <div className="mt-6 flex gap-3">
          <button
            onClick={draw}
            disabled={!candidates || picked !== null}
            className="inline-flex items-center gap-2 rounded-lg bg-fuchsia-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:bg-white/5 disabled:text-slate-500"
          >
            <Dices className="size-4" aria-hidden /> Nächstes Token ziehen
          </button>
          <button
            onClick={() => setGenerated([])}
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"
          >
            <RotateCcw className="size-4" aria-hidden /> Neu
          </button>
        </div>
        {!candidates && (
          <p className="mt-4 text-sm text-slate-400">
            Ende unserer Mini-Demo. Ein echtes Modell würde weiterschreiben, bis es ein Stopp-Token erzeugt
            oder ein Längenlimit erreicht.
          </p>
        )}
      </div>

      <div>
        <p className="mb-2 text-sm text-slate-400">Wahrscheinlichkeit für das nächste Token</p>
        <ul className="space-y-2">
          {candidates?.map(([token, logit], i) => (
            <li key={`${generated.length}-${token}`} className="grid grid-cols-[6.5rem_1fr_3.5rem] items-center gap-3">
              <span className="truncate font-mono text-sm text-slate-200">{token.replace(/^ /, "␣")}</span>
              <div className="h-6 overflow-hidden rounded-md bg-white/5">
                <motion.div
                  className={`h-full rounded-md ${picked === i ? "bg-fuchsia-300" : "bg-gradient-to-r from-fuchsia-600 to-fuchsia-400"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${probs[i] * 100}%`, opacity: picked === null || picked === i ? 1 : 0.3 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
              </div>
              <span className="text-right font-mono text-xs text-slate-400" title={`Logit ${logit}`}>
                {(probs[i] * 100).toFixed(1)} %
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          Berechnet per Softmax aus festen Beispiel-Logits: p<sub>i</sub> = e<sup>z<sub>i</sub>/T</sup> / Σ e
          <sup>z<sub>j</sub>/T</sup>. Niedrige Temperatur verstärkt Unterschiede, hohe gleicht sie an.
        </p>
      </div>
    </div>
  );
}

export default function LlmExplainer() {
  return (
    <div>
      <Step
        n={1}
        title="Text wird zu Tokens"
        intro={
          <>
            Ein Sprachmodell sieht keine Buchstaben oder ganzen Wörter, sondern <strong>Tokens</strong>: häufige
            Wörter, Wortteile oder Satzzeichen, jeweils mit einer Nummer im Vokabular. Seltene Wörter werden in
            mehrere Teile zerlegt.
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-lg">„Der Himmel ist“</span>
          <span className="text-slate-500">→</span>
          <div className="flex flex-wrap gap-1.5">
            {PROMPT_TOKENS.map((t, i) => (
              <TokenChip key={i} token={t} />
            ))}
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Illustrative Zerlegung – wie ein Text tatsächlich zerlegt wird, hängt vom Tokenizer ab. ␣ = Leerzeichen.
        </p>
      </Step>

      <Step
        n={2}
        title="Vorhersage: Was kommt als Nächstes?"
        intro={
          <>
            Das Modell berechnet für <em>jedes</em> Token im Vokabular einen Rohwert (Logit). Die Softmax-Funktion
            macht daraus Wahrscheinlichkeiten. Dann wird ein Token <strong>gezogen</strong> – nicht immer das
            wahrscheinlichste. Die <strong>Temperatur</strong> steuert, wie stark der Zufall mitspielt.
          </>
        }
      >
        <NextTokenPlayground />
      </Step>

      <Step
        n={3}
        title="Und wieder von vorn"
        intro={
          <>
            Das gezogene Token wird an den Kontext angehängt, und das Modell berechnet die nächste Verteilung.
            So entsteht Text Token für Token (<em>autoregressiv</em>). Deshalb kann ein Modell flüssig klingen und
            trotzdem Fakten erfinden: Es erzeugt plausible Fortsetzungen, keine geprüften Aussagen.
          </>
        }
      >
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {["Kontext", "Modell (Transformer)", "Wahrscheinlichkeiten", "Token ziehen", "anhängen"].map((s, i, arr) => (
            <motion.div
              key={s}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <span className="rounded-lg bg-slate-900/80 px-3 py-2 ring-1 ring-inset ring-white/10">{s}</span>
              <span className="text-fuchsia-300">{i < arr.length - 1 ? "→" : "↺"}</span>
            </motion.div>
          ))}
        </div>
      </Step>
    </div>
  );
}
