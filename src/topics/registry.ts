import {
  Atom,
  BatteryCharging,
  Blocks,
  BrainCircuit,
  Cpu,
  Dna,
  KeyRound,
  Network,
  RadioTower,
  Satellite,
  Sun,
  Waypoints,
  Zap,
} from "lucide-react";

import type { Category, CategoryId, Topic } from "./types.ts";

export const categories: Category[] = [
  { id: "ai", label: "Künstliche Intelligenz" },
  { id: "computing", label: "Computing" },
  { id: "security", label: "Kryptografie & Sicherheit" },
  { id: "networks", label: "Netze & Kommunikation" },
  { id: "energy", label: "Energie" },
  { id: "life-sciences", label: "Life Sciences" },
];

export const categoryLabel = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.label ?? id;

const planned: Pick<Topic, "status" | "simplifications" | "sources" | "review"> = {
  status: "planned",
  simplifications: [],
  sources: [],
  review: { status: "unreviewed", reviewers: [] },
};

/**
 * Zentrale Liste aller Themen. Reihenfolge = Reihenfolge auf dem Dashboard.
 * Für "live"-Themen muss es eine Komponente unter app/topics/<slug>/Explainer.tsx
 * geben – `npm run validate:topics` prüft das (und Quellen, Vereinfachungen etc.).
 */
