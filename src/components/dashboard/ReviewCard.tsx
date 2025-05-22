
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare } from "lucide-react";

interface ReviewCardProps {
  review: {
    id: string;
    customer: {
      name: string;
      avatar: string;
    };
    rating: number;
    date: string;
    comment: string;
    dishName: string;
    replied: boolean;
  };
  onReply: (id: string) => void;
}

export function ReviewCard({ review, onReply }: ReviewCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2 pt-4 flex flex-row justify-between items-start">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <img src={review.customer.avatar} alt={review.customer.name} />
          </Avatar>
          <div>
            <h3 className="font-medium">{review.customer.name}</h3>
            <p className="text-xs text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${
                i < review.rating 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "text-gray-200"
              }`}
            />
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <Badge variant="outline" className="mb-2">
          {review.dishName}
        </Badge>
        <p className="text-sm">{review.comment}</p>
      </CardContent>
      
      <CardFooter className="pt-3 flex justify-end">
        {!review.replied && (
          <Button 
            size="sm" 
            variant="ghost"
            className="text-muted-foreground"
            onClick={() => onReply(review.id)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Reply
          </Button>
        )}
        {review.replied && (
          <Badge variant="secondary">Replied</Badge>
        )}
      </CardFooter>
    </Card>
  );
}
