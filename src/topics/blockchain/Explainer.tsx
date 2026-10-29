"use client";

import { Check, Hash, Pickaxe, RotateCcw, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Step } from "@/components/explainer/Step";

/** Gültig ist ein Block, wenn sein Hash mit so vielen hexadezimalen Nullen beginnt. */
const DIFFICULTY = 3;
const TARGET_PREFIX = "0".repeat(DIFFICULTY);
const GENESIS_PREV = "0".repeat(64);

// Vorab gemined, damit die Kette beim Laden gültig ist. Bei Änderungen an
// Daten oder blockInput() die Nonces neu berechnen (gleiches Verfahren wie mine()).
const INITIAL_BLOCKS = [
  { data: "Genesis-Block", nonce: 2130 },
  { data: "Alice zahlt Bob 5 Coins", nonce: 4614 },
  { data: "Bob zahlt Carol 2 Coins", nonce: 1930 },
  { data: "Carol zahlt Dave 1 Coin", nonce: 675 },
];

type Block = (typeof INITIAL_BLOCKS)[number];

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

const blockInput = (index: number, prev: string, block: Block) =>
  `${index}|${prev}|${block.data}|${block.nonce}`;

/** Hash mit hervorgehobenem Präfix, damit man die „Nullen“ sofort sieht. */
function HashText({ value, valid }: { value: string; valid?: boolean }) {
  if (!value) return <span className="text-slate-600">berechne…</span>;
  return (
    <span className="break-all font-mono text-[11px] leading-relaxed">
      <span className={valid === undefined ? "text-slate-200" : valid ? "text-emerald-300" : "text-rose-300"}>
        {value.slice(0, DIFFICULTY)}
      </span>
      <span className="text-slate-400">{value.slice(DIFFICULTY)}</span>
    </span>
  );
}

