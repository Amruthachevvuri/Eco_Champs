import { Home, BookOpen, Brain, Sprout, Trophy, Star, Calendar, User, LogOut, Leaf } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Learn", url: "/learn", icon: BookOpen },
  { title: "Quiz", url: "/quiz", icon: Brain },
  { title: "Tasks", url: "/tasks", icon: Sprout },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Badges", url: "/badges", icon: Star },
  { title: "Events", url: "/events", icon: Calendar },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <div className="p-4 flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl gradient-forest flex items-center justify-center shrink-0">
          <Leaf size={20} className="text-primary-foreground" />
        </div>
        {!collapsed && <span className="font-display text-xl font-900 text-foreground">EcoChamps</span>}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-muted/50"
                      activeClassName="bg-primary/10 text-primary font-bold"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenuButton asChild>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors text-sm">
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Log out</span>}
          </button>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
