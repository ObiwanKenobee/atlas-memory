import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/sanctum/Primitives";
import { ShieldCheck, Lock, FileSignature, Users, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/sovereignty")({
  head: () => ({ meta: [{ title: "Knowledge Sovereignty & Ethics — Atlas Sanctum" }, { name: "description", content: "Permissioned archives, tribal ownership layers, consent and sacred knowledge restrictions." }] }),
  component: Page,
});

const policies = [
  { name: "Sacred ritual recordings", level: "Tribal council only", consent: true, ai: false },
  { name: "Medicinal plant locations", level: "Elder-gated", consent: true, ai: false },
  { name: "Public oral histories", level: "Open archive", consent: true, ai: true },
  { name: "Burial site coordinates", level: "Restricted", consent: true, ai: false },
  { name: "Folk songs & stories", level: "Attribution required", consent: true, ai: true },
];

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader eyebrow="Module 07" title="Knowledge Sovereignty & Ethical Governance" description="Communities own their knowledge. Consent is structural, not optional. AI never extracts what is sacred." />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Communities onboarded" value="42" icon={Users} tone="forest" />
        <StatCard label="Consent agreements" value="1,184" delta="100% revocable" icon={FileSignature} />
        <StatCard label="Restricted archives" value="312" icon={Lock} tone="ember" />
        <StatCard label="AI-restricted records" value="2,471" icon={EyeOff} tone="warn" />
      </div>

      <SectionCard title="Knowledge Permission Matrix" description="Per-class governance settings — defined and signed by community councils" className="mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border/60">
                <th className="py-3">Knowledge class</th>
                <th>Access level</th>
                <th>Community consent</th>
                <th>AI training allowed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {policies.map((p) => (
                <tr key={p.name} className="py-2">
                  <td className="py-4 font-display">{p.name}</td>
                  <td><Badge variant="outline">{p.level}</Badge></td>
                  <td><Switch checked={p.consent} disabled aria-label="consent" /></td>
                  <td><Switch checked={p.ai} disabled aria-label="ai" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {[
          { icon: ShieldCheck, title: "Tribal ownership layers", body: "Every record is cryptographically attributed to a steward council with revocation rights." },
          { icon: Lock, title: "Sacred restrictions", body: "Ritual & ceremonial knowledge is sealed behind elder-gated access — invisible to crawlers and models." },
          { icon: FileSignature, title: "Consent ledger", body: "All disclosures are timestamped, signed, and reversible. The ethical guardian agent audits flows daily." },
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
