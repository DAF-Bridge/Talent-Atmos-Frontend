import Link from "next/link";
import React from "react";

interface CompactNormalMenuProps {
  readonly label: string;
  readonly href: string;
}

export default function CompactNormalMenu({
  label,
  href,
}: CompactNormalMenuProps) {
  return (
    <Link href={href}>
      <div className="block text-gray-800 hover:bg-orange-dark hover:text-white transition-all duration-500 px-3 py-2 rounded-md font-medium border-b">
        {label}
      </div>
    </Link>
  );
}
