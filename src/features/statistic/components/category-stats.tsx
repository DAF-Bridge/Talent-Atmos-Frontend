"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CategoryStatsProps {
  CategoryData: {
    amount: number;
    category: { value: number; label: string };
  }[];
}

export function CategoryStats({ CategoryData }: Readonly<CategoryStatsProps>) {
  // Calculate total amount for percentage
  const totalAmount = CategoryData.reduce(
    (sum, category) => sum + category.amount,
    0
  );

  // Sort data by amount in descending order
  const sortedData = [...CategoryData].sort((a, b) => b.amount - a.amount);

  // Define medal/rank colors
  const rankColors = [
    "bg-yellow-400", // 1st place - Gold
    "bg-gray-300", // 2nd place - Silver
    "bg-amber-600", // 3rd place - Bronze
    "bg-blue-500", // 4th place
    "bg-green-500", // 5th place
    "bg-purple-500", // 6th place
    "bg-red-500", // 7th place
    "bg-teal-500", // 8th place
    "bg-pink-500", // 9th place
    "bg-gray-500", // 10th place and beyond
  ];

  return (
    <div className="space-y-6">
      {sortedData.map((x, index) => (
        <div key={x.category.label} className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium capitalize">{x.category.label}</span>
            <span className="text-muted-foreground">{x.amount} ครั้ง</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress
              value={(x.amount / totalAmount) * 100}
              className={cn("h-2", rankColors[index])}
            />
            <span className="text-xs text-muted-foreground w-12 text-right">
              {Math.round((x.amount / totalAmount) * 100)}%
            </span>
          </div>
        </div>
      ))}

      <div className="pt-4">
        <Card className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {sortedData.map((x, index) => (
              <div
                key={`legend-${x.category.label}`}
                className="flex items-center gap-2"
              >
                <div className={`h-3 w-3 rounded-full ${rankColors[index]}`} />
                <span className="text-sm capitalize">{x.category.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
