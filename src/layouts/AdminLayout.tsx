
import React, { ReactNode } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster as Sonner } from "@/components/ui/sonner";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
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
