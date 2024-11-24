"use client";

import { useState } from "react";
import Link from "next/link";

const SettingsSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex font-prompt">
      {/* Sidebar for large screens */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-white text-black border">
        <div className="p-4 text-lg font-bold">Settings</div>
        <nav className="flex-grow">
          <Link href="/settings/profile">
            <span className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
              Profile
            </span>
          </Link>
          <Link href="/settings/privacy">
            <span className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
              Privacy
            </span>
          </Link>
          <Link href="/settings/experience">
            <span className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
              Experience
            </span>
          </Link>
          <Link href="/settings/password">
            <span className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
              Password
            </span>
          </Link>
        </nav>
      </div>

      {/* Sidebar for small screens */}
      <div className="md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-4 bg-white text-black focus:outline-none"
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
              strokeWidth={2}
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
              }
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute z-50 left-0 top-0 w-64 h-screen bg-white text-black">
            <button
              onClick={toggleSidebar}
              className="p-4 bg-white text-black focus:outline-none"
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <nav className="flex-grow">
              <Link href="/settings/account">
                <span className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Profile
                </span>
              </Link>
              <Link href="/settings/privacy">
                <span className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Privacy
                </span>
              </Link>
              <Link href="/settings/experience">
                <span className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Experience
                </span>
              </Link>
              <Link href="/settings/password">
                <span className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Password
                </span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsSidebar;
