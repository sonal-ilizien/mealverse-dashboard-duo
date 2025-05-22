
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Star, Users, Utensils, ShoppingBag, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Users" 
          value="2,543" 
          trend="+12%" 
          trendUp={true} 
          icon={<Users className="h-5 w-5" />}
          description="Active accounts"
        />
        <StatCard 
          title="Total Cooks" 
          value="156" 
          trend="+8%" 
          trendUp={true} 
          icon={<ChefHat className="h-5 w-5" />}
          description="Certified cooks"
        />
        <StatCard 
          title="Meals Listed" 
          value="782" 
          trend="+23%" 
          trendUp={true} 
          icon={<Utensils className="h-5 w-5" />}
          description="Available dishes"
        />
        <StatCard 
          title="Daily Orders" 
          value="342" 
          trend="+5%" 
          trendUp={true} 
          icon={<ShoppingBag className="h-5 w-5" />}
          description="Today's orders"
        />
      </section>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Performing Cooks</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cook</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCooks.map((cook) => (
                  <TableRow key={cook.id}>
                    <TableCell className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <img src={cook.avatar} alt={cook.name} />
                      </Avatar>
                      {cook.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{cook.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{cook.orders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cook</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApprovals.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <img src={approval.avatar} alt={approval.name} />
                      </Avatar>
                      {approval.name}
                    </TableCell>
                    <TableCell>{approval.date}</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {approval.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-semibold">$24,532</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
            <div className="p-4 bg-green-50 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Platform Fee</p>
                <p className="text-2xl font-semibold">$3,680</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="p-4 bg-orange-50 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cook Payouts</p>
                <p className="text-2xl font-semibold">$20,852</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Mock data for the tables
const topCooks = [
  { id: "1", name: "Chef Alex", avatar: "https://i.pravatar.cc/150?img=10", rating: 4.9, orders: 124 },
  { id: "2", name: "Chef Maria", avatar: "https://i.pravatar.cc/150?img=11", rating: 4.8, orders: 112 },
  { id: "3", name: "Chef David", avatar: "https://i.pravatar.cc/150?img=12", rating: 4.7, orders: 98 },
  { id: "4", name: "Chef Lisa", avatar: "https://i.pravatar.cc/150?img=13", rating: 4.6, orders: 87 },
];

const pendingApprovals = [
  { id: "1", name: "John Smith", avatar: "https://i.pravatar.cc/150?img=14", date: "Today", status: "Pending" },
  { id: "2", name: "Sarah Lee", avatar: "https://i.pravatar.cc/150?img=15", date: "Yesterday", status: "Pending" },
  { id: "3", name: "Robert Chen", avatar: "https://i.pravatar.cc/150?img=16", date: "2 days ago", status: "Pending" },
];

// Missing import
import { ChefHat } from "lucide-react";
