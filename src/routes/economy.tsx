import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/sanctum/Primitives";
import { CommunityScopeBadge } from "@/components/CommunityContext";
import { Coins, Palette, Plane, Music } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/economy")({
  head: () => ({ meta: [{ title: "Cultural Economy — Atlas Sanctum" }, { name: "description", content: "Artisan marketplaces, grants, regenerative tourism and creator cooperatives." }] }),
  component: Page,
});

const flow = [
  { m: "Jan", grants: 120, marketplace: 80, tourism: 60 },
  { m: "Feb", grants: 132, marketplace: 95, tourism: 72 },
  { m: "Mar", grants: 148, marketplace: 110, tourism: 88 },
  { m: "Apr", grants: 161, marketplace: 124, tourism: 102 },
  { m: "May", grants: 176, marketplace: 138, tourism: 119 },
  { m: "Jun", grants: 192, marketplace: 154, tourism: 137 },
];

const allocation = [
  { name: "Artisan grants", value: 38, fill: "oklch(0.78 0.15 75)" },
  { name: "Tourism", value: 24, fill: "oklch(0.55 0.12 155)" },
  { name: "Music & film", value: 19, fill: "oklch(0.55 0.18 35)" },
  { name: "Cooperatives", value: 12, fill: "oklch(0.7 0.13 200)" },
  { name: "Heritage pools", value: 7, fill: "oklch(0.65 0.18 320)" },
];

const artisans = [
  { craft: "Kazuri bead cooperatives", risk: "stable", artisans: 1240, region: "Karen, Nairobi" },
  { craft: "Lamu silver filigree", risk: "endangered", artisans: 87, region: "Coast" },
  { craft: "Kisii soapstone carving", risk: "stable", artisans: 980, region: "Western" },
  { craft: "Turkana basket weaving", risk: "vulnerable", artisans: 410, region: "North" },
  { craft: "Maasai shuka loom", risk: "vulnerable", artisans: 320, region: "Rift Valley" },
];

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-3"><CommunityScopeBadge /></div>
      <PageHeader eyebrow="Module 06" title="Cultural Economy Layer" description="Culture must remain economically alive. Capital flows, marketplaces and creator cooperatives — measured for regeneration impact." />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Capital deployed" value="$84.2M" delta="↑ 22% YoY" icon={Coins} tone="ember" />
        <StatCard label="Active artisans" value="42,108" icon={Palette} />
        <StatCard label="Regenerative tourism nodes" value="218" icon={Plane} tone="forest" />
        <StatCard label="Music/film grants" value="612" icon={Music} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <SectionCard title="Cultural Capital Flow" description="Monthly disbursements ($k)" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={flow}>
              <defs>
                {["a1", "a2", "a3"].map((id, i) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={["oklch(0.78 0.15 75)", "oklch(0.55 0.12 155)", "oklch(0.55 0.18 35)"][i]} stopOpacity={0.6} />
                    <stop offset="100%" stopColor={["oklch(0.78 0.15 75)", "oklch(0.55 0.12 155)", "oklch(0.55 0.18 35)"][i]} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid stroke="oklch(0.3 0.02 60)" strokeDasharray="3 3" />
              <XAxis dataKey="m" stroke="oklch(0.7 0.03 75)" />
              <YAxis stroke="oklch(0.7 0.03 75)" />
              <Tooltip contentStyle={{ background: "oklch(0.21 0.022 55)", border: "1px solid oklch(0.32 0.025 55)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="grants" stroke="oklch(0.78 0.15 75)" fill="url(#a1)" />
              <Area type="monotone" dataKey="marketplace" stroke="oklch(0.55 0.12 155)" fill="url(#a2)" />
              <Area type="monotone" dataKey="tourism" stroke="oklch(0.55 0.18 35)" fill="url(#a3)" />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Allocation by Vehicle">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={allocation} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {allocation.map((a) => <Cell key={a.name} fill={a.fill} />)}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Endangered Crafts Watch" className="lg:col-span-3">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {artisans.map((a) => (
              <div key={a.craft} className="rounded-lg border border-border/50 bg-background/40 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-display text-lg leading-tight">{a.craft}</div>
                  <Badge variant={a.risk === "stable" ? "outline" : a.risk === "vulnerable" ? "secondary" : "destructive"} className="capitalize">{a.risk}</Badge>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{a.region}</div>
                <div className="mt-3 font-display text-xl">{a.artisans.toLocaleString()} <span className="text-xs text-muted-foreground">active</span></div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
