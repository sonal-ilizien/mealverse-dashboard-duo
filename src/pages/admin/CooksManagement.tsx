
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Star, CheckCircle, XCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock cook data
const mockCooks = [
  {
    id: "cook-001",
    name: "Chef Alex Johnson",
    email: "alex.j@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://i.pravatar.cc/150?img=20",
    status: "Approved" as const,
    rating: 4.8,
    specialties: ["Italian", "Mediterranean"],
    joinDate: "May 10, 2023",
    bio: "Professional chef with over 10 years of experience in Italian cuisine."
  },
  {
    id: "cook-002",
    name: "Maria Garcia",
    email: "maria.g@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://i.pravatar.cc/150?img=21",
    status: "Approved" as const,
    rating: 4.9,
    specialties: ["Mexican", "Spanish"],
    joinDate: "Jun 15, 2023",
    bio: "Home cook specializing in authentic Mexican recipes passed down through generations."
  },
  {
    id: "cook-003",
    name: "David Lee",
    email: "david.l@example.com",
    phone: "+1 (555) 345-6789",
    avatar: "https://i.pravatar.cc/150?img=22",
    status: "Pending" as const,
    rating: 0,
    specialties: ["Korean", "Japanese"],
    joinDate: "Jul 22, 2023",
    bio: "Trained in Seoul, specializing in modern Korean cuisine with traditional influences."
  },
  {
    id: "cook-004",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "https://i.pravatar.cc/150?img=23",
    status: "Pending" as const,
    rating: 0,
    specialties: ["Desserts", "Pastries"],
    joinDate: "Aug 5, 2023",
    bio: "Pastry chef focusing on gluten-free and vegan dessert options that don't compromise on taste."
  },
  {
    id: "cook-005",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 567-8901",
    avatar: "https://i.pravatar.cc/150?img=24",
    status: "Rejected" as const,
    rating: 0,
    specialties: ["American", "BBQ"],
    joinDate: "Aug 12, 2023",
    bio: "BBQ enthusiast with competition experience, specializing in slow-cooked meats and homemade sauces."
  },
  {
    id: "cook-006",
    name: "Jennifer Davis",
    email: "jennifer.d@example.com",
    phone: "+1 (555) 678-9012",
    avatar: "https://i.pravatar.cc/150?img=25",
    status: "Approved" as const,
    rating: 4.6,
    specialties: ["Indian", "Thai"],
    joinDate: "Sep 3, 2023",
    bio: "Chef specializing in spice blends and aromatic dishes from across South Asia."
  },
];

type CookStatus = "Approved" | "Pending" | "Rejected";

export default function CooksManagement() {
  const [cooks, setCooks] = useState(mockCooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCook, setSelectedCook] = useState<(typeof mockCooks)[0] | null>(null);
  
  // Handle status change
  const handleStatusChange = (id: string, newStatus: CookStatus) => {
    setCooks((prevCooks) =>
      prevCooks.map((cook) =>
        cook.id === id ? { ...cook, status: newStatus } : cook
      )
    );
    toast.success(`Cook status updated to ${newStatus}`);
  };
  
  // Handle view profile
  const handleViewProfile = (id: string) => {
    const cook = cooks.find(c => c.id === id);
    if (cook) {
      setSelectedCook(cook);
    }
  };
  
  // Filter cooks based on search term and status
  const filteredCooks = cooks.filter((cook) => {
    const matchesSearch = 
      cook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cook.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cook.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" ? true : cook.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Cooks Management</h1>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cook</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCooks.map((cook) => (
              <TableRow key={cook.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <img src={cook.avatar} alt={cook.name} />
                    </Avatar>
                    <div>
                      <p className="font-medium">{cook.name}</p>
                      <p className="text-xs text-muted-foreground">Joined: {cook.joinDate}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p>{cook.email}</p>
                    <p className="text-sm text-muted-foreground">{cook.phone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={
                      cook.status === "Approved" ? "bg-green-100 text-green-800" :
                      cook.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }
                  >
                    {cook.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {cook.rating > 0 ? (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{cook.rating}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewProfile(cook.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    
                    {cook.status === "Pending" && (
                      <>
                        <Button 
                          size="sm" 
                          variant="default"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusChange(cook.id, "Approved")}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleStatusChange(cook.id, "Rejected")}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Cook Profile Dialog */}
      <Dialog open={!!selectedCook} onOpenChange={(open) => !open && setSelectedCook(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Cook Profile</DialogTitle>
          </DialogHeader>
          
          {selectedCook && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <Avatar className="h-24 w-24">
                  <img src={selectedCook.avatar} alt={selectedCook.name} className="object-cover" />
                </Avatar>
                
                <div className="space-y-2 text-center sm:text-left">
                  <h2 className="text-xl font-semibold">{selectedCook.name}</h2>
                  
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {selectedCook.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">{specialty}</Badge>
                    ))}
                  </div>
                  
                  <p className="text-sm">{selectedCook.bio}</p>
                  
                  <div className="pt-2">
                    <Badge 
                      className={
                        selectedCook.status === "Approved" ? "bg-green-100 text-green-800" :
                        selectedCook.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }
                    >
                      {selectedCook.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedCook.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{selectedCook.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p>{selectedCook.joinDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <div className="flex items-center">
                    {selectedCook.rating > 0 ? (
                      <>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{selectedCook.rating}</span>
                      </>
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedCook.status === "Pending" && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="default"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleStatusChange(selectedCook.id, "Approved");
                      setSelectedCook(null);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      handleStatusChange(selectedCook.id, "Rejected");
                      setSelectedCook(null);
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
