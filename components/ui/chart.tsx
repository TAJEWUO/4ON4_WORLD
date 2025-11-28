"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

type ChartProps = {
  data: any[];
  type?: "line" | "bar" | "area";
  dataKey: string;
  xKey: string;
  className?: string;
};

export function Chart({
  data,
  type = "line",
  dataKey,
  xKey,
  className,
}: ChartProps) {
  const ChartComponent =
    type === "bar" ? BarChart : type === "area" ? AreaChart : LineChart;

  return (
    <div className={cn("w-full h-64", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          {type === "line" && (
            <Line type="monotone" dataKey={dataKey} stroke="currentColor" dot={false} />
          )}
          {type === "bar" && (
            <Bar dataKey={dataKey} fill="currentColor" />
          )}
          {type === "area" && (
            <Area type="monotone" dataKey={dataKey} fill="currentColor" stroke="currentColor" />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border bg-background px-3 py-2 shadow-sm">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm">{payload[0].value}</p>
    </div>
  );
}
