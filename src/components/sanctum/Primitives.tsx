import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div className="mb-2 text-[11px] uppercase tracking-[0.3em] text-primary/80">{eyebrow}</div>
      )}
      <h1 className="font-display text-4xl font-semibold text-foreground md:text-5xl">{title}</h1>
      {description && <p className="mt-3 max-w-3xl text-muted-foreground">{description}</p>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: LucideIcon;
  tone?: "default" | "ember" | "forest" | "warn";
}) {
  const toneRing = {
    default: "ring-border",
    ember: "ring-secondary/40",
    forest: "ring-accent/40",
    warn: "ring-destructive/40",
  }[tone];
  return (
    <Card className={cn("relative overflow-hidden ring-1", toneRing)}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-3xl"
        style={{ background: tone === "forest" ? "var(--gradient-forest)" : "var(--gradient-ember)" }} />
      <CardHeader className="pb-2">
        <CardDescription className="flex items-center gap-2 text-xs uppercase tracking-wider">
          {Icon && <Icon className="h-3.5 w-3.5" />}
          {label}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="font-display text-3xl font-semibold text-foreground">{value}</div>
        {delta && <div className="mt-1 text-xs text-muted-foreground">{delta}</div>}
      </CardContent>
    </Card>
  );
}

export function SectionCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("border-border/60", className)}>
      <CardHeader>
        <CardTitle className="font-display text-xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
