
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Utensils } from "lucide-react";

// Sample meal data
const initialMeals = [
  { 
    id: "1", 
    name: "Homemade Lasagna", 
    chef: "Maria Garcia",
    price: 12.99, 
    category: "Italian",
    rating: 4.8,
    status: "active"
  },
  { 
    id: "2", 
    name: "Butter Chicken", 
    chef: "Raj Patel",
    price: 14.99, 
    category: "Indian",
    rating: 4.9,
    status: "active"
  },
  { 
    id: "3", 
    name: "Vegetable Stir Fry", 
    chef: "Lin Chen",
    price: 10.99, 
    category: "Asian",
    rating: 4.5,
    status: "inactive"
  },
  { 
    id: "4", 
    name: "Classic Beef Burger", 
    chef: "John Smith",
    price: 9.99, 
    category: "American",
    rating: 4.3,
    status: "active"
  },
  { 
    id: "5", 
    name: "Seafood Paella", 
    chef: "Isabella Martinez",
    price: 16.99, 
    category: "Spanish",
    rating: 4.7,
    status: "flagged"
  },
];

const MealsOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState(initialMeals);

  const filteredMeals = meals.filter(meal => 
    meal.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    meal.chef.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meal.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>;
      case "flagged":
        return <Badge className="bg-red-500">Flagged</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meals Overview</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Utensils className="mr-2 h-4 w-4" />
            Add Meal
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Chef</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMeals.map((meal) => (
                <TableRow key={meal.id}>
                  <TableCell className="font-medium">{meal.name}</TableCell>
                  <TableCell>{meal.chef}</TableCell>
                  <TableCell>{meal.category}</TableCell>
                  <TableCell>${meal.price.toFixed(2)}</TableCell>
                  <TableCell>{meal.rating}/5.0</TableCell>
                  <TableCell>{getStatusBadge(meal.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default MealsOverview;
