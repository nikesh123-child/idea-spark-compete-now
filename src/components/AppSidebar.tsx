
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

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Findings",
    url: "#",
    icon: ShieldAlert,
    label: "1",
  },
  {
    title: "Reports",
    url: "#",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const activePath = "/";

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
                <a href={item.url} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </div>
                  {item.label && (
                    <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                      {item.label}
                    </Badge>
                  )}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
