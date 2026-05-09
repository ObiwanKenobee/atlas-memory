import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/sanctum/Primitives";
import { CommunityScopeBadge } from "@/components/CommunityContext";
import { Sprout, Cloud, Leaf, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export const Route = createFileRoute("/indigenous-knowledge")({
  head: () => ({ meta: [{ title: "Indigenous Knowledge Engine — Atlas Sanctum" }, { name: "description", content: "Drought prediction, regenerative farming, medicinal plants and water wisdom — correlated with satellite data." }] }),
  component: Page,
});

const correlations = [
  { domain: "Drought", indigenous: 84, satellite: 79 },
  { domain: "Pollinators", indigenous: 71, satellite: 64 },
  { domain: "Soil health", indigenous: 88, satellite: 73 },
  { domain: "Rainfall", indigenous: 76, satellite: 81 },
  { domain: "Wildfire", indigenous: 69, satellite: 72 },
];

const practices = [
  { name: "Zaï pit micro-catchments", region: "Sahel-adjacent", impact: "Soil moisture +47%", risk: "stable" },
  { name: "Maasai rotational grazing", region: "Rift Valley", impact: "Grass recovery +33%", risk: "stable" },
  { name: "Mijikenda kaya forest tabu", region: "Coast", impact: "Biodiversity x2.1", risk: "endangered" },
  { name: "Kikuyu intercropping (irio)", region: "Central highlands", impact: "Yield resilience +28%", risk: "stable" },
  { name: "Turkana well-divination", region: "North", impact: "Borehole hit-rate +19%", risk: "rare" },
];

const plants = [
  { name: "Mukombero", use: "Energy & vitality", part: "Root" },
  { name: "Mwarubaini (neem)", use: "Anti-malarial", part: "Leaf/bark" },
  { name: "Muthiga", use: "Stomach disorders", part: "Bark" },
  { name: "Sodom apple", use: "Wound healing", part: "Fruit" },
  { name: "Aloe secundiflora", use: "Liver tonic", part: "Sap" },
];

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader eyebrow="Module 04" title="Indigenous Ecological Knowledge Engine" description="An alternative intelligence layer to industrial systems — wisdom systems triangulated with satellite data." />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Documented practices" value="2,194" icon={Sprout} tone="forest" />
        <StatCard label="Medicinal species" value="3,612" icon={Leaf} />
        <StatCard label="Climate forecasts" value="186" delta="local rain calendars" icon={Cloud} />
        <StatCard label="AI-validated correlations" value="74%" delta="vs. satellite ground truth" icon={Sparkles} tone="ember" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <SectionCard title="Indigenous vs. Satellite Predictive Accuracy" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={correlations}>
              <CartesianGrid stroke="oklch(0.3 0.02 60)" strokeDasharray="3 3" />
              <XAxis dataKey="domain" stroke="oklch(0.7 0.03 75)" />
              <YAxis stroke="oklch(0.7 0.03 75)" />
              <Tooltip contentStyle={{ background: "oklch(0.21 0.022 55)", border: "1px solid oklch(0.32 0.025 55)", borderRadius: 8 }} />
              <Bar dataKey="indigenous" fill="oklch(0.55 0.18 35)" name="Indigenous" radius={[4, 4, 0, 0]} />
              <Bar dataKey="satellite" fill="oklch(0.55 0.12 155)" name="Satellite" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Medicinal Plant Registry">
          <div className="space-y-2">
            {plants.map((p) => (
              <div key={p.name} className="rounded-lg border border-border/50 bg-background/40 p-3">
                <div className="font-display">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.use} · {p.part}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Regenerative Practice Library" className="lg:col-span-3">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {practices.map((p) => (
              <div key={p.name} className="rounded-lg border border-border/50 bg-background/40 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-display text-lg leading-tight">{p.name}</div>
                  <Badge variant={p.risk === "stable" ? "outline" : "destructive"} className="capitalize">{p.risk}</Badge>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{p.region}</div>
                <div className="mt-3 text-sm text-accent">{p.impact}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
