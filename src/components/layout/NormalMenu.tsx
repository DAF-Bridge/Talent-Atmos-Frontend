import Link from "next/link";
import React from "react";

interface NormalMenuProps {
  label: string;
  href: string;
}

export default function NormalMenu({ label, href }: NormalMenuProps) {
  return (
    <>
      <Link href={href} className="text-gray-800 hover:text-orange-dark">{label}</Link>
    </>
  );
}
