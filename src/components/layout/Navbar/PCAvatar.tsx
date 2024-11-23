import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function PCAvatar() {
  const { isAuth, userProfile, loading } = useAuth();

  // Don't render anything until auth state is confirmed
  if (loading) {
    return (
      <div className="h-[40px] w-[40px] animate-pulse bg-gray-200 rounded-full" />
    );
  }
  // console.log(userProfile);
  return (
    <>
      {!isAuth ? (
        <>
          <Link href="/login">
            <div className="flex justify-center items-center w-[122px] h-[46px] font-normal px-4 py-2 border border-black text-black rounded-lg hover:text-orange-dark">
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
        <div className="h-[40px] w-[40px]">
          
          <Image
            className="object-cover h-full w-full rounded-full "
            src={userProfile?.pic_url ?? "/user-pic.jpg"}
            alt="user"
            width={100}
            height={100}
          />
        </div>
      )}
    </>
  );
}
