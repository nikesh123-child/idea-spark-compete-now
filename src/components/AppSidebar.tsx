
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, ShieldAlert, FileText, Settings, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { findings } from "@/data/findings";

const openFindingsCount = findings.filter((f) => f.status === "Open").length;

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Findings",
    url: "/findings",
    icon: ShieldAlert,
    label: openFindingsCount > 0 ? String(openFindingsCount) : undefined,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b flex items-center gap-2">
        <Rocket className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-semibold tracking-tight">Aegis AI</h2>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "w-full justify-start",
                  activePath === item.url && "bg-accent"
                )}
              >
                <Link to={item.url} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </div>
                  {item.label && (
                    <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                      {item.label}
                    </Badge>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
