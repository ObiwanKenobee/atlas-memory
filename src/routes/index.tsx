import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/sanctum-hero.jpg";
import { PageHeader, StatCard, SectionCard } from "@/components/sanctum/Primitives";
import { Languages, Mic, Mountain, Sprout, Hammer, Coins, ShieldCheck, ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

export const Route = createFileRoute("/")({ component: Overview });

const continuity = [
  { year: "1960", score: 92 },
  { year: "1980", score: 81 },
  { year: "2000", score: 67 },
  { year: "2010", score: 58 },
  { year: "2020", score: 49 },
  { year: "2025", score: 53 },
  { year: "2030", score: 61 },
];

const radar = [
  { axis: "Language", v: 62 },
  { axis: "Oral Memory", v: 71 },
  { axis: "Sacred Land", v: 48 },
  { axis: "Crafts", v: 55 },
  { axis: "Ritual", v: 67 },
  { axis: "Economy", v: 41 },
];

const modules = [
  { to: "/preservation", icon: Languages, title: "Preservation Metrics", body: "Endangered languages, traditions & site health." },
  { to: "/oral-history", icon: Mic, title: "Oral History Intelligence", body: "Audio, video & manuscript archives with AI indexing." },
  { to: "/sacred-ecosystems", icon: Mountain, title: "Sacred Ecosystem Map", body: "Forests, rivers, ceremonial routes & burial grounds." },
  { to: "/indigenous-knowledge", icon: Sprout, title: "Indigenous Knowledge Engine", body: "Drought, medicine, regenerative farming wisdom." },
  { to: "/restoration", icon: Hammer, title: "Heritage Restoration", body: "Active restoration initiatives & funding." },
  { to: "/economy", icon: Coins, title: "Cultural Economy", body: "Artisans, grants, regenerative tourism." },
  { to: "/sovereignty", icon: ShieldCheck, title: "Sovereignty & Ethics", body: "Consent, tribal ownership, sacred restrictions." },
] as const;

function Overview() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/50">
        <img src={heroImg} alt="Sacred landscape with constellation of cultural sites" width={1600} height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.16 0.018 60 / 0.4) 0%, oklch(0.16 0.018 60 / 0.95) 100%)" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <Badge variant="outline" className="mb-5 border-primary/40 bg-background/40 text-primary backdrop-blur">
            Civilizational Memory Layer · Atlas Sanctum
          </Badge>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] text-foreground md:text-7xl">
            Culture as living <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">regenerative infrastructure</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Most platforms track GDP, carbon and logistics. We track identity, memory, ancestral knowledge,
            sacred ecology and cultural continuity — as operational signals for future civilization.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="shadow-[var(--shadow-glow)]">
              <Link to="/preservation">Open command center <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border/60 bg-background/30 backdrop-blur">
              <Link to="/sovereignty">Knowledge sovereignty</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* STATS */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Languages tracked" value="1,247" delta="↑ 38 added · 12 endangered" icon={Languages} tone="ember" />
          <StatCard label="Oral histories" value="58,902" delta="↑ 1.2k transcribed this month" icon={Mic} tone="default" />
          <StatCard label="Sacred sites monitored" value="3,418" delta="9 under active threat" icon={Mountain} tone="warn" />
          <StatCard label="Continuity index" value="0.61" delta="↑ +0.04 vs 2024" icon={Activity} tone="forest" />
        </div>

        {/* CHARTS */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <SectionCard title="Cultural Continuity Score" description="Composite of language, ritual, craft, ecology" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={continuity}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.15 75)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.78 0.15 75)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.3 0.02 60)" strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="oklch(0.7 0.03 75)" />
                <YAxis stroke="oklch(0.7 0.03 75)" />
                <Tooltip contentStyle={{ background: "oklch(0.21 0.022 55)", border: "1px solid oklch(0.32 0.025 55)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="score" stroke="oklch(0.78 0.15 75)" fill="url(#g1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </SectionCard>
          <SectionCard title="Heritage Vitality" description="Across six dimensions">
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radar}>
                <PolarGrid stroke="oklch(0.32 0.025 60)" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: "oklch(0.8 0.03 75)", fontSize: 11 }} />
                <Radar dataKey="v" stroke="oklch(0.55 0.18 35)" fill="oklch(0.55 0.18 35)" fillOpacity={0.45} />
              </RadarChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>

        {/* MODULE GRID */}
        <PageHeader eyebrow="Modules" title="Seven operational layers" description="Each module is a living instrument of preservation, intelligence and stewardship." />
        <div className="-mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <Link key={m.to} to={m.to} className="group">
              <div className="h-full rounded-xl border border-border/60 bg-card/60 p-5 transition-all hover:border-primary/50 hover:shadow-[var(--shadow-glow)]">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "var(--gradient-ember)" }}>
                  <m.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl text-foreground">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
                <div className="mt-4 flex items-center gap-1 text-xs uppercase tracking-widest text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Enter <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* KENYA PILOT */}
        <SectionCard title="Kenya Pilot · Regional Signal" description="Live preservation status across partner communities" className="mt-10">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Maasai", lang: 0.78, eco: 0.62 },
              { name: "Turkana", lang: 0.54, eco: 0.71 },
              { name: "Kikuyu", lang: 0.81, eco: 0.49 },
              { name: "Samburu", lang: 0.66, eco: 0.74 },
              { name: "Luo", lang: 0.73, eco: 0.55 },
              { name: "Swahili Coast", lang: 0.69, eco: 0.58 },
            ].map((c) => (
              <div key={c.name} className="rounded-lg border border-border/60 bg-background/40 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-display text-lg">{c.name}</span>
                  <Badge variant="outline" className="border-accent/40 text-accent">active</Badge>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="mb-1 flex justify-between text-muted-foreground"><span>Language vitality</span><span>{Math.round(c.lang * 100)}%</span></div>
                    <Progress value={c.lang * 100} />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-muted-foreground"><span>Sacred ecology</span><span>{Math.round(c.eco * 100)}%</span></div>
                    <Progress value={c.eco * 100} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
