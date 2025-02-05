import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  LogIn,
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
import { contextLogout, CurrentUserContext } from "@/context/authContext";
import { useContext } from "react";
import { url } from "inspector";

export function AppSidebar() {
  const { setUser } = useContext(CurrentUserContext);
  const location = useLocation();

  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Create Post",
      url: "/create",
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
      url: `${import.meta.env.VITE_OTHER_HOST_URL}`,
      icon: BookOpenText,
    },
    {
      title: "Logout",
      url: "#",
      onClick: () => contextLogout(setUser),
      icon: LogIn,
    },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="items-start">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarGroupLabel className="px-2">Navigation</SidebarGroupLabel>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = item.url
                  ? location.pathname === item.url
                  : false;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {item.url ? (
                        <Link
                          data-activity={isActive}
                          to={item.url}
                          className="p-0"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      ) : (
                        <button data-activity={isActive} onClick={item.onClick}>
                          <item.icon />
                          <span>{item.title}</span>
                        </button>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
