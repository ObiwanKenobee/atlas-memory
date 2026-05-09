import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/sanctum/Primitives";
import { Languages, AlertTriangle, BookOpenCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";

export const Route = createFileRoute("/preservation")({
  head: () => ({ meta: [{ title: "Preservation Metrics — Atlas Sanctum" }, { name: "description", content: "Endangered languages, traditions, heritage site health and AI-powered preservation forecasts." }] }),
  component: Page,
});

const languages = [
  { name: "Yaaku", speakers: 7, risk: "critical" },
  { name: "Elmolo", speakers: 18, risk: "critical" },
  { name: "Suba", speakers: 1400, risk: "endangered" },
  { name: "Kore", speakers: 320, risk: "critical" },
  { name: "Ogiek", speakers: 12000, risk: "vulnerable" },
  { name: "Sengwer", speakers: 4500, risk: "endangered" },
];

const forecast = [
  { y: "2025", baseline: 49, intervention: 49 },
  { y: "2027", baseline: 45, intervention: 54 },
  { y: "2030", baseline: 38, intervention: 61 },
  { y: "2035", baseline: 29, intervention: 68 },
  { y: "2040", baseline: 21, intervention: 73 },
];

const traditions = [
  { name: "Maasai eunoto ceremony", status: 78 },
  { name: "Turkana fishing songs", status: 41 },
  { name: "Kikuyu wood carving", status: 56 },
  { name: "Swahili dhow building", status: 33 },
  { name: "Samburu beadwork lineage", status: 71 },
];

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader eyebrow="Module 01" title="Cultural Preservation Metrics" description="A real-time risk model for languages, ceremonies, sites and the artisans who carry them forward." />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Languages at risk" value="237" delta="42 critical · 88 endangered" icon={AlertTriangle} tone="warn" />
        <StatCard label="Traditions tracked" value="1,840" icon={BookOpenCheck} />
        <StatCard label="Heritage sites" value="3,418" delta="86% under stewardship" icon={Languages} tone="forest" />
        <StatCard label="Artisan population" value="412k" delta="↓ 4% YoY" icon={Users} tone="ember" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Endangered Language Watch" description="Live registry of vitality risk">
          <div className="space-y-3">
            {languages.map((l) => (
              <div key={l.name} className="flex items-center justify-between rounded-lg border border-border/50 bg-background/40 p-3">
                <div>
                  <div className="font-display text-lg">{l.name}</div>
                  <div className="text-xs text-muted-foreground">{l.speakers.toLocaleString()} active speakers</div>
                </div>
                <Badge variant={l.risk === "critical" ? "destructive" : "outline"} className="capitalize">{l.risk}</Badge>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="AI Preservation Forecast" description="Continuity score with vs. without intervention">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={forecast}>
              <CartesianGrid stroke="oklch(0.3 0.02 60)" strokeDasharray="3 3" />
              <XAxis dataKey="y" stroke="oklch(0.7 0.03 75)" />
              <YAxis stroke="oklch(0.7 0.03 75)" />
              <Tooltip contentStyle={{ background: "oklch(0.21 0.022 55)", border: "1px solid oklch(0.32 0.025 55)", borderRadius: 8 }} />
              <Line type="monotone" dataKey="baseline" stroke="oklch(0.6 0.22 28)" strokeWidth={2} name="No action" />
              <Line type="monotone" dataKey="intervention" stroke="oklch(0.55 0.12 155)" strokeWidth={2} name="Sanctum protocol" />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Tradition Vitality Index" description="Practice continuity by lineage" className="lg:col-span-2">
          <div className="space-y-4">
            {traditions.map((t) => (
              <div key={t.name}>
                <div className="mb-1 flex justify-between text-sm"><span>{t.name}</span><span className="text-muted-foreground">{t.status}/100</span></div>
                <Progress value={t.status} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
