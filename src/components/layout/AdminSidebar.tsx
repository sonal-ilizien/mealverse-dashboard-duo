
import React from "react";
import { NavLink } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { 
  PieChart, 
  Users, 
  ChefHat, 
  Utensils, 
  Flag, 
  Bell, 
  Settings 
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type SidebarLink = {
  to: string;
  label: string;
  icon: React.ElementType;
};

const links: SidebarLink[] = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: PieChart,
  },
  {
    to: "/admin/cooks",
    label: "Cooks Management",
    icon: ChefHat,
  },
  {
    to: "/admin/users",
    label: "Users Management",
    icon: Users,
  },
  {
    to: "/admin/meals",
    label: "Meals Overview",
    icon: Utensils,
  },
  {
    to: "/admin/reports",
    label: "Reports & Flags",
    icon: Flag,
  },
  {
    to: "/admin/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    to: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const isMobile = useIsMobile();
  
  return (
    <Sidebar className="border-r border-blue-100">
      <SidebarHeader className="p-4 flex items-center gap-2">
        <ChefHat className="h-6 w-6 text-blue-500" />
        <h1 className="text-xl font-bold">HomeCooks Admin</h1>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        <div className="flex flex-col items-center mb-6 p-4">
          <Avatar className="h-20 w-20 mb-2 border-2 border-blue-300">
            <img src="/chef-placeholder.jpg" alt="Admin" className="object-cover" />
          </Avatar>
          <h2 className="text-lg font-medium">Admin User</h2>
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full mt-2">
            Super Admin
          </span>
        </div>
        
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.to}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-3 py-2 rounded-md bg-blue-100 text-blue-700"
                      : "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50"
                  }
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button variant="outline" className="w-full border-blue-200">
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
