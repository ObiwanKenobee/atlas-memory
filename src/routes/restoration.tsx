import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/sanctum/Primitives";
import { CommunityScopeBadge } from "@/components/CommunityContext";
import { Hammer, Wallet, Users, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/restoration")({
  head: () => ({ meta: [{ title: "Heritage Restoration Tracker — Atlas Sanctum" }, { name: "description", content: "Active restoration of temples, districts, indigenous architecture and artifacts." }] }),
  component: Page,
});

const projects = [
  { name: "Lamu Old Town stone houses", progress: 62, funded: 1.4, target: 2.2, milestone: "Phase 3 / 5", volunteers: 87 },
  { name: "Gede ruins consolidation", progress: 41, funded: 0.7, target: 1.8, milestone: "Stabilization", volunteers: 32 },
  { name: "Maasai manyatta archive", progress: 88, funded: 0.9, target: 1.0, milestone: "Documentation", volunteers: 54 },
  { name: "Fort Jesus mural recovery", progress: 27, funded: 0.4, target: 1.5, milestone: "Pigment study", volunteers: 19 },
  { name: "Thimlich Ohinga drystone", progress: 74, funded: 1.1, target: 1.4, milestone: "Wall reset", volunteers: 41 },
];

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader eyebrow="Module 05" title="Heritage Restoration Tracker" description="Funding, milestones, volunteer coordination — and the ecosystems each restoration is tied to." />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Active projects" value="146" icon={Hammer} tone="ember" />
        <StatCard label="Funds deployed" value="$24.6M" delta="of $48M committed" icon={Wallet} />
        <StatCard label="Volunteers" value="3,408" icon={Users} tone="forest" />
        <StatCard label="Completed (2025)" value="29" icon={CheckCircle2} />
      </div>

      <SectionCard title="Live Restoration Projects" className="mt-8">
        <div className="space-y-5">
          {projects.map((p) => (
            <div key={p.name} className="rounded-xl border border-border/50 bg-background/40 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-display text-xl">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.milestone} · {p.volunteers} volunteers</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-accent/40 text-accent">on track</Badge>
                  <span className="font-display text-lg">{p.progress}%</span>
                </div>
              </div>
              <Progress value={p.progress} />
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Funded: <span className="text-foreground">${p.funded.toFixed(1)}M</span> / ${p.target.toFixed(1)}M</span>
                <span>Ecology link: <span className="text-accent">Coastal mangrove corridor</span></span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Before / After visualization" description="AI-rendered restoration previews" className="mt-6">
        <div className="grid gap-4 md:grid-cols-2">
          {[["Before", "linear-gradient(135deg, oklch(0.25 0.02 55), oklch(0.18 0.015 50))"], ["After", "var(--gradient-ember)"]].map(([label, bg]) => (
            <div key={label} className="relative h-56 overflow-hidden rounded-xl border border-border/50" style={{ background: bg as string }}>
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <div className="absolute bottom-3 left-3 rounded bg-background/60 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur">{label}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
