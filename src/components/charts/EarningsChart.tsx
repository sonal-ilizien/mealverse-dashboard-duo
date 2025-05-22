
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

const earningsData = [
  { name: "Jan", earnings: 1200 },
  { name: "Feb", earnings: 1800 },
  { name: "Mar", earnings: 1500 },
  { name: "Apr", earnings: 2000 },
  { name: "May", earnings: 2400 },
  { name: "Jun", earnings: 2200 },
  { name: "Jul", earnings: 2700 },
];

interface EarningsChartProps {
  className?: string;
}

export function EarningsChart({ className }: EarningsChartProps) {
  const isMobile = useIsMobile();
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="text-base font-medium">Earnings Over Time</CardTitle>
        <select className="text-sm bg-transparent border rounded px-2 py-1">
          <option>Last 7 months</option>
          <option>Last 12 months</option>
          <option>Last 30 days</option>
        </select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
          <LineChart
            data={earningsData}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={50}
            />
            <Tooltip
              formatter={(value: number) => [`$${value}`, "Earnings"]}
              contentStyle={{
                borderRadius: "0.375rem",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                padding: "8px 12px",
                border: "none",
              }}
            />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#fd8c58"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, stroke: "#fd8c58", strokeWidth: 2, fill: "white" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
