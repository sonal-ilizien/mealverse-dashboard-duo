
import React, { useState } from "react";
import { OrderCard } from "@/components/dashboard/OrderCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search, CalendarIcon } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { format } from "date-fns";

// Mock order data
const mockOrders = [
  {
    id: "order-123456",
    customer: "Jennifer Wilson",
    items: [
      { name: "Homemade Lasagna", quantity: 1, price: 12.99 },
      { name: "Greek Salad", quantity: 1, price: 8.99 }
    ],
    status: "New" as const,
    time: "Today, 1:30 PM",
    address: "123 Main St, Apt 4B, New York, NY 10001",
    total: 21.98,
  },
  {
    id: "order-123455",
    customer: "Michael Brown",
    items: [
      { name: "Chicken Tikka Masala", quantity: 2, price: 14.99 },
      { name: "Mango Smoothie", quantity: 1, price: 5.99 }
    ],
    status: "Cooking" as const,
    time: "Today, 12:15 PM",
    address: "456 Park Ave, Suite 301, New York, NY 10022",
    total: 35.97,
  },
  {
    id: "order-123454",
    customer: "Sarah Davis",
    items: [
      { name: "Chocolate Brownies", quantity: 3, price: 6.99 },
    ],
    status: "Ready" as const,
    time: "Today, 11:45 AM",
    address: "789 Broadway, New York, NY 10003",
    total: 20.97,
  },
  {
    id: "order-123453",
    customer: "James Johnson",
    items: [
      { name: "Avocado Toast", quantity: 2, price: 7.99 },
      { name: "Mango Smoothie", quantity: 2, price: 5.99 }
    ],
    status: "Delivered" as const,
    time: "Yesterday, 2:30 PM",
    address: "321 5th Ave, New York, NY 10016",
    total: 27.96,
  },
  {
    id: "order-123452",
    customer: "Emily Smith",
    items: [
      { name: "Homemade Lasagna", quantity: 1, price: 12.99 },
      { name: "Chocolate Brownies", quantity: 2, price: 6.99 }
    ],
    status: "Delivered" as const,
    time: "Yesterday, 1:15 PM",
    address: "876 Lexington Ave, New York, NY 10065",
    total: 26.97,
  },
];

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null);

  // Handle status change
  const handleStatusChange = (id: string, newStatus: typeof mockOrders[0]["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    
    toast.success(`Order ${id.substring(0, 6)} updated to ${newStatus}`);
  };

  // Handle view details
  const handleViewDetails = (id: string) => {
    const order = orders.find((o) => o.id === id);
    if (order) {
      setSelectedOrder(order);
    }
  };

  // Filter orders based on search term, status and date
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    const matchesDate = dateFilter ? order.time.toLowerCase().includes(dateFilter.toLowerCase()) : true;
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  // Group orders by status for display
  const ordersByStatus = {
    New: filteredOrders.filter(o => o.status === "New"),
    Cooking: filteredOrders.filter(o => o.status === "Cooking"),
    Ready: filteredOrders.filter(o => o.status === "Ready"),
    Delivered: filteredOrders.filter(o => o.status === "Delivered"),
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Today: {format(new Date(), "MMMM d, yyyy")}</span>
          <Badge variant="outline" className="bg-orange-100 text-orange-800 whitespace-nowrap">
            {ordersByStatus.New.length} new orders
          </Badge>
        </div>
      </section>
      
      <section className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer or order ID..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Cooking">Cooking</SelectItem>
              <SelectItem value="Ready">Ready</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Dates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Dates</SelectItem>
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="Yesterday">Yesterday</SelectItem>
              <SelectItem value="Last 7 days">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No orders found.</p>
        </div>
      ) : (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>
      )}
      
      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Order #{selectedOrder.id.substring(0, 6)}</p>
                  <h3 className="font-semibold">{selectedOrder.customer}</h3>
                </div>
                <Badge className={
                  selectedOrder.status === "New" ? "bg-blue-100 text-blue-800" :
                  selectedOrder.status === "Cooking" ? "bg-orange-100 text-orange-800" :
                  selectedOrder.status === "Ready" ? "bg-yellow-100 text-yellow-800" :
                  "bg-green-100 text-green-800"
                }>
                  {selectedOrder.status}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Delivery Information</h4>
                <p className="text-sm">{selectedOrder.time}</p>
                <p className="text-sm">{selectedOrder.address}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Missing imports
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
