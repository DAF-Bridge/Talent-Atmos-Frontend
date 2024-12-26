import React from "react";

export default function Badge({
  label,
  color = "#e2e8f0",
}: Readonly<{ label: string; color?: string }>) {
  return (
    <div
      style={{ backgroundColor: color }}
      className={`text-gray-800 text-[12px] rounded-full px-[9px] py-[1px]`}
    >
      {label}
    </div>
  );
}
