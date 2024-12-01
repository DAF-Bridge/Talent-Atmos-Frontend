"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MegaMenu from "../MegaMenu";
import NormalMenu from "../NormalMenu";
import CompactMegaMenu from "../CompactMegaMenu";
import CompactNormalMenu from "../CompactNormalMenu";
import AvatarProfile from "./PCAvatar";
import MobileAvatar from "./MobileAvatar";

export default function NavigationBar() {
  const menuItems = [
    {
      label: "อีเว้นท์",
      subMenuName: "หัวข้อกิจกรรม",
      href: "/events",
      subLabel: [
        {
          label: "ธุรกิจ & เศรษฐกิจ",
          href: "/event/econ",
          src: "menu-icon/event-econ.svg",
        },
        {
          label: "สิ่งแวดล้อม",
          href: "/event/envi",
          src: "menu-icon/event-envi.svg",
        },
        {
          label: "พัฒนาสัมคม",
          href: "/event/soc",
          src: "menu-icon/event-soc.svg",
        },
      ],
      isMega: false,
    },
    {
      label: "องค์กร",
      subMenuName: "ประเภทองค์กร",
      href: "/orgs",
      subLabel: [
        {
          label: "องค์กรด้านเศรษฐกิจ",
          href: "/org/econ",
          src: "menu-icon/org-econ.svg",
        },
        {
          label: "องค์กรด้านสิ่งแวดล้อม",
          href: "/org/envi",
          src: "menu-icon/org-envi.svg",
        },
        {
          label: "องค์กรด้านสัมคม",
          href: "/org/soc",
          src: "menu-icon/org-soc.svg",
        },
      ],
      isMega: false,
    },
    { label: "แผนที่", href: "/map", isMega: false },
  ];
  const [isMiniMenuOpen, setIsMiniMenuOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md font-prompt sticky top-0 z-50">
      <div className="max-w-[1170px] mx-auto px-10">
        <div className="flex justify-between h-[65px]">
          <div className="flex gap-[42px] ">
            {/* Logo */}
            <div className="flex-shrink-0 flex justify-center items-center">
              <Link href="/">
                <Image src="/logo.svg" alt="Logo" width={102} height={42} />
              </Link>
            </div>

            {/* Menu */}
            <div className="hidden md:flex space-x-[38px] items-center">
              {menuItems.map((item, k) => (
                <div key={k} className="h-full flex items-center">
                  {item.isMega ? (
                    <MegaMenu
                      label={item.label}
                      subLabel={item.subLabel ?? []}
                      subMenuName={item.subMenuName ?? ""}
                    />
                  ) : (
                    <NormalMenu label={item.label} href={item.href ?? ""} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Login/Signup Button */}
          <div className="hidden md:flex md:items-center space-x-4 ">
            <AvatarProfile />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMiniMenuOpen(!isMiniMenuOpen)}
              className="text-gray-800 hover:text-orange-dark focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMiniMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMiniMenuOpen && (
        <div className="md:hidden ">
          <div className="px-2 pt-2 pb-3 space-y-1 mt-[-2px] w-full bg-white absolute shadow-md">
            {menuItems.map((item, k) => (
              <div key={k}>
                {item.isMega ? (
                  <CompactMegaMenu
                    label={item.label}
                    subLabel={item.subLabel ?? []}
                  />
                ) : (
                  <CompactNormalMenu
                    label={item.label}
                    href={item.href ?? ""}
                  />
                )}
              </div>
            ))}
            <div className="flex flex-col gap-3 px-3 py-2">
              <MobileAvatar/>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}