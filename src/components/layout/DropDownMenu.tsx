import Link from "next/link";
import React from "react";

interface SubLabelProps {
  label: string;
  href: string;
}

interface DropDownMenuProps {
  label: string;
  isActive: boolean;
  subLabel: SubLabelProps[];
  subColor: string;
}

export default function DropDownMenu({
  isActive,
  subLabel,
  subColor
}: DropDownMenuProps) {
  return (
    <div
      className={`absolute top-[65px] left-0 w-full transition-all duration-500 ${
        isActive ? "opacity-100 visible h-[230px]" : "invisible opacity-0 h-0"
      }`}
    >
      <div className={`flex justify-center items-center gap-[200px] px-40 py-10 bg-[#${subColor}] shadow-md h-full`}>
        {subLabel.map((item, k) => (
          <Link
            key={k}
            href={item.href}
            className="text-gray-800 hover:text-orange-dark"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
