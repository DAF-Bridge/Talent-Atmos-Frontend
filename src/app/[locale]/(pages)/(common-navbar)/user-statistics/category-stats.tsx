"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CategoryStatsProps {
  categories: {
    label: string;
    amount: number;
  }[];
}

export function CategoryStats({ categories }: Readonly<CategoryStatsProps>) {
  // Calculate total amount for percentage
  const totalAmount = categories.reduce(
    (sum, category) => sum + category.amount,
    0
  );

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category.label} className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">{category.label}</span>
            <span className="text-muted-foreground">
              {category.amount} ครั้ง
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Progress
              value={(category.amount / totalAmount) * 100}
              className={`h-2`}
            />
            <span className="text-xs text-muted-foreground w-12 text-right">
              {Math.round((category.amount / totalAmount) * 100)}%
            </span>
          </div>
        </div>
      ))}

      <div className="pt-4">
        <Card className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={`legend-${category.label}`}
                className="flex items-center gap-2"
              >
                {/* <div className={`h-3 w-3 rounded-full ${category.color}`} /> */}
                <span className="text-sm">{category.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
