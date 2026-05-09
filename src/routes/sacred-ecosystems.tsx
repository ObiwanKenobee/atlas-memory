import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/sanctum/Primitives";
import { Mountain, Trees, Droplets, Flame, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/sacred-ecosystems")({
  head: () => ({ meta: [{ title: "Sacred Ecosystem Mapping — Atlas Sanctum" }, { name: "description", content: "Mapping sacred forests, ancestral rivers, ceremonial routes and burial grounds as living infrastructure." }] }),
  component: Page,
});

const sites = [
  { name: "Mau Forest sacred groves", type: "Forest", steward: "Ogiek", threat: "Logging", level: "high" },
  { name: "Lake Turkana ancestral shores", type: "River/Lake", steward: "Turkana", threat: "Hydro project", level: "medium" },
  { name: "Mijikenda Kaya forests", type: "Forest", steward: "Mijikenda", threat: "Encroachment", level: "high" },
  { name: "Mt. Kenya summit shrines", type: "Mountain", steward: "Kikuyu / Meru", threat: "Tourism load", level: "low" },
  { name: "Samburu ceremonial corridor", type: "Route", steward: "Samburu", threat: "Road bisection", level: "medium" },
];

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader eyebrow="Module 03" title="Sacred Ecosystem Mapping" description="Where culture protected ecology for centuries. We map and defend that bond." />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Sacred forests" value="612" icon={Trees} tone="forest" />
        <StatCard label="Ancestral water systems" value="244" icon={Droplets} />
        <StatCard label="Ceremonial routes" value="187" icon={Mountain} />
        <StatCard label="Active threats" value="29" delta="9 critical" icon={ShieldAlert} tone="warn" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <SectionCard title="Living Sacred Atlas" description="Cultural-ecological overlay" className="lg:col-span-2">
          <div className="relative h-[420px] overflow-hidden rounded-xl border border-border/50" style={{ background: "radial-gradient(ellipse at 30% 40%, oklch(0.3 0.06 155 / 0.4), oklch(0.16 0.018 60))" }}>
            <svg viewBox="0 0 600 400" className="h-full w-full">
              <defs>
                <radialGradient id="sacred" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.55 0.12 155)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="oklch(0.55 0.12 155)" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="threat" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.6 0.22 28)" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="oklch(0.6 0.22 28)" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* river */}
              <path d="M0,260 C120,220 200,300 320,250 S520,200 600,240" stroke="oklch(0.7 0.13 200 / 0.6)" fill="none" strokeWidth="2" />
              <path d="M150,400 C180,300 240,250 300,180 S400,80 420,0" stroke="oklch(0.7 0.13 200 / 0.4)" fill="none" strokeWidth="1.5" />
              {/* sacred zones */}
              {[[120, 140, 80], [340, 220, 110], [500, 130, 60], [220, 320, 70]].map(([x, y, r], i) => (
                <circle key={i} cx={x} cy={y} r={r} fill="url(#sacred)" />
              ))}
              {/* threats */}
              {[[170, 160], [380, 230], [490, 140]].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r={45} fill="url(#threat)" />
                  <circle cx={x} cy={y} r={4} fill="oklch(0.78 0.15 75)" />
                </g>
              ))}
              {/* nodes */}
              {[[120, 140], [340, 220], [500, 130], [220, 320], [60, 80], [560, 320]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={5} fill="oklch(0.78 0.15 75)" stroke="oklch(0.95 0.02 80)" strokeWidth="1" />
              ))}
            </svg>
            <div className="absolute bottom-3 left-3 flex gap-2 text-[10px] uppercase tracking-widest">
              <span className="flex items-center gap-1 rounded bg-background/60 px-2 py-1 backdrop-blur"><span className="h-2 w-2 rounded-full bg-accent" /> Sacred zone</span>
              <span className="flex items-center gap-1 rounded bg-background/60 px-2 py-1 backdrop-blur"><span className="h-2 w-2 rounded-full bg-destructive" /> Threat</span>
              <span className="flex items-center gap-1 rounded bg-background/60 px-2 py-1 backdrop-blur"><span className="h-2 w-2 rounded-full bg-primary" /> Node</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Active Threat Register">
          <div className="space-y-3">
            {sites.map((s) => (
              <div key={s.name} className="rounded-lg border border-border/50 bg-background/40 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-display">{s.name}</div>
                  <Badge variant={s.level === "high" ? "destructive" : "outline"} className="capitalize">{s.level}</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.type} · steward: {s.steward}</div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-secondary"><Flame className="h-3 w-3" /> {s.threat}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
