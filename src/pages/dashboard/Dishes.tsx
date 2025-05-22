
import React, { useState } from "react";
import { DishCard } from "@/components/dashboard/DishCard";
import { AddDishForm } from "@/components/dashboard/AddDishForm";
import { Button } from "@/components/ui/button";
import { PlusIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";

// Sample dish data
const mockDishes = [
  {
    id: "1",
    name: "Homemade Lasagna",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7a33c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFzYWduYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 12.99,
    prepTime: "45 mins",
    category: "Dinner",
    isVegetarian: false,
    isAvailable: true,
  },
  {
    id: "2",
    name: "Greek Salad",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZWslMjBzYWxhZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 8.99,
    prepTime: "15 mins",
    category: "Lunch",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: "3",
    name: "Chocolate Brownies",
    image: "https://images.unsplash.com/photo-1589375900247-3c3dd09e7c18?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvd25pZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 6.99,
    prepTime: "30 mins",
    category: "Dessert",
    isVegetarian: true,
    isAvailable: false,
  },
  {
    id: "4",
    name: "Chicken Tikka Masala",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGlra2ElMjBtYXNhbGF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 14.99,
    prepTime: "50 mins",
    category: "Dinner",
    isVegetarian: false,
    isAvailable: true,
  },
  {
    id: "5",
    name: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1588137378348-ba9d0b994e9f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2FkbyUyMHRvYXN0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 7.99,
    prepTime: "10 mins",
    category: "Breakfast",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: "6",
    name: "Mango Smoothie",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuZ28lMjBzbW9vdGhpZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    price: 5.99,
    prepTime: "5 mins",
    category: "Drinks",
    isVegetarian: true,
    isAvailable: true,
  },
];

export default function Dishes() {
  const [dishes, setDishes] = useState(mockDishes);
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Handle dish edit
  const handleEditDish = (id: string) => {
    toast.info(`Edit dish with ID: ${id}`);
    // In a real app, this would open an edit form pre-filled with the dish data
  };

  // Handle toggle availability
  const handleToggleAvailability = (id: string, isAvailable: boolean) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish.id === id ? { ...dish, isAvailable } : dish
      )
    );
    
    toast.success(`Dish ${isAvailable ? "is now available" : "has been hidden"}`);
  };

  // Handle add new dish
  const handleAddDish = (dishData: any) => {
    // In a real app, you would submit this data to your backend
    const newDish = {
      id: `dish-${dishes.length + 1}`,
      name: dishData.name,
      image: dishData.image ? URL.createObjectURL(dishData.image) : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      price: parseFloat(dishData.price),
      prepTime: dishData.prepTime,
      category: dishData.category,
      isVegetarian: dishData.isVegetarian,
      isAvailable: true,
    };
    
    setDishes((prevDishes) => [newDish, ...prevDishes]);
    toast.success("New dish added successfully!");
  };

  // Filter dishes based on search term and category
  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" ? true : dish.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">My Dishes</h1>
        <Button 
          onClick={() => setIsAddDishOpen(true)}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New Dish
        </Button>
      </section>
      
      <section className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search dishes..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Breakfast">Breakfast</SelectItem>
              <SelectItem value="Lunch">Lunch</SelectItem>
              <SelectItem value="Dinner">Dinner</SelectItem>
              <SelectItem value="Dessert">Dessert</SelectItem>
              <SelectItem value="Drinks">Drinks</SelectItem>
              <SelectItem value="Snacks">Snacks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      
      {filteredDishes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No dishes found. Add your first dish!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onEdit={handleEditDish}
              onToggleAvailability={handleToggleAvailability}
            />
          ))}
        </div>
      )}
      
      <AddDishForm
        open={isAddDishOpen}
        onOpenChange={setIsAddDishOpen}
        onSubmit={handleAddDish}
      />
    </div>
  );
}