function HashPlayground() {
  const [text, setText] = useState("Hallo Welt");
  const [hash, setHash] = useState("");

  useEffect(() => {
    let cancelled = false;
    sha256(text).then((h) => !cancelled && setHash(h));
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <label className="block">
        <span className="mb-2 block text-sm text-slate-400">Eingabe</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full rounded-xl bg-slate-900/80 p-3 font-mono text-sm ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-amber-400/60"
        />
      </label>
      <div>
        <span className="mb-2 flex items-center gap-1.5 text-sm text-slate-400">
          <Hash className="size-4" aria-hidden /> SHA-256-Hash
        </span>
        <div className="flex min-h-21 flex-wrap rounded-xl bg-slate-900/80 p-3 font-mono text-sm ring-1 ring-inset ring-white/10">
          {hash.split("").map((c, i) => (
            <motion.span
              key={`${i}-${c}`}
              initial={{ opacity: 0.2, color: "#fbbf24" }}
              animate={{ opacity: 1, color: "#e2e8f0" }}
              transition={{ duration: 0.6 }}
            >
              {c}
            </motion.span>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Ändere nur ein Zeichen – der Hash ändert sich vollständig. Er hat immer 256 Bit (64 Hex-Zeichen).
        </p>
      </div>
    </div>
  );
}

function ChainPlayground() {
  const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
  const [hashes, setHashes] = useState<string[]>([]);
  const [mining, setMining] = useState<{ index: number; nonce: number } | null>(null);
  const [totalAttempts, setTotalAttempts] = useState(0);

  // Hashes der Reihe nach berechnen: Jeder Block enthält den Hash seines Vorgängers.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result: string[] = [];
      for (const [i, block] of blocks.entries()) {
        result.push(await sha256(blockInput(i, result[i - 1] ?? GENESIS_PREV, block)));
      }
      if (!cancelled) setHashes(result);
    })();
    return () => {
      cancelled = true;
    };
  }, [blocks]);

  const prevOf = (i: number) => (i === 0 ? GENESIS_PREV : hashes[i - 1] ?? "");

  const update = (i: number, patch: Partial<Block>) =>
    setBlocks((bs) => bs.map((b, j) => (j === i ? { ...b, ...patch } : b)));

  async function mine(i: number) {
    const prev = prevOf(i);
    const block = blocks[i];
    for (let nonce = 0; ; nonce++) {
      const h = await sha256(blockInput(i, prev, { ...block, nonce }));
      if (h.startsWith(TARGET_PREFIX)) {
        setTotalAttempts((t) => t + nonce + 1);
        setMining(null);
        update(i, { nonce });
        return;
      }
      // Alle paar hundert Versuche die Anzeige aktualisieren
      if (nonce % 250 === 0) {
        setMining({ index: i, nonce });
        await new Promise((r) => setTimeout(r));
      }
    }
  }

  const reset = () => {
    setBlocks(INITIAL_BLOCKS);
    setTotalAttempts(0);
  };

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {blocks.map((block, i) => {
          const hash = hashes[i] ?? "";
          const valid = hash.startsWith(TARGET_PREFIX);
          const isMining = mining?.index === i;
          return (
            <motion.div
              key={i}
              animate={{
                borderColor: !hash ? "rgba(255,255,255,0.1)" : valid ? "rgba(52,211,153,0.5)" : "rgba(251,113,133,0.6)",
                backgroundColor: !hash || valid ? "rgba(16,185,129,0.04)" : "rgba(244,63,94,0.08)",
              }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-3 rounded-xl border-2 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">Block #{i}</span>
                {hash && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs ${valid ? "text-emerald-300" : "text-rose-300"}`}
                  >
                    {valid ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                    {valid ? "gültig" : "ungültig"}
                  </span>
                )}
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-500">Vorgänger-Hash</p>
                <HashText value={prevOf(i)} />
              </div>

              <label className="block">
                <span className="text-[11px] uppercase tracking-wider text-slate-500">Daten</span>
                <input
                  value={block.data}
                  disabled={!!mining}
                  onChange={(e) => update(i, { data: e.target.value })}
                  className="mt-1 w-full rounded-lg bg-slate-900/80 px-2.5 py-1.5 text-sm ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-amber-400/60"
                />
              </label>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-500">Nonce</p>
                <p className="font-mono text-sm">{isMining ? mining.nonce : block.nonce}</p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-500">Hash</p>
                <HashText value={hash} valid={valid} />
              </div>

              <button
                onClick={() => mine(i)}
                disabled={!!mining || valid || !hash}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-white/5 disabled:text-slate-500"
              >
                <Pickaxe className={`size-4 ${isMining ? "animate-bounce" : ""}`} aria-hidden />
                {isMining ? "Mining…" : "Minen"}
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
        <p>
          Von dir berechnete Hashes beim Minen:{" "}
          <span className="font-mono text-amber-300">{totalAttempts.toLocaleString("de-DE")}</span>
        </p>
        <button onClick={reset} disabled={!!mining} className="inline-flex items-center gap-1.5 hover:text-white">
          <RotateCcw className="size-4" aria-hidden /> Zurücksetzen
        </button>
      </div>
    </div>
  );
}

export default function BlockchainExplainer() {
  return (
    <div>
      <Step
        n={1}
        title="Der digitale Fingerabdruck"
        intro={
          <>
            Eine <strong>Hashfunktion</strong> wie SHA-256 macht aus beliebigen Daten eine Zeichenkette fester
            Länge. Gleiche Eingabe ergibt immer den gleichen Hash – aber schon die kleinste Änderung ergibt
            einen völlig anderen. Aus dem Hash lässt sich die Eingabe praktisch nicht zurückrechnen.
          </>
        }
      >
        <HashPlayground />
      </Step>

      <Step
        n={2}
        title="Blöcke, die aneinander hängen"
        intro={
          <>
            Jeder Block speichert den Hash seines Vorgängers. Zusätzlich gilt eine Regel: Ein Block ist nur
            gültig, wenn sein Hash mit <code className="text-amber-300">{TARGET_PREFIX}</code> beginnt. Um das zu
            erreichen, wird die <strong>Nonce</strong> so lange verändert, bis es passt – das nennt man{" "}
            <strong>Mining</strong> (Proof-of-Work).{" "}
            <span className="text-slate-300">
              Probier’s aus: Ändere die Daten in Block #1 und beobachte, was mit den folgenden Blöcken passiert.
            </span>
          </>
        }
      >
        <ChainPlayground />
      </Step>

      <Step
        n={3}
        title="Warum das Manipulation teuer macht"
        intro={
          <>
            Wer einen alten Block ändert, muss ihn neu minen – und damit auch <em>jeden</em> Block danach,
            denn deren Vorgänger-Hash stimmt nicht mehr. In einem echten Netzwerk müsste ein Angreifer dabei
            schneller rechnen als alle ehrlichen Teilnehmer:innen zusammen, die die Kette gleichzeitig
            verlängern. In unserer Demo genügen im Schnitt etwa 4.096 Versuche pro Block (16³); im
            Bitcoin-Netz werden für einen Block derzeit unvorstellbar viel mehr Hashes berechnet.
          </>
        }
      >
        <div className="grid gap-4 text-sm sm:grid-cols-3">
          {[
            ["Unveränderbar?", "Nicht wirklich – aber jede Änderung ist sofort sichtbar und teuer zu verschleiern."],
            ["Dezentral", "Viele Kopien der Kette bei vielen Teilnehmer:innen; Konsens entscheidet, welche gilt."],
            ["Kein Allheilmittel", "Für viele Anwendungen ist eine klassische Datenbank einfacher und effizienter."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-inset ring-white/5">
              <p className="font-medium text-slate-100">{t}</p>
              <p className="mt-1 text-slate-400">{d}</p>
            </div>
          ))}
        </div>
      </Step>
    </div>
  );
}