export const topics: Topic[] = [
  {
    slug: "blockchain",
    title: "Blockchain",
    tagline: "Warum man eine Kette aus Hashes nicht unbemerkt verändern kann.",
    summary:
      "Eine Blockchain ist eine Kette von Datenblöcken, in der jeder Block den kryptografischen Hash seines Vorgängers enthält. Wer einen alten Block verändert, ändert dessen Hash – und bricht damit alle nachfolgenden Verknüpfungen. Proof-of-Work macht das Neuberechnen absichtlich teuer.",
    category: "security",
    icon: Blocks,
    accent: "#f59e0b",
    status: "live",
    simplifications: [
      "Wir hashen einen einfachen Text aus Index, Vorgänger-Hash, Daten und Nonce. Bitcoin hasht stattdessen einen 80-Byte-Block-Header (u. a. mit Merkle-Root und Zeitstempel) mit doppeltem SHA-256.",
      "Die Schwierigkeit lautet hier „Hash beginnt mit drei hexadezimalen Nullen“. In Bitcoin wird der Hash als Zahl mit einem Zielwert (Target) verglichen, der etwa alle 2016 Blöcke angepasst wird.",
      "Es gibt nur eine einzige Kopie der Kette. Die Sicherheit einer echten Blockchain entsteht erst durch viele unabhängige Knoten, die der gültigen Kette mit der meisten kumulierten Arbeit folgen.",
      "Transaktionen sind hier freier Text. Echte Transaktionen sind digital signiert, sodass nur die Besitzer:innen der Schlüssel Werte bewegen können.",
      "Proof-of-Work ist nur ein mögliches Konsensverfahren – Ethereum etwa nutzt seit 2022 Proof-of-Stake.",
    ],
    sources: [
      {
        title: "Bitcoin: A Peer-to-Peer Electronic Cash System (Nakamoto, 2008)",
        url: "https://bitcoin.org/bitcoin.pdf",
        publisher: "bitcoin.org",
        kind: "primary",
        accessed: "2026-10-29",
      },
      {
        title: "FIPS 180-4: Secure Hash Standard (SHA-256)",
        url: "https://csrc.nist.gov/pubs/fips/180-4/upd1/final",
        publisher: "NIST",
        kind: "primary",
        accessed: "2026-10-29",
      },
      {
        title: "Bitcoin Developer Guide – Block Chain",
        url: "https://developer.bitcoin.org/devguide/block_chain.html",
        publisher: "developer.bitcoin.org",
        kind: "secondary",
        accessed: "2026-10-29",
      },
    ],
    review: { status: "unreviewed", reviewers: [] },
  },
  {
    slug: "llm",
    title: "Large Language Models",
    tagline: "Wie ein Sprachmodell Wort für Wort – genauer: Token für Token – schreibt.",
    summary:
      "Große Sprachmodelle zerlegen Text in Tokens und berechnen für jedes mögliche nächste Token eine Wahrscheinlichkeit. Aus dieser Verteilung wird ein Token ausgewählt, angehängt – und der Vorgang beginnt von vorn. Die Grundlage der meisten heutigen Modelle ist die Transformer-Architektur.",
    category: "ai",
    icon: BrainCircuit,
    accent: "#a855f7",
    status: "live",
    simplifications: [
      "Die Wahrscheinlichkeiten in der Demo sind von Hand gewählt und nicht von einem echten Modell berechnet.",
      "Echte Vokabulare umfassen typischerweise zehntausende bis über hunderttausend Tokens – wir zeigen nur eine Handvoll Kandidaten.",
      "Die gezeigte Zerlegung in Tokens ist illustrativ. Wie ein Text tatsächlich zerlegt wird, hängt vom jeweiligen Tokenizer (z. B. Byte-Pair-Encoding) ab.",
      "Neben der Temperatur nutzen echte Systeme oft weitere Sampling-Verfahren wie Top-k oder Top-p (Nucleus Sampling).",
      "Wie das Modell die Wahrscheinlichkeiten berechnet (Embeddings, Attention, viele Transformer-Schichten), zeigt diese Version noch nicht.",
    ],
    sources: [
      {
        title: "Attention Is All You Need (Vaswani et al., 2017)",
        url: "https://arxiv.org/abs/1706.03762",
        publisher: "arXiv",
        kind: "primary",
        accessed: "2026-10-29",
      },
      {
        title: "Neural Machine Translation of Rare Words with Subword Units (Sennrich et al., 2016)",
        url: "https://arxiv.org/abs/1508.07909",
        publisher: "arXiv",
        kind: "primary",
        accessed: "2026-10-29",
      },
      {
        title: "The Curious Case of Neural Text Degeneration (Holtzman et al., 2020)",
        url: "https://arxiv.org/abs/1904.09751",
        publisher: "arXiv",
        kind: "primary",
        accessed: "2026-10-29",
      },
    ],
    review: { status: "unreviewed", reviewers: [] },
  },
  {
    slug: "quantum-computing",
    title: "Quantencomputing",
    tagline: "Qubits, Superposition, Verschränkung – und warum das kein „schnellerer PC“ ist.",
    summary:
      "Quantencomputer rechnen mit Qubits, deren Zustände sich überlagern und miteinander verschränken lassen. Für bestimmte Probleme ermöglicht das Algorithmen, die klassischen Verfahren deutlich überlegen sind – für viele Alltagsaufgaben aber nicht.",
    category: "computing",
    icon: Atom,
    accent: "#22d3ee",
    ...planned,
  },
  {
    slug: "6g",
    title: "6G",
    tagline: "Die Mobilfunkgeneration nach 5G: Was IMT-2030 verspricht – und was noch Forschung ist.",
    summary:
      "6G bezeichnet die nächste Mobilfunkgeneration, deren Anforderungen die ITU unter dem Namen IMT-2030 definiert. Diskutiert werden u. a. höhere Frequenzbereiche, integrierte Sensorik und KI-gestützte Netze.",
    category: "networks",
    icon: RadioTower,
    accent: "#38bdf8",
    ...planned,
  },
  {
    slug: "public-key-crypto",
    title: "Public-Key-Kryptografie",
    tagline: "Wie zwei Fremde über ein offenes Netz ein gemeinsames Geheimnis vereinbaren.",
    summary:
      "Asymmetrische Verfahren nutzen ein Schlüsselpaar: einen öffentlichen und einen privaten Schlüssel. Darauf beruhen verschlüsselte Verbindungen (TLS), digitale Signaturen und Blockchains.",
    category: "security",
    icon: KeyRound,
    accent: "#34d399",
    ...planned,
  },
  {
    slug: "neural-networks",
    title: "Neuronale Netze",
    tagline: "Gewichte, Aktivierungen und Gradientenabstieg – wie Maschinen aus Beispielen lernen.",
    summary:
      "Künstliche neuronale Netze bestehen aus Schichten einfacher Recheneinheiten. Beim Training werden ihre Gewichte schrittweise so angepasst, dass ein Fehlermaß kleiner wird.",
    category: "ai",
    icon: Waypoints,
    accent: "#f472b6",
    ...planned,
  },
  {
    slug: "internet",
    title: "Das Internet",
    tagline: "Pakete, Router und Protokolle: Der Weg einer Nachricht durchs Netz.",
    summary:
      "Daten werden im Internet in Pakete zerlegt, die unabhängig voneinander über Router weitergeleitet werden. Protokolle wie IP und TCP regeln Adressierung, Reihenfolge und Zuverlässigkeit.",
    category: "networks",
    icon: Network,
    accent: "#60a5fa",
    ...planned,
  },
  {
    slug: "gps",
    title: "GPS",
    tagline: "Warum Satellitennavigation extrem genaue Uhren – und Relativitätstheorie – braucht.",
    summary:
      "Ein Empfänger bestimmt seine Position aus den Laufzeiten der Signale mehrerer Satelliten. Schon kleinste Uhrenfehler führen zu großen Positionsfehlern, weshalb sogar relativistische Effekte korrigiert werden.",
    category: "networks",
    icon: Satellite,
    accent: "#818cf8",
    ...planned,
  },
  {
    slug: "transistors",
    title: "Transistoren & Chips",
    tagline: "Vom Schalter zum Prozessor: Wie Milliarden winziger Transistoren rechnen.",
    summary:
      "Transistoren sind elektrisch gesteuerte Schalter. Zu Logikgattern kombiniert bilden sie die Grundlage jedes Prozessors.",
    category: "computing",
    icon: Cpu,
    accent: "#94a3b8",
    ...planned,
  },
  {
    slug: "crispr",
    title: "CRISPR/Cas9",
    tagline: "Die Genschere: Wie Cas9 DNA an einer gezielten Stelle schneidet.",
    summary:
      "CRISPR/Cas9 stammt ursprünglich aus dem Immunsystem von Bakterien. Eine Leit-RNA führt das Enzym Cas9 an eine passende DNA-Sequenz, wo es einen Doppelstrangbruch erzeugt.",
    category: "life-sciences",
    icon: Dna,
    accent: "#fb7185",
    ...planned,
  },
  {
    slug: "lithium-ion",
    title: "Lithium-Ionen-Akku",
    tagline: "Was beim Laden und Entladen im Inneren eines Akkus passiert.",
    summary:
      "Beim Laden und Entladen wandern Lithium-Ionen durch den Elektrolyten zwischen den Elektroden, während Elektronen über den äußeren Stromkreis fließen.",
    category: "energy",
    icon: BatteryCharging,
    accent: "#4ade80",
    ...planned,
  },
  {
    slug: "photovoltaics",
    title: "Photovoltaik",
    tagline: "Wie aus Sonnenlicht in einer Solarzelle elektrischer Strom wird.",
    summary:
      "In einer Solarzelle erzeugt absorbiertes Licht Elektron-Loch-Paare. Das elektrische Feld eines pn-Übergangs trennt sie, sodass ein Strom fließen kann.",
    category: "energy",
    icon: Sun,
    accent: "#facc15",
    ...planned,
  },
  {
    slug: "nuclear-fusion",
    title: "Kernfusion",
    tagline: "Sonnenenergie auf der Erde: Plasma, Magnetfelder und das Lawson-Kriterium.",
    summary:
      "Bei der Kernfusion verschmelzen leichte Atomkerne und setzen dabei Energie frei. Die Herausforderung ist, ein extrem heißes Plasma lange und dicht genug einzuschließen.",
    category: "energy",
    icon: Zap,
    accent: "#fb923c",
    ...planned,
  },
];

export const getTopic = (slug: string | undefined) =>
  topics.find((t) => t.slug === slug);
