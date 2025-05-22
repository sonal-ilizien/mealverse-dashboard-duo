
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { PencilIcon, Clock, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DishCardProps {
  dish: {
    id: string;
    name: string;
    image: string;
    price: number;
    prepTime: string;
    category: string;
    isVegetarian: boolean;
    isAvailable: boolean;
  };
  onEdit: (id: string) => void;
  onToggleAvailability: (id: string, isAvailable: boolean) => void;
}

export function DishCard({ dish, onEdit, onToggleAvailability }: DishCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
      <div className="relative h-48">
        <img
          src={dish.image}
          alt={dish.name}
          className="h-full w-full object-cover"
        />
        <Badge
          className={`absolute top-2 right-2 ${
            dish.isVegetarian ? "bg-green-500" : "bg-orange-500"
          }`}
        >
          {dish.isVegetarian ? "Veg" : "Non-Veg"}
        </Badge>
        <Badge className="absolute bottom-2 left-2 bg-white/80 text-foreground">
          {dish.category}
        </Badge>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{dish.name}</h3>
          <span className="font-bold text-orange-600">${dish.price}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>{dish.prepTime}</span>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch 
            checked={dish.isAvailable}
            onCheckedChange={(checked) => onToggleAvailability(dish.id, checked)}
          />
          <span className={dish.isAvailable ? "text-green-600" : "text-muted-foreground"}>
            {dish.isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>
        <Button 
          size="sm" 
          variant="ghost" 
          className="p-2 h-8 w-8" 
          onClick={() => onEdit(dish.id)}
        >
          <PencilIcon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
