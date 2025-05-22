
import React from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { EarningsChart } from "@/components/charts/EarningsChart";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ShoppingBag, DollarSign, Star, Heart, ChefHat } from "lucide-react";

const mockCookData = {
  name: "Alex Johnson",
  joinedDate: "June 2023",
  avatar: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  mostLovedDish: {
    name: "Homemade Lasagna",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7a33c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFzYWduYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    rating: 4.9,
    orders: 125,
  },
};

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-orange-300">
            <img src={mockCookData.avatar} alt={mockCookData.name} />
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {mockCookData.name}!</h1>
            <p className="text-muted-foreground">
              Member since {mockCookData.joinedDate}
            </p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-800 px-3 py-1 text-sm font-medium">
          <ChefHat className="h-4 w-4 mr-1" />
          Certified Cook
        </Badge>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders"
          value="246"
          icon={<ShoppingBag className="h-4 w-4" />}
          description="Orders received so far"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Earnings"
          value="$3,542"
          icon={<DollarSign className="h-4 w-4" />}
          description="Before platform fee"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Average Rating"
          value="4.8"
          icon={<Star className="h-4 w-4" />}
          description="From 183 reviews"
          trend={{ value: 0.2, isPositive: true }}
        />
        <StatCard
          title="Returning Customers"
          value="68%"
          icon={<Heart className="h-4 w-4" />}
          description="Ordered more than once"
          trend={{ value: 5, isPositive: true }}
        />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EarningsChart className="lg:col-span-2" />
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 h-full">
            <h3 className="font-medium mb-4">Most Loved Dish</h3>
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                <img
                  src={mockCookData.mostLovedDish.image}
                  alt={mockCookData.mostLovedDish.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-lg mb-2">
                {mockCookData.mostLovedDish.name}
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(mockCookData.mostLovedDish.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm">
                  {mockCookData.mostLovedDish.rating}
                </span>
              </div>
              <Badge className="bg-orange-100 text-orange-800">
                {mockCookData.mostLovedDish.orders} Orders
              </Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
