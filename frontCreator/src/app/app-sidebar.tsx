import {
  Settings,
  SquarePen,
  AppWindow,
  MessageCircleCode,
  BookOpenText,
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
} from "@/components/ui/sidebar";
import App from "@/App";

// Menu items.
const items = [
  {
    title: "Create Post",
    url: "#",
    icon: SquarePen,
  },
  {
    title: "My Posts",
    url: "#",
    icon: AppWindow,
  },
  {
    title: "My Comments",
    url: "#",
    icon: MessageCircleCode,
  },
  {
    title: "Modern Murmur",
    url: "#",
    icon: BookOpenText,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader title="Navigation">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarHeader>
    </Sidebar>
  );
}
