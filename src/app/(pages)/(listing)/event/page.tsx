import EventCard from "@/components/cards/EventCard";
import { Search, SlidersHorizontal } from "lucide-react";
import React from "react";

export default function EventListing() {
  return (
    <div className="font-prompt lg:w-[90%] xl:w-[80%] mx-auto px-10">
      <p className="text-[32px] text-center font-semibold mt-[22px]">
        ค้นหา <span className="text-orange-normal">&quot;อีเว้นท์&quot;</span>{" "}
        ที่ตอบโจทย์
      </p>
      <div className="border-[1.5px] mt-[26px] border-gray-stroke/70" />
      <div className="flex justify-between items-center gap-5 w-full mt-[25px] ">
        <div className="flex-grow bg-white relative max-w-[455px] border border-gray-300 rounded-full">
          <input
            type="text"
            placeholder="ค้นหาคีย์เวิร์ด"
            className="flex-grow  h-[48px] w-full px-4 py-2 placeholder:text-gray-inactive placeholder:font-light text-gray-700 bg-transparent outline-none"
          />
          <div className="bg-white absolute top-0 rounded-r-full pr-1 right-0 h-[48px] w-[55px] flex items-center justify-end">
            <button className=" bg-orange-normal hover:bg-orange-normal/80 transition-all duration-200 flex justify-center items-center h-[40px] w-[40px] rounded-full ">
              <Search className="h-[18px] w-[18px] text-white" />
            </button>
          </div>
        </div>
        <button className="flex justify-center items-center border bg-white hover:drop-shadow-md border-gray-stroke rounded-[10px] h-[48px] min-w-[48px] px-3 max-w-[104px] text-gray-btngray">
          <SlidersHorizontal className="h-[18px] w-[18px]" />
          <span className="hidden sm:block text-sm font-medium ml-2">
            ตัวกรอง
          </span>
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-y-12  gap-x-[5%] lg:gap-x-[3%] mt-[25px] bg-gree">
        {Array.from({ length: 10 }).map((_, index) => (
          <EventCard
            key={index}
            cardId={(index + 1).toString()} // id={index}
            title="Builds Idea 2024"
            date="13 กรกฎาคม - 07 สิงหาคม 2567"
            time="09:00 - 18:00 (UTC+7)"
            location="ศูนย์สุขภาพพร้อม สาขาอาคารศูนย์สุขภาพ มหาวิทยาลัยเชียงใหม่"
            imgUrl="https://drive.google.com/uc?export=view&id=1-wqxOT_uo1pE_mEPHbJVoirMMH2Be3Ks"
            orgName="มหาวิทยาลัยเชียงใหม่"
            orgPicUrl="https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd"
          />
        ))}
      </div>
    </div>
  );
}
