import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/sanctum/Primitives";
import { CommunityScopeBadge, useCommunity } from "@/components/CommunityContext";
import { ShieldCheck, Lock, FileSignature, Users, EyeOff, Crown, Globe, BookLock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/sovereignty")({
  head: () => ({ meta: [{ title: "Knowledge Sovereignty & Ethics — Atlas Sanctum" }, { name: "description", content: "Per-archive consent management, tribal ownership and sacred restrictions." }] }),
  component: Page,
});

const ACCESS_LEVELS = [
  { id: "open", label: "Open archive", icon: Globe, tone: "default" },
  { id: "attribution", label: "Attribution required", icon: FileSignature, tone: "default" },
  { id: "community", label: "Community only", icon: Users, tone: "secondary" },
  { id: "elder", label: "Elder-gated", icon: BookLock, tone: "secondary" },
  { id: "council", label: "Tribal council only", icon: Crown, tone: "destructive" },
  { id: "sealed", label: "Sealed (sacred)", icon: Lock, tone: "destructive" },
] as const;
type AccessId = (typeof ACCESS_LEVELS)[number]["id"];

type Item = {
  id: string;
  name: string;
  community: string;
  steward: string;
  access: AccessId;
  consent: boolean;
  aiTraining: boolean;
  publicView: boolean;
  exportAllowed: boolean;
};

const SEED: Item[] = [
  { id: "i1", name: "Eunoto ceremony recordings", community: "Maasai", steward: "Loita council", access: "council", consent: true, aiTraining: false, publicView: false, exportAllowed: false },
  { id: "i2", name: "Mau forest medicinal plant atlas", community: "Kalenjin", steward: "Ogiek elders", access: "elder", consent: true, aiTraining: false, publicView: false, exportAllowed: false },
  { id: "i3", name: "Kit Mikayi origin stories", community: "Luo", steward: "Seme heritage trust", access: "attribution", consent: true, aiTraining: true, publicView: true, exportAllowed: true },
  { id: "i4", name: "Mijikenda Kaya burial coordinates", community: "Swahili Coast", steward: "Kaya elders", access: "sealed", consent: true, aiTraining: false, publicView: false, exportAllowed: false },
  { id: "i5", name: "Turkana fishing songs", community: "Turkana", steward: "Lake Turkana cultural assembly", access: "community", consent: true, aiTraining: true, publicView: false, exportAllowed: false },
  { id: "i6", name: "Samburu warrior initiation cycle", community: "Samburu", steward: "Lpurkel council", access: "council", consent: true, aiTraining: false, publicView: false, exportAllowed: false },
  { id: "i7", name: "Kikuyu folk songs (public domain)", community: "Kikuyu", steward: "Kiama Kia Ma", access: "open", consent: true, aiTraining: true, publicView: true, exportAllowed: true },
  { id: "i8", name: "Lamu silver-craft lineage notes", community: "Swahili Coast", steward: "Lamu Cultural Trust", access: "attribution", consent: true, aiTraining: true, publicView: true, exportAllowed: false },
];

function levelTone(id: AccessId) {
  const l = ACCESS_LEVELS.find((a) => a.id === id)!;
  return l.tone;
}

function Page() {
  const { current } = useCommunity();
  const [items, setItems] = useState<Item[]>(SEED);

  const filtered = useMemo(
    () => (current.id === "all" ? items : items.filter((i) => i.community === current.name)),
    [items, current]
  );

  const update = (id: string, patch: Partial<Item>) => {
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };

  const stats = useMemo(() => {
    const restricted = items.filter((i) => ["council", "sealed", "elder"].includes(i.access)).length;
    const aiBlocked = items.filter((i) => !i.aiTraining).length;
    return { restricted, aiBlocked };
  }, [items]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-3"><CommunityScopeBadge /></div>
      <PageHeader eyebrow="Module 07" title="Knowledge Sovereignty & Ethical Governance" description="Per-archive consent, tribal ownership and sacred restrictions. Communities decide. AI obeys." />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Communities onboarded" value="42" icon={Users} tone="forest" />
        <StatCard label="Consent agreements" value={String(items.filter((i) => i.consent).length * 148)} delta="100% revocable" icon={FileSignature} />
        <StatCard label="Restricted archives" value={String(stats.restricted)} icon={Lock} tone="ember" />
        <StatCard label="AI-restricted records" value={String(stats.aiBlocked)} icon={EyeOff} tone="warn" />
      </div>

      <SectionCard title={`Per-archive consent · ${filtered.length}`} description="Edit access tier, AI training, public visibility and export — per item, per community." className="mt-8">
        <div className="space-y-3">
          {filtered.map((i) => {
            const lvl = ACCESS_LEVELS.find((a) => a.id === i.access)!;
            const Icon = lvl.icon;
            return (
              <div key={i.id} className="rounded-xl border border-border/60 bg-background/40 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-[200px] flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-display text-lg leading-tight">{i.name}</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      <span className="text-accent">{i.community}</span> · steward: {i.steward}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={levelTone(i.access) === "destructive" ? "destructive" : levelTone(i.access) === "secondary" ? "secondary" : "outline"}>
                      {lvl.label}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <div className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Access tier</div>
                    <Select value={i.access} onValueChange={(v) => { update(i.id, { access: v as AccessId }); toast.success("Access tier updated"); }}>
                      <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {ACCESS_LEVELS.map((a) => (
                          <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {[
                    { k: "consent" as const, label: "Community consent" },
                    { k: "aiTraining" as const, label: "AI training" },
                    { k: "publicView" as const, label: "Public view" },
                    { k: "exportAllowed" as const, label: "Export allowed" },
                  ].slice(0, 4).map((row) => (
                    <div key={row.k} className="flex flex-col">
                      <div className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">{row.label}</div>
                      <div className="flex h-9 items-center">
                        <Switch checked={i[row.k] as boolean} onCheckedChange={(v) => { update(i.id, { [row.k]: v } as any); toast.success(`${row.label}: ${v ? "enabled" : "disabled"}`); }} />
                        <span className="ml-2 text-xs text-muted-foreground">{(i[row.k] as boolean) ? "On" : "Off"}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border/40 pt-3 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3 w-3 text-accent" />
                  Ethical Guardian Agent enforces these rules at every access event.
                  <Button size="sm" variant="ghost" className="ml-auto" onClick={() => toast("Audit log opened (mock)")}>View audit log</Button>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {[
          { icon: Crown, title: "Tribal ownership layers", body: "Every record is cryptographically attributed to a steward council with revocation rights." },
          { icon: Lock, title: "Sacred restrictions", body: "Ritual & ceremonial knowledge is sealed behind elder-gated access — invisible to crawlers and models." },
          { icon: FileSignature, title: "Consent ledger", body: "All disclosures are timestamped, signed, and reversible. Audited daily by the Ethical Guardian." },
        ].map((c) => (
          <div key={c.title} className="rounded-xl border border-border/60 bg-card/60 p-5">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "var(--gradient-forest)" }}>
              <c.icon className="h-5 w-5 text-accent-foreground" />
            </div>
            <h3 className="font-display text-xl">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
