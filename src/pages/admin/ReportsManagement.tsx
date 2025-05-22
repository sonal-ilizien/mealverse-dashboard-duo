
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample report data
const initialReports = [
  {
    id: "1",
    type: "meal",
    subject: "Seafood Paella",
    reporter: "Alex Johnson",
    reason: "Food safety concern",
    status: "open",
    date: "May 15, 2024",
    priority: "high"
  },
  {
    id: "2",
    type: "cook",
    subject: "Chef Maria",
    reporter: "Sam Thompson",
    reason: "Late delivery",
    status: "under review",
    date: "May 14, 2024",
    priority: "medium"
  },
  {
    id: "3",
    type: "user",
    subject: "User123",
    reporter: "Chef Roberto",
    reason: "Abusive behavior",
    status: "open",
    date: "May 12, 2024",
    priority: "high"
  },
  {
    id: "4",
    type: "meal",
    subject: "Chicken Curry",
    reporter: "Lisa Wong",
    reason: "Quality issue",
    status: "resolved",
    date: "May 10, 2024",
    priority: "low"
  },
  {
    id: "5",
    type: "order",
    subject: "Order #45678",
    reporter: "Chef Daniel",
    reason: "Payment dispute",
    status: "under review",
    date: "May 8, 2024",
    priority: "medium"
  },
];

const ReportsManagement = () => {
  const [reports, setReports] = useState(initialReports);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredReports = statusFilter === "all" 
    ? reports 
    : reports.filter(report => report.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-red-500">Open</Badge>;
      case "under review":
        return <Badge className="bg-amber-500">Under Review</Badge>;
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-blue-500">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "meal":
        return "Meal";
      case "cook":
        return "Cook";
      case "user":
        return "User";
      case "order":
        return "Order";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports & Flags</h1>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">All Reports</h2>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Filter Status:</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Reports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="under review">Under Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="capitalize">{getTypeLabel(report.type)}</TableCell>
                  <TableCell className="font-medium">{report.subject}</TableCell>
                  <TableCell>{report.reporter}</TableCell>
                  <TableCell>{report.reason}</TableCell>
                  <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>{report.date}</TableCell>
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

export default ReportsManagement;
