import { useLocation, Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  LogIn,
  SquarePen,
  AppWindow,
  MessageCircleCode,
  BookOpenText,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

export function AppSidebar() {
  const { setUser } = useContext(CurrentUserContext);

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
      url: "/posts",
      icon: AppWindow,
    },
    {
      title: "My Comments",
      url: "/comments",
      icon: MessageCircleCode,
    },
    {
      title: "Modern Murmur",
      url: `${import.meta.env.VITE_OTHER_HOST_URL}`,
      icon: BookOpenText,
    },
    {
      title: "Logout",
      onClick: () => {
        console.log("test");
        contextLogout(setUser);
      },
      icon: LogIn,
    },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="items-start">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarGroupLabel className="px-2 text-xl">
              Navigation
            </SidebarGroupLabel>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className="group-data-[collapsible=icon]:px-2 p-1 py-1" // Adjust padding based on state
                  >
                    <SidebarMenuButton asChild>
                      {item.url ? (
                        <NavLink
                          className={({ isActive }) =>
                            cn(
                              "w-full transition-colors duration-200 flex",
                              isActive && "active"
                            )
                          }
                          to={item.url}
                        >
                          <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                            <item.icon className="w-6 h-6 shrink-0 transition-colors" />
                            <span className="truncate group-data-[collapsible=icon]:hidden text-base transition-colors">
                              {item.title}
                            </span>
                          </div>
                        </NavLink>
                      ) : (
                        <button
                          onClick={item.onClick}
                          className="w-full transition-colors duration-200 flex"
                        >
                          <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                            <item.icon className="w-6 h-6 shrink-0" />
                            <span className="truncate group-data-[collapsible=icon]:hidden text-base">
                              {item.title}
                            </span>
                          </div>
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
