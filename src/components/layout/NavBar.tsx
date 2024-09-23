"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MegaMenu from "./MegaMenu";
import NormalMenu from "./NormalMenu";

export default function NavigationBar() {
  const menuItems= [
    {
      label: "อีเว้นท์",
      subColor: "FFFFFF",
      subLabel: [
        { label: "เศรษฐกิจ", href: "/event-econ" },
        { label: "สังคม", href: "/event-soc" },
        { label: "สิ่งแวดล้อม", href: "/event-envi" },
      ],
      isMega: true,
    },
    {
      label: "องค์กร",
      subColor: "FFF5E9",
      subLabel: [
        { label: "เศรษฐกิจ", href: "/org-econ" },
        { label: "สังคม", href: "/org-soc" },
        { label: "สิ่งแวดล้อม", href: "/org-envi" },
      ],
      isMega: true,
    },
    { label: "จัดการตั๋ว", href: "/my-ticket", isMega: false },
  ];
  const [isMiniMenuOpen, setisMiniMenuOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md font-prompt">
      <div className="max-w-[1154px] mx-auto px-4">
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
                    <MegaMenu label={item.label} subLabel={item.subLabel} subColor={item.subColor}/>
                  ) : (
                    <NormalMenu label={item.label} href={item.href} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Login/Signup Button */}
          <div className="hidden md:flex md:items-center space-x-4 ">
            <Link href="/login">
              <div className="flex justify-center items-center w-[122px] h-[46px] font-normal px-4 py-2 border border-black text-black rounded-lg hover:text-orange-dark">
                เข้าสู่ระบบ
              </div>
            </Link>
            <Link href="/signup">
              <div className="flex justify-center items-center w-[122px] h-[46px] font-light px-4 py-2 bg-orange-normal text-white rounded-lg hover:bg-orange-dark">
                สมัครสมาชิก
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setisMiniMenuOpen(!isMiniMenuOpen)}
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/events">
              <div className="block text-gray-800 hover:text-orange-dark px-3 py-2 rounded-md">
                Events
              </div>
            </Link>
            <Link href="/organization">
              <div className="block text-gray-800 hover:text-orange-dark px-3 py-2 rounded-md">
                Organization
              </div>
            </Link>
            <Link href="/tickets">
              <div className="block text-gray-800 hover:text-orange-dark px-3 py-2 rounded-md">
                Tickets
              </div>
            </Link>
            <Link href="/login">
              <div className="block text-gray-800 hover:text-orange-dark px-3 py-2 rounded-md">
                Login
              </div>
            </Link>
            <Link href="/signup">
              <div className="block text-gray-800 hover:text-orange-dark px-3 py-2 rounded-md">
                Sign Up
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
