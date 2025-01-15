"use client";

import React from "react";

export default function RegBtn({ url }: Readonly<{ url: string }>) {
  return (
    <button
      onClick={() => {
        window.open(url, "_blank");
      }}
      className="border items-center justify-center flex rounded-[10px] h-[40px] 
      hover:bg-slate-50 hover:drop-shadow-md transition-all duration-150"
    >
      ไปที่ฟอร์ม
    </button>
  );
}
