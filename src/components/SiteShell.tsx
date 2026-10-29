import { Sparkles } from "lucide-react";
import Link from "next/link";

import { site } from "@/config";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <div aria-hidden className="bg-grid pointer-events-none fixed inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl"
      />

      <header className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/60 backdrop-blur-xl">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <Sparkles className="size-5 text-indigo-400" aria-hidden />
            {site.name}
          </Link>
          <div className="flex items-center gap-5 text-sm text-slate-400">
            <Link href="/methodik" className="hover:text-white">
              Methodik
            </Link>
            <a href={site.repoUrl} className="hover:text-white" aria-label="GitHub-Repository">
              <GithubIcon className="size-5" />
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">{children}</main>

      <footer className="border-t border-white/5 py-8 text-center text-sm text-slate-500">
        Open Source ·{" "}
        <a href={site.repoUrl} className="underline decoration-dotted hover:text-slate-300">
          Mitmachen auf GitHub
        </a>{" "}
        · Fehler gefunden? Bitte melden!
      </footer>
    </div>
  );
}
