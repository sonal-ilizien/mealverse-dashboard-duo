
import React, { ReactNode } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster as Sonner } from "@/components/ui/sonner";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col">
          <div className="flex-grow p-4 md:p-6 bg-background overflow-auto">
            <SidebarTrigger className="mb-4 md:hidden" />
            {children}
          </div>
        </main>
        <Sonner />
      </div>
    </SidebarProvider>
  );
}
