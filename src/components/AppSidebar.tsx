import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Languages,
  Mic,
  Mountain,
  Sprout,
  Hammer,
  Coins,
  ShieldCheck,
  Bot,
  Flame,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const modules = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Preservation Metrics", url: "/preservation", icon: Languages },
  { title: "Oral History", url: "/oral-history", icon: Mic },
  { title: "Sacred Ecosystems", url: "/sacred-ecosystems", icon: Mountain },
  { title: "Indigenous Knowledge", url: "/indigenous-knowledge", icon: Sprout },
  { title: "Heritage Restoration", url: "/restoration", icon: Hammer },
  { title: "Cultural Economy", url: "/economy", icon: Coins },
  { title: "Sovereignty & Ethics", url: "/sovereignty", icon: ShieldCheck },
  { title: "AI Agents", url: "/agents", icon: Bot },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-glow)" }}>
            <Flame className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-display text-lg font-semibold text-foreground">Atlas Sanctum</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Heritage Command</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Civilization Layer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((m) => (
                <SidebarMenuItem key={m.url}>
                  <SidebarMenuButton asChild isActive={pathname === m.url} tooltip={m.title}>
                    <Link to={m.url}>
                      <m.icon className="h-4 w-4" />
                      <span>{m.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-2 py-2 text-[10px] uppercase tracking-widest text-muted-foreground group-data-[collapsible=icon]:hidden">
          Kenya Pilot · v0.1
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
