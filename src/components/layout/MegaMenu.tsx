"use client";

import React, { useState } from "react";
import DropDownMenu from "./DropDownMenu";
import { IoChevronDown } from "react-icons/io5";

interface SubLabelProps {
  label: string;
  href: string;
}

interface MegaMenuProps {
  label: string;
  subLabel: SubLabelProps[];
  subColor: string;
}

export default function MegaMenu({ label, subLabel, subColor }: MegaMenuProps) {
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  return (
    <>
      {/* Menu + mega menu */}
      <button
        className="flex items-center gap-1 group h-full"
        onMouseEnter={() => setIsMegaOpen(true)}
        onMouseLeave={() => setIsMegaOpen(false)}
        onClick={() => setIsMegaOpen(!isMegaOpen)}
      >
        <div className="text-gray-800">
          <div className="group-hover:text-orange-dark">{label}</div>
          <DropDownMenu
            label={label}
            isActive={isMegaOpen}
            subLabel={subLabel}
            subColor={subColor}
          />
        </div>
        <IoChevronDown
          className={`text-orange-dark transition duration-300 ${
            isMegaOpen && "rotate-180"
          }`}
        />
      </button>
    </>
  );
}
