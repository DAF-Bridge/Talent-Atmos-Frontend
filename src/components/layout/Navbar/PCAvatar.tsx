import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DropDownMenu from "./DropDownMenu";
import Image from "next/image";

export default function PCAvatar() {
  const { isAuth, userProfile, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Move the click handler setup to a separate effect that depends on isAuth
  useEffect(() => {
    // Only set up click handler if authenticated and dropdown exists
    if (!loading && isAuth) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          event.target instanceof Node &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isAuth, loading]); // Add isAuth and loading to dependencies

  // Reset dropdown state when auth state changes
  useEffect(() => {
    setIsOpen(false);
  }, [isAuth]);

  // Show loading state
  if (loading) {
    return (
      <div className="h-[40px] w-[40px] animate-pulse bg-gray-200 rounded-full" />
    );
  }

  return (
    <>
      {!isAuth ? (
        <>
          <Link href="/login">
            <div
              className="flex justify-center items-center w-[122px] h-[46px] font-normal 
            px-4 py-2 border border-black text-black rounded-lg hover:text-orange-dark"
            >
              เข้าสู่ระบบ
            </div>
          </Link>
          <Link href="/signup">
            <div
              className="flex justify-center items-center w-[122px] h-[46px] 
                  font-light px-4 py-2 bg-orange-normal text-white rounded-lg 
                  hover:bg-orange-dark"
            >
              สมัครสมาชิก
            </div>
          </Link>
        </>
      ) : (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="h-[40px] w-[40px] rounded-full overflow-hidden"
          >
            {userProfile?.pic_url && userProfile.pic_url.trim() !== "" ? (
              <Image
                className="object-cover h-full w-full"
                src={userProfile?.pic_url}
                alt="user"
                width={100}
                height={100}
              />
            ) : (
              <div className="flex justify-center items-center h-full w-full bg-slate-200">
                {userProfile?.fname[0] + "" + userProfile?.lname[0]}
              </div>
            )}
          </button>

          {isOpen && (
            <div
              className="absolute mt-[10px] flex flex-col gap-2  border w-[208px] 
            right-0 top-[40px] bg-white rounded-lg py-4 shadow-lg"
            >
              <DropDownMenu />
            </div>
          )}
        </div>
      )}
    </>
  );
}
