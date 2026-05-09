import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/sanctum/Primitives";
import { Brain, Mic, Mountain, Languages, Coins, ShieldCheck, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/agents")({
  head: () => ({ meta: [{ title: "AI Agents — Atlas Sanctum" }, { name: "description", content: "Cultural Memory, Oral Knowledge, Sacred Land, Language Revival, Heritage Funding and Ethical Guardian agents." }] }),
  component: Page,
});

type Agent = { name: string; icon: LucideIcon; role: string; status: "active" | "paused" | "training"; activity: string; signal: number };

const agents: Agent[] = [
  { name: "Cultural Memory Agent", icon: Brain, role: "Analyzes preservation risks and cultural degradation across communities.", status: "active", activity: "Scanning 184 languages · last sync 4m ago", signal: 92 },
  { name: "Oral Knowledge Agent", icon: Mic, role: "Indexes oral traditions, transcribes elders, builds the narrative graph.", status: "active", activity: "Transcribing Turkana drought testimonies", signal: 87 },
  { name: "Sacred Land Agent", icon: Mountain, role: "Detects threats to culturally protected ecosystems via satellite + community reports.", status: "active", activity: "9 active alerts in Mau & Kaya forests", signal: 78 },
  { name: "Language Revival Agent", icon: Languages, role: "Helps revitalize endangered languages with curricula and intergenerational pairing.", status: "training", activity: "Building Yaaku phonology corpus", signal: 64 },
  { name: "Heritage Funding Agent", icon: Coins, role: "Allocates grants using regeneration impact scoring & community demand signals.", status: "active", activity: "Routing $2.1M to coastal restoration", signal: 81 },
  { name: "Ethical Guardian Agent", icon: ShieldCheck, role: "Ensures every AI action respects sovereignty, consent, and sacred knowledge boundaries.", status: "active", activity: "Audited 12,408 access events today · 0 violations", signal: 99 },
];

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader eyebrow="Intelligence" title="Atlas Sanctum AI Agents" description="Six specialized agents operating inside the command center — bound by community consent and ecological ethics." />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((a) => (
          <div key={a.name} className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/60 p-5 transition-all hover:border-primary/50 hover:shadow-[var(--shadow-glow)]">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-15 blur-3xl transition-opacity group-hover:opacity-30" style={{ background: "var(--gradient-ember)" }} />
            <div className="flex items-start justify-between">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: "var(--gradient-ember)" }}>
                <a.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <Badge variant={a.status === "active" ? "outline" : "secondary"} className="capitalize">
                <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${a.status === "active" ? "bg-accent" : "bg-secondary"}`} />
                {a.status}
              </Badge>
            </div>
            <h3 className="mt-4 font-display text-xl">{a.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{a.role}</p>
            <div className="mt-4 border-t border-border/50 pt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><Activity className="h-3 w-3 text-primary" /> {a.activity}</div>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full" style={{ width: `${a.signal}%`, background: "var(--gradient-ember)" }} />
                </div>
                <span className="font-mono text-[10px]">{a.signal}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="Agent activity stream" description="Real-time decisions, with full audit trail" className="mt-10">
        <div className="space-y-3 font-mono text-xs">
          {[
            { t: "14:02", a: "Ethical Guardian", msg: "Blocked AI training request on 18 Maasai ritual recordings — consent: denied." },
            { t: "13:47", a: "Sacred Land", msg: "Flagged satellite anomaly: 4.2 ha clearing near Mijikenda Kaya Kinondo." },
            { t: "13:30", a: "Heritage Funding", msg: "Recommended $180k disbursement to Lamu silver filigree cooperative." },
            { t: "12:58", a: "Oral Knowledge", msg: "Indexed 47 new testimonies; linked 312 entities into graph." },
            { t: "12:14", a: "Language Revival", msg: "Generated 1,248 Yaaku flashcards · paired 12 youth with 4 elders." },
          ].map((e) => (
            <div key={e.t + e.a} className="flex gap-4 rounded border border-border/40 bg-background/40 p-3">
              <span className="text-muted-foreground">{e.t}</span>
              <span className="text-primary">{e.a}</span>
              <span className="flex-1 text-foreground">{e.msg}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
