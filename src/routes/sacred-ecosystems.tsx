import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/sanctum/Primitives";
import { CommunityScopeBadge, useCommunity } from "@/components/CommunityContext";
import { Mountain, Trees, Droplets, Flame, ShieldAlert, Footprints, Skull, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sacred-ecosystems")({
  head: () => ({ meta: [{ title: "Sacred Ecosystem Mapping — Atlas Sanctum" }, { name: "description", content: "Filterable map of sacred forests, ancestral rivers, ceremonial routes, burial grounds and biodiversity zones." }] }),
  component: Page,
});

const CATEGORIES = [
  { id: "forest", label: "Sacred forests", icon: Trees, color: "oklch(0.55 0.12 155)" },
  { id: "river", label: "Ancestral rivers", icon: Droplets, color: "oklch(0.7 0.13 200)" },
  { id: "route", label: "Ceremonial routes", icon: Footprints, color: "oklch(0.78 0.15 75)" },
  { id: "burial", label: "Burial grounds", icon: Skull, color: "oklch(0.55 0.18 35)" },
  { id: "biodiversity", label: "Spiritual biodiversity", icon: Sparkles, color: "oklch(0.65 0.18 320)" },
] as const;
type CatId = (typeof CATEGORIES)[number]["id"];

type Site = { id: string; name: string; cat: CatId; community: string; threat: string; level: "high" | "medium" | "low"; x: number; y: number };

const SITES: Site[] = [
  { id: "1", name: "Mau Forest sacred groves", cat: "forest", community: "Kalenjin", threat: "Logging", level: "high", x: 180, y: 220 },
  { id: "2", name: "Lake Turkana ancestral shores", cat: "river", community: "Turkana", threat: "Hydro project", level: "medium", x: 140, y: 90 },
  { id: "3", name: "Mijikenda Kaya forests", cat: "forest", community: "Swahili Coast", threat: "Encroachment", level: "high", x: 500, y: 320 },
  { id: "4", name: "Mt. Kenya summit shrines", cat: "biodiversity", community: "Kikuyu", threat: "Tourism load", level: "low", x: 320, y: 200 },
  { id: "5", name: "Samburu ceremonial corridor", cat: "route", community: "Samburu", threat: "Road bisection", level: "medium", x: 280, y: 130 },
  { id: "6", name: "Maasai eunoto ground", cat: "burial", community: "Maasai", threat: "Land sale", level: "high", x: 230, y: 280 },
  { id: "7", name: "Tana River delta groves", cat: "river", community: "Swahili Coast", threat: "Irrigation", level: "medium", x: 470, y: 270 },
  { id: "8", name: "Kit Mikayi shrine path", cat: "route", community: "Luo", threat: "Quarry", level: "medium", x: 100, y: 240 },
  { id: "9", name: "Got Ramogi sacred hill", cat: "burial", community: "Luo", threat: "Stable", level: "low", x: 80, y: 200 },
  { id: "10", name: "Aberdares cloud forest", cat: "biodiversity", community: "Kikuyu", threat: "Climate stress", level: "medium", x: 280, y: 230 },
  { id: "11", name: "Nzoia sacred bend", cat: "river", community: "Luo", threat: "Pollution", level: "high", x: 130, y: 210 },
  { id: "12", name: "Loita forest groves", cat: "forest", community: "Maasai", threat: "Charcoal", level: "medium", x: 220, y: 310 },
];

