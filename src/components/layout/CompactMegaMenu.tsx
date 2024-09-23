import Link from "next/link";
import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

interface SubLabelProps {
  label: string;
  href: string;
  src: string;
}

interface CompactMegaMenuProps {
  label: string;
  subLabel: SubLabelProps[];
}

export default function CompactMegaMenu({
  label,
  subLabel,
}: CompactMegaMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button className="w-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className=" text-gray-800 px-3 py-2 flex justify-between items-center font-medium border-b">
          {label}
          <IoChevronDown
            className={`ml-2 text-orange-dark transition-all duration-300 ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {isMenuOpen && (
        <div className="mt-2 w-full bg-white transition-transform duration-300 ease-in-out">
          <div className="pl-10 py-2 flex flex-col gap-5 ">
            {subLabel.map((item, k) => (
              <Link href={item.href} className="block hover:text-orange-dark">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
