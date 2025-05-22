
import React, { useState } from "react";
import { ReviewCard } from "@/components/dashboard/ReviewCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search, Star } from "lucide-react";
import { toast } from "sonner";

// Mock review data
const mockReviews = [
  {
    id: "1",
    customer: {
      name: "Jennifer Wilson",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    rating: 5,
    date: "Today, 2:30 PM",
    comment: "Absolutely delicious! The lasagna was perfectly cooked and flavorful. Will order again!",
    dishName: "Homemade Lasagna",
    replied: false,
  },
  {
    id: "2",
    customer: {
      name: "Michael Brown",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    rating: 4,
    date: "Yesterday, 1:15 PM",
    comment: "Great taste but it arrived a bit cold. Otherwise perfect!",
    dishName: "Chicken Tikka Masala",
    replied: true,
  },
  {
    id: "3",
    customer: {
      name: "Sarah Davis",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    rating: 5,
    date: "Jul 12, 2023",
    comment: "These brownies are divine! So fudgy and delicious.",
    dishName: "Chocolate Brownies",
    replied: false,
  },
  {
    id: "4",
    customer: {
      name: "James Johnson",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    rating: 3,
    date: "Jul 10, 2023",
    comment: "The avocado toast was good but could use more seasoning.",
    dishName: "Avocado Toast",
    replied: false,
  },
  {
    id: "5",
    customer: {
      name: "Emily Smith",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    rating: 4,
    date: "Jul 5, 2023",
    comment: "Refreshing smoothie! Would recommend adding a bit more mango next time.",
    dishName: "Mango Smoothie",
    replied: true,
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  
  // For reply dialog
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState("");
  const [replyText, setReplyText] = useState("");

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  // Handle reply dialog open
  const handleOpenReply = (id: string) => {
    setSelectedReviewId(id);
    setReplyText("");
    setIsReplyOpen(true);
  };

  // Handle reply submission
  const handleSubmitReply = () => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply message");
      return;
    }
    
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === selectedReviewId ? { ...review, replied: true } : review
      )
    );
    
    setIsReplyOpen(false);
    toast.success("Reply sent successfully");
  };

  // Filter reviews based on search term and rating
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.comment.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          review.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.dishName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter ? review.rating === parseInt(ratingFilter) : true;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Reviews & Ratings</h1>
        <div className="bg-white px-3 py-2 rounded-md shadow-sm flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(parseFloat(averageRating))
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="font-semibold text-lg">{averageRating}</span>
          <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
        </div>
      </section>
      
      <section className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      
      {filteredReviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No reviews found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onReply={handleOpenReply}
            />
          ))}
        </div>
      )}
      
      {/* Reply Dialog */}
      <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reply to Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="reply" className="text-sm font-medium">
                Your Response
              </label>
              <Textarea
                id="reply"
                placeholder="Type your reply here..."
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReplyOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitReply}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
