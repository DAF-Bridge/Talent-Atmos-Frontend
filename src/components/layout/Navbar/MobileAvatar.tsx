import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DropDownMenu from "./DropDownMenu";
import Image from "next/image";

export default function MobileAvatar() {
  const { isAuth, userProfile, loading } = useAuth();

  // Don't render anything until auth state is confirmed
  if (loading) {
    return (
      <div className="h-[40px] w-[40px] animate-pulse bg-gray-200 rounded-full" />
    );
  }

  return (
    <>
      {!isAuth ? (
        <div className="flex flex-col gap-2 mt-4 mb-2">
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
        </div>
      ) : (
        <Accordion type="multiple" className="w-full">
          <AccordionItem className="px-3" value={`item-${1}`}>
            <AccordionTrigger className="hover:no-underline py-[10px]">
              <div className="flex justify-center items-center w-full gap-2">
                <div
                  style={{ aspectRatio: "1 / 1" }}
                  className="shrink-0 h-[40px] w-[40px] rounded-full overflow-hidden"
                >
                  {userProfile?.pic_url && userProfile.pic_url.trim() !== "" ? (
                    <Image
                      className="object-cover h-full w-full rounded-full"
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
                </div>
                <div className="w-full text-left">
                  <p>{userProfile?.fname + " " + userProfile?.lname}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1 w-full bg-white">
                <DropDownMenu />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
}
