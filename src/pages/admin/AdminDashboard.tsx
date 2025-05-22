import React from "react";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChefHat, Users, Utensils, Flag } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Cooks"
          value={245}
          isPositive={true}
          change="+12% from last month"
          icon={<ChefHat className="h-8 w-8 text-blue-500" />}
        />
        
        <StatCard
          title="Active Users"
          value={1248}
          isPositive={true}
          change="+8% from last month"
          icon={<Users className="h-8 w-8 text-green-500" />}
        />
        
        <StatCard
          title="Total Meals"
          value={3542}
          isPositive={true}
          change="+15% from last month"
          icon={<Utensils className="h-8 w-8 text-orange-500" />}
        />
        
        <StatCard
          title="Open Reports"
          value={24}
          isPositive={false}
          change="+5% from last month"
          icon={<Flag className="h-8 w-8 text-red-500" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">Activity data will appear here...</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">System Health</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">System metrics will appear here...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
