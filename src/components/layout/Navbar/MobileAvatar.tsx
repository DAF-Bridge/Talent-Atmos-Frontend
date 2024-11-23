import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function MobileAvatar() {
  const { isAuth, userProfile, loading } = useAuth();

  // Don't render anything until auth state is confirmed
  if (loading) {
    return (
      <div className="h-[50px] w-[50px] animate-pulse bg-gray-200 rounded-full" />
    );
  }

  return (
    <>
      {!isAuth ? (
        <>
          <Link href="/login">
            <div
              className="
                    flex h-[42px] justify-center items-center text-gray-800 font-normal border-black 
                    hover:text-orange-dark rounded-full border transition-all duration-200"
            >
              เข้าสู่ระบบ
            </div>
          </Link>
          <Link href="/signup">
            <div
              className="flex h-[42px] justify-center items-center text-white bg-orange-normal 
                    hover:bg-orange-dark rounded-full border transition-all duration-200"
            >
              สมัครสมาชิก
            </div>
          </Link>
        </>
      ) : (
        <div className="flex justify-center items-center gap-[3%]">
          <div
            style={{ aspectRatio: "1 / 1" }}
            className="flex gap-2 h-[40px] w-[40px]"
          >
            <Image
              className="object-cover h-full w-full rounded-full "
              src={userProfile?.pic_url ?? "/user-pic.jpg"}
              alt="user"
              width={100}
              height={100}
            />
          </div>
          <div className="bg-red-500 w-full">
            <p>{userProfile?.fname + " " + userProfile?.lname}</p>
          </div>
        </div>
      )}
    </>
  );
}
