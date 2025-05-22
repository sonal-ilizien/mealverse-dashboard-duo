
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChefHat, MapPin, ClockIcon } from "lucide-react";

type OrderStatus = "New" | "Cooking" | "Ready" | "Delivered";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderCardProps {
  order: {
    id: string;
    customer: string;
    items: OrderItem[];
    status: OrderStatus;
    time: string;
    address: string;
    total: number;
  };
  onStatusChange: (id: string, status: OrderStatus) => void;
  onViewDetails: (id: string) => void;
}

const statusColors = {
  New: "bg-blue-100 text-blue-800",
  Cooking: "bg-orange-100 text-orange-800",
  Ready: "bg-yellow-100 text-yellow-800",
  Delivered: "bg-green-100 text-green-800",
};

export function OrderCard({ order, onStatusChange, onViewDetails }: OrderCardProps) {
  const nextStatus = (): OrderStatus | null => {
    switch (order.status) {
      case "New": return "Cooking";
      case "Cooking": return "Ready";
      case "Ready": return "Delivered";
      default: return null;
    }
  };

  const next = nextStatus();
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Order #{order.id.substring(0, 6)}</p>
          <h3 className="font-semibold">{order.customer}</h3>
        </div>
        <Badge className={statusColors[order.status]}>
          {order.status}
        </Badge>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <ClockIcon className="h-4 w-4" />
          <span>{order.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{order.address}</span>
        </div>
        
        <Separator className="mb-3" />
        
        <div className="space-y-1">
          {order.items.slice(0, 2).map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          {order.items.length > 2 && (
            <p className="text-xs text-muted-foreground text-center">
              +{order.items.length - 2} more items
            </p>
          )}
        </div>
        
        <div className="flex justify-between mt-3 font-semibold">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-3">
        <Button variant="outline" size="sm" onClick={() => onViewDetails(order.id)}>
          Details
        </Button>
        
        {next && (
          <Button 
            size="sm"
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => onStatusChange(order.id, next)}
          >
            Mark as {next}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
