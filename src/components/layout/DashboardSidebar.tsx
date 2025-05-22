
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
import { ChefHat, Utensils, ShoppingBag, Star, PieChart, Settings, Heart } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type SidebarLink = {
  to: string;
  label: string;
  icon: React.ElementType;
};

const links: SidebarLink[] = [
  {
    to: "/",
    label: "Dashboard",
    icon: PieChart,
  },
  {
    to: "/dashboard/dishes",
    label: "My Dishes",
    icon: Utensils,
  },
  {
    to: "/dashboard/orders",
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    to: "/dashboard/reviews",
    label: "Reviews",
    icon: Star,
  },
  {
    to: "/dashboard/earnings",
    label: "Earnings",
    icon: Heart,
  },
  {
    to: "/dashboard/profile",
    label: "Profile",
    icon: Settings,
  },
];

export function DashboardSidebar({ cookName = "Chef Alex", cookImage = "/chef-placeholder.jpg" }) {
  const isMobile = useIsMobile();
  
  return (
    <Sidebar className="border-r border-orange-100">
      <SidebarHeader className="p-4 flex items-center gap-2">
        <ChefHat className="h-6 w-6 text-orange-500" />
        <h1 className="text-xl font-bold">HomeCooks</h1>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        <div className="flex flex-col items-center mb-6 p-4">
          <Avatar className="h-20 w-20 mb-2 border-2 border-orange-300">
            <img src={cookImage} alt={cookName} className="object-cover" />
          </Avatar>
          <h2 className="text-lg font-medium">{cookName}</h2>
          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full mt-2">
            Certified Cook
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
                      ? "flex items-center gap-3 px-3 py-2 rounded-md bg-orange-100 text-orange-700"
                      : "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-orange-50"
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
        <Button variant="outline" className="w-full border-orange-200">
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
