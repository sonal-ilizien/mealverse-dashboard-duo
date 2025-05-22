
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EarningsChart } from "@/components/charts/EarningsChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Download, ArrowUpRight, Clock } from "lucide-react";

// Mock earnings data
const mockEarningsData = {
  totalEarnings: "$3,542.80",
  pendingAmount: "$342.50",
  availableForWithdrawal: "$2,103.75",
  withdrawnAmount: "$1,096.55",
  platformFee: "10%",
  payoutHistory: [
    {
      id: "payout-1",
      amount: "$543.25",
      date: "Jul 15, 2023",
      status: "Completed",
    },
    {
      id: "payout-2",
      amount: "$298.75",
      date: "Jun 30, 2023",
      status: "Completed",
    },
    {
      id: "payout-3",
      amount: "$254.55",
      date: "Jun 15, 2023",
      status: "Completed",
    },
  ],
};

export default function Earnings() {
  const [timeRange, setTimeRange] = useState("monthly");

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Earnings</h1>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </section>
      
      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEarningsData.totalEarnings}</div>
            <p className="text-xs text-muted-foreground mt-1">
              After {mockEarningsData.platformFee} platform fee
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available for Withdrawal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEarningsData.availableForWithdrawal}</div>
            <Button size="sm" className="mt-2 bg-orange-500 hover:bg-orange-600">
              Withdraw
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEarningsData.pendingAmount}</div>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Will be available in 3-5 days</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Withdrawn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEarningsData.withdrawnAmount}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
      </section>
      
      {/* Earnings Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EarningsChart className="lg:col-span-2" />
        
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">Payout History</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                View All
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEarningsData.payoutHistory.map((payout, index) => (
                <div key={payout.id} className={index !== 0 ? "pt-4 border-t" : ""}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{payout.amount}</p>
                      <p className="text-xs text-muted-foreground">{payout.date}</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {payout.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Earnings Breakdown */}
      <section className="mt-8">
        <Card>
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">Earnings Breakdown</CardTitle>
              <Select defaultValue="monthly" onValueChange={setTimeRange} value={timeRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between py-2">
                <p className="font-medium">Gross Sales</p>
                <p className="font-medium">$3,936.44</p>
              </div>
              <div className="flex justify-between py-2 text-muted-foreground">
                <p>Platform Fee (10%)</p>
                <p>-$393.64</p>
              </div>
              <div className="flex justify-between py-2 text-muted-foreground">
                <p>Payment Processing Fee</p>
                <p>-$0.00</p>
              </div>
              <Separator />
              <div className="flex justify-between py-2 font-semibold">
                <p>Net Earnings</p>
                <p>$3,542.80</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
