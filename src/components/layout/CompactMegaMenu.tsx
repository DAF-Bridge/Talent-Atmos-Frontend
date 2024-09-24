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
        <div
          className={`${
            isMenuOpen
              ? "bg-orange-dark/60 text-white"
              : "bg-white text-gray-800"
          }  px-3 py-2 flex justify-between items-center font-medium border-b`}
        >
          {label}
          <IoChevronDown
            className={`${isMenuOpen ? "text-white" : ""} ml-2 text-black transition-all duration-100 ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {isMenuOpen && (
        <div className="mt-2 w-full bg-white transition-transform duration-100 ease-in-out">
          <div className="pl-10 py-2 flex flex-col gap-5 ">
            {subLabel.map((item, k) => (
              <Link
                key={k}
                href={item.href}
                className="block hover:text-orange-dark"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
