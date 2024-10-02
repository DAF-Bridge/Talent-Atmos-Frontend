import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SubLabelProps {
  label: string;
  href: string;
  src: string;
}

interface DropDownMenuProps {
  label: string;
  isActive: boolean;
  subLabel: SubLabelProps[];
  subMenuName: string;
}

export default function DropDownMenu({
  label,
  isActive,
  subLabel,
  subMenuName,
}: DropDownMenuProps) {
  return (
    <div
      className={`absolute  top-[65px] left-0 w-full transition-all shadow-md duration-200 hover:cursor-default
      ${isActive ? "opacity-100 visible h-[260px] z-10" : "invisible opacity-0 h-0 -z-10"}
      ${label === "องค์กร" ? "bg-[#FFF5E9]" : "bg-white"}
      `}
    >
      <div
        className={`flex items-start max-w-[1122px] pt-[18px] mx-auto px-[50px] font-semibold text-xl transition-all duration-200
          ${isActive ? "translate-x-0" : "translate-x-[-50px]"}
          `}
      >
        {subMenuName}
      </div>
      <div className={`flex justify-center items-center gap-[5%] px-40 pb-5`}>
        {subLabel.map((item, k) => (
          <div key={k} className="flex flex-col">
            <Link
              href={item.href}
              className={`text-gray-800 hover:text-orange-dark whitespace-nowrap font-medium`}
            >
              <div className="w-[167px] h-[167px] ">
                <Image
                  src={item.src}
                  width={167}
                  height={167}
                  alt={"menu-icon"}
                  className="object-contain"
                />
              </div>
              <div>{item.label}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
