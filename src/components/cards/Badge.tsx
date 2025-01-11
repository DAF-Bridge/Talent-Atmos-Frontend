import { cn } from "@/lib/utils";
import React from "react";

export default function Badge({
  label,
  className,
}: Readonly<{ label: string; className?: string }>) {
  return (
    <div
      className={cn(
        "flex justify-center items-center text-gray-800 text-[12px] rounded-full px-[9px] py-[1px] bg-[#e2e8f0]",
        className
      )}
    >
      {label}
    </div>
  );
}
