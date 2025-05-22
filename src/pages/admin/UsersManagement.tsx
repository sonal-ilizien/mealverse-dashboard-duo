
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
import { Search, UserPlus, UserX } from "lucide-react";

// Sample user data
const initialUsers = [
  { 
    id: "1", 
    name: "Sarah Johnson", 
    email: "sarah.j@example.com", 
    status: "active", 
    role: "customer",
    joined: "April 12, 2023"
  },
  { 
    id: "2", 
    name: "Michael Chen", 
    email: "michael.c@example.com", 
    status: "active", 
    role: "customer",
    joined: "May 3, 2023"
  },
  { 
    id: "3", 
    name: "Emma Williams", 
    email: "emma.w@example.com", 
    status: "suspended", 
    role: "customer",
    joined: "March 22, 2023"
  },
  { 
    id: "4", 
    name: "James Brown", 
    email: "james.b@example.com", 
    status: "active", 
    role: "customer",
    joined: "June 15, 2023"
  },
  { 
    id: "5", 
    name: "Olivia Martinez", 
    email: "olivia.m@example.com", 
    status: "inactive", 
    role: "customer",
    joined: "February 8, 2023"
  },
];

const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(initialUsers);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <UserX className="mr-2 h-4 w-4" />
            Suspend User
          </Button>
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
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
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
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

export default UsersManagement;
