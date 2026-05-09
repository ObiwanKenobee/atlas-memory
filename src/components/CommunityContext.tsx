import { createContext, useContext, useState, type ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe2, Check } from "lucide-react";

export const COMMUNITIES = [
  { id: "all", name: "All Kenya signals", region: "—" },
  { id: "maasai", name: "Maasai", region: "Rift Valley" },
  { id: "kikuyu", name: "Kikuyu", region: "Central highlands" },
  { id: "luo", name: "Luo", region: "Lake Victoria basin" },
  { id: "kalenjin", name: "Kalenjin", region: "Western highlands" },
  { id: "samburu", name: "Samburu", region: "North-central" },
  { id: "turkana", name: "Turkana", region: "Northwest" },
  { id: "swahili", name: "Swahili Coast", region: "Indian Ocean coast" },
] as const;

export type CommunityId = (typeof COMMUNITIES)[number]["id"];

type Ctx = {
  community: CommunityId;
  setCommunity: (id: CommunityId) => void;
  current: (typeof COMMUNITIES)[number];
};

const CommunityCtx = createContext<Ctx | null>(null);

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [community, setCommunity] = useState<CommunityId>("all");
  const current = COMMUNITIES.find((c) => c.id === community) ?? COMMUNITIES[0];
  return (
    <CommunityCtx.Provider value={{ community, setCommunity, current }}>
      {children}
    </CommunityCtx.Provider>
  );
}

export function useCommunity() {
  const ctx = useContext(CommunityCtx);
  if (!ctx) throw new Error("useCommunity must be used inside CommunityProvider");
  return ctx;
}

export function CommunitySwitcher() {
  const { community, setCommunity, current } = useCommunity();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-border/60 bg-background/40">
          <Globe2 className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Community</span>
          <span className="text-xs text-foreground">{current.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Kenya Pilot · filter signal</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {COMMUNITIES.map((c) => (
          <DropdownMenuItem key={c.id} onClick={() => setCommunity(c.id)} className="flex items-center justify-between">
            <div>
              <div className="text-sm">{c.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.region}</div>
            </div>
            {c.id === community && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function CommunityScopeBadge() {
  const { current } = useCommunity();
  return (
    <Badge variant="outline" className="border-primary/40 bg-background/40 text-primary">
      Scope: {current.name}
    </Badge>
  );
}
