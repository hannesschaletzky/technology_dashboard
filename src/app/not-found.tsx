import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-32 text-center">
      <p className="font-mono text-sm text-indigo-300">404</p>
      <h1 className="mt-2 text-3xl font-bold">Diese Seite gibt es (noch) nicht</h1>
      <Link href="/" className="mt-6 inline-block text-slate-400 underline hover:text-white">
        Zurück zum Dashboard
      </Link>
    </div>
  );
}