function Page() {
  const { current } = useCommunity();
  const [active, setActive] = useState<Set<CatId>>(new Set(CATEGORIES.map((c) => c.id)));
  const [hover, setHover] = useState<Site | null>(null);

  const toggle = (id: CatId) => {
    const next = new Set(active);
    next.has(id) ? next.delete(id) : next.add(id);
    setActive(next);
  };

  const visible = useMemo(
    () => SITES.filter((s) => active.has(s.cat) && (current.id === "all" || s.community === current.name)),
    [active, current]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    SITES.forEach((s) => { c[s.cat] = (c[s.cat] || 0) + 1; });
    return c;
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-3"><CommunityScopeBadge /></div>
      <PageHeader eyebrow="Module 03" title="Sacred Ecosystem Mapping" description="Where culture protected ecology for centuries. Filter by sacred class to inspect threats and stewardship." />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Sacred forests" value={String(counts.forest || 0)} icon={Trees} tone="forest" />
        <StatCard label="Water systems" value={String(counts.river || 0)} icon={Droplets} />
        <StatCard label="Ceremonial routes" value={String(counts.route || 0)} icon={Footprints} />
        <StatCard label="Active threats" value={String(SITES.filter((s) => s.level === "high").length)} delta="critical" icon={ShieldAlert} tone="warn" />
      </div>

      {/* Filter chips */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs uppercase tracking-widest text-muted-foreground">Filter classes:</span>
        {CATEGORIES.map((c) => {
          const on = active.has(c.id);
          return (
            <Button key={c.id} size="sm" variant={on ? "default" : "outline"} onClick={() => toggle(c.id)} className="gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
              <c.icon className="h-3.5 w-3.5" />
              {c.label}
            </Button>
          );
        })}
        <span className="ml-auto text-xs text-muted-foreground">{visible.length} of {SITES.length} sites visible</span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <SectionCard title="Living Sacred Atlas" description="Cultural-ecological overlay — hover a marker" className="lg:col-span-2">
          <div className="relative h-[460px] overflow-hidden rounded-xl border border-border/50" style={{ background: "radial-gradient(ellipse at 30% 40%, oklch(0.3 0.06 155 / 0.4), oklch(0.16 0.018 60))" }}>
            <svg viewBox="0 0 600 400" className="h-full w-full">
              <path d="M0,260 C120,220 200,300 320,250 S520,200 600,240" stroke="oklch(0.7 0.13 200 / 0.4)" fill="none" strokeWidth="2" />
              <path d="M150,400 C180,300 240,250 300,180 S400,80 420,0" stroke="oklch(0.7 0.13 200 / 0.3)" fill="none" strokeWidth="1.5" />
              {visible.map((s) => {
                const cat = CATEGORIES.find((c) => c.id === s.cat)!;
                return (
                  <g key={s.id} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(null)} className="cursor-pointer">
                    <circle cx={s.x} cy={s.y} r={s.level === "high" ? 22 : 16} fill={cat.color} fillOpacity={0.18} />
                    <circle cx={s.x} cy={s.y} r={6} fill={cat.color} stroke="oklch(0.95 0.02 80)" strokeWidth="1.5" />
                    {s.level === "high" && <circle cx={s.x} cy={s.y} r={11} fill="none" stroke="oklch(0.6 0.22 28)" strokeWidth="1.5" strokeDasharray="2 3" />}
                  </g>
                );
              })}
            </svg>
            {hover && (
              <div className="pointer-events-none absolute left-3 top-3 max-w-xs rounded-lg border border-border/60 bg-background/90 p-3 shadow-xl backdrop-blur">
                <div className="font-display text-base">{hover.name}</div>
                <div className="text-xs text-muted-foreground">{CATEGORIES.find(c => c.id === hover.cat)?.label} · {hover.community}</div>
                <div className="mt-2 flex items-center gap-1.5 text-xs">
                  <Flame className="h-3 w-3 text-secondary" /> {hover.threat}
                  <Badge variant={hover.level === "high" ? "destructive" : "outline"} className="ml-auto capitalize">{hover.level}</Badge>
                </div>
              </div>
            )}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {CATEGORIES.filter((c) => active.has(c.id)).map((c) => (
                <span key={c.id} className="flex items-center gap-1 rounded bg-background/60 px-2 py-1 text-[10px] uppercase tracking-widest backdrop-blur">
                  <span className="h-2 w-2 rounded-full" style={{ background: c.color }} /> {c.label}
                </span>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title={`Site Register · ${visible.length}`}>
          {visible.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">No sites match your filters.</div>
          ) : (
            <div className="max-h-[460px] space-y-3 overflow-auto pr-1">
              {visible.map((s) => {
                const cat = CATEGORIES.find((c) => c.id === s.cat)!;
                return (
                  <div key={s.id} className="rounded-lg border border-border/50 bg-background/40 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-display text-sm">{s.name}</div>
                      <Badge variant={s.level === "high" ? "destructive" : "outline"} className="capitalize">{s.level}</Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
                      {cat.label} · {s.community}
                    </div>
                    <div className="mt-1.5 text-xs text-secondary">{s.threat}</div>
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
