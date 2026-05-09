import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/sanctum/Primitives";
import { Mic, FileAudio, Languages, Network, Play, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/oral-history")({
  head: () => ({ meta: [{ title: "Oral History Intelligence — Atlas Sanctum" }, { name: "description", content: "Multi-format oral archives, AI transcription, semantic indexing and storyteller preservation." }] }),
  component: Page,
});

const stories = [
  { title: "Origin of the Mau forest spirits", elder: "Mzee Kiprono", lang: "Kalenjin", duration: "47:12", tags: ["origin", "forest", "ritual"] },
  { title: "How the river chose its bend", elder: "Nasieku ene Saitoti", lang: "Maa", duration: "12:38", tags: ["water", "land"] },
  { title: "The drought of '84 and the rainmaker", elder: "Ekiru Lokwawi", lang: "Turkana", duration: "1:03:50", tags: ["climate", "ancestral"] },
  { title: "Songs of the dhow builders", elder: "Bi Mwanahawa", lang: "Swahili", duration: "28:04", tags: ["craft", "song"] },
  { title: "The naming of the seven hills", elder: "Wanjiku wa Gathoni", lang: "Gikuyu", duration: "35:21", tags: ["place", "lineage"] },
];

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader eyebrow="Module 02" title="Oral History Intelligence System" description="Audio, video, manuscripts and ceremonies — transcribed, translated and woven into a searchable narrative graph." />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Recordings archived" value="58,902" icon={FileAudio} tone="ember" />
        <StatCard label="Hours transcribed" value="34,118" delta="↑ 1,247 this month" icon={Mic} />
        <StatCard label="Languages covered" value="184" icon={Languages} tone="forest" />
        <StatCard label="Knowledge graph nodes" value="2.1M" icon={Network} />
      </div>

      <SectionCard title="Searchable Narrative Engine" description="Search across stories, ceremonies, songs and elders" className="mt-8">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder='Try "rain-calling ceremonies" or "river origin stories"' className="pl-10" />
          </div>
          <Button>Search graph</Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {["drought", "first ancestor", "moon", "hunter", "iron-smelting", "honey", "marriage rite"].map((t) => (
            <Badge key={t} variant="outline" className="border-border/60">{t}</Badge>
          ))}
        </div>
      </SectionCard>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <SectionCard title="Recently indexed testimonies" className="lg:col-span-2">
          <div className="divide-y divide-border/50">
            {stories.map((s) => (
              <div key={s.title} className="flex items-center gap-4 py-3">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:scale-105" aria-label={`Play ${s.title}`}>
                  <Play className="h-4 w-4" />
                </button>
                <div className="flex-1">
                  <div className="font-display text-lg leading-tight">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.elder} · {s.lang} · {s.duration}</div>
                </div>
                <div className="hidden gap-1 md:flex">
                  {s.tags.map((t) => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Community Memory Map" description="Geographic density of testimonies">
          <div className="relative h-[280px] overflow-hidden rounded-lg border border-border/50" style={{ background: "var(--gradient-sacred)" }}>
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                <radialGradient id="dot" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.78 0.15 75)" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="oklch(0.78 0.15 75)" stopOpacity="0" />
                </radialGradient>
              </defs>
              {[
                [60, 90, 18], [120, 70, 28], [90, 130, 22], [150, 110, 14],
                [40, 150, 12], [170, 60, 16], [100, 100, 10], [70, 50, 14],
              ].map(([x, y, r], i) => (
                <circle key={i} cx={x} cy={y} r={r} fill="url(#dot)" />
              ))}
              <path d="M0,160 Q50,140 100,150 T200,140" stroke="oklch(0.55 0.12 155 / 0.5)" fill="none" strokeWidth="1" />
              <path d="M30,30 Q90,80 150,40 T200,80" stroke="oklch(0.55 0.18 35 / 0.4)" fill="none" strokeWidth="1" />
            </svg>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">8 partner regions · 412 community contributors</div>
        </SectionCard>
      </div>
    </div>
  );
}
