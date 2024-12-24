import React from "react";

export default function Badge({ label }: Readonly<{ label: string }>) {
  return (
    <div className="bg-slate-200 text-gray-800 text-[12px] rounded-full px-[9px] py-[1px]">
      {label}
    </div>
  );
}
