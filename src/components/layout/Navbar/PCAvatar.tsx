import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Building2,
  CircleUserRound,
  LogOut,
  Settings,
  Ticket,
} from "lucide-react";

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
            className="h-[40px] w-[40px]"
          >
            <Image
              className="object-cover h-full w-full rounded-full "
              src={
                userProfile?.pic_url && userProfile.pic_url.trim() !== ""
                  ? userProfile.pic_url
                  : "/user-pic.jpg"
              }
              alt="user"
              width={100}
              height={100}
            />
          </button>

          {isOpen && (
            <div
              className="absolute mt-[10px] flex flex-col gap-2  border w-[208px] 
            right-0 top-[40px] bg-white rounded-lg py-4 shadow-lg"
            >
              <div className="flex gap-1 ">
                <div className="flex flex-col gap-[5px] w-full">
                  <div className="flex justify-start items-center gap-1 pl-[20px]">
                    <Ticket className="h-[18px] text-gray-inactive " />
                    <span className="text-xs font-light text-gray-inactive">
                      อีเว้นท์
                    </span>
                  </div>
                  <div className="flex flex-col w-full">
                    <Link href={"/myreg-order"} className={btnStyleVariant1}>
                      คำสั่งซื้อ
                    </Link>
                    <Link href={"/myreg-ticket"} className={btnStyleVariant1}>
                      ตั๋วของฉัน
                    </Link>
                    <Link href={"/myreg-project"} className={btnStyleVariant1}>
                      โครงการที่เข้าร่วม
                    </Link>
                  </div>
                </div>
              </div>
              <div className="border-b"></div>
              <div className="flex gap-1 ">
                <div className="flex flex-col gap-[5px] w-full">
                  <div className="flex justify-start items-center gap-1 pl-[20px]">
                    <Building2 className="h-[18px] text-gray-inactive " />
                    <span className="text-xs font-light text-gray-inactive">
                      องค์กร
                    </span>
                  </div>
                  <div className="flex flex-col w-full">
                    <Link href={"/myreg-org"} className={btnStyleVariant1}>
                      องค์กรของฉัน
                    </Link>
                    <Link
                      href={"/myreg-org-status"}
                      className={btnStyleVariant1}
                    >
                      สถานะเข้าร่วมองค์กร
                    </Link>
                  </div>
                </div>
              </div>
              <div className="border-b"></div>
              <div className="flex flex-col ">
                <Link href={"/profile"} className={btnStyleVariant2}>
                  <>
                    <CircleUserRound className="h-[18px]" />
                    <span className="text-base font-normal">โปรไฟล์</span>
                  </>
                </Link>
                <Link href={"/setting"} className={btnStyleVariant2}>
                  <>
                    <Settings className="h-[18px]" />
                    <span className="text-base font-normal">ตั้งค่าบัญชี</span>
                  </>
                </Link>
                <Link href={"/logout"} className={btnStyleVariant2}>
                  <>
                    <LogOut className="h-[18px]" />
                    <span className="text-base font-normal">ออกจากระบบ</span>
                  </>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

const btnStyleVariant1 =
  "text-base font-normal py-2 hover:bg-gray-100 transition-all duration-150 pl-[47px]";
const btnStyleVariant2 =
  "flex gap-1 justify-start items-center py-2 hover:bg-gray-100 transition-all duration-150 pl-[20px]";
