import * as React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { lazy, Suspense } from "react";
import JobCarouselSkeleton from "@/components/skeletons/JobCarouselSkeleton";
import OrgCard from "@/components/cards/OrgCard";

// lazy load
const JobCarouselWrapper = lazy(
  () => import("@/components/wrappers/JobCarouselWrapper")
);

export default function OrgListingPage() {
  return (
    <div className="font-prompt max-w-[1170px] mx-auto px-10 pb-5">
      <div className="text-center font-semibold text-2xl border-b-2 pt-[25px] pb-[11px]">
        <span className="text-black">ค้นหา</span>
        <span className="text-orange-normal"> &quot;องค์กร&quot; </span>
        <span className="text-black">ที่ตอบโจทย์เป้าหมายของคุณ</span>
        {/* <span className="text-gray-400 text-sm ml-2">({`จำนวนองค์กรทั้งหมด`})</span> */}
      </div>

      <div className="mt-8">
        <p className="font-medium text-2xl">งานที่เปิดรับสมัคร</p>
      </div>

      <div className="flex justify-between mt-4">
        {/* <OrgCarousel /> */}
        <Suspense fallback={<JobCarouselSkeleton />}>
          <JobCarouselWrapper />
        </Suspense>
      </div>

      {/* <div className="border-[1.5px] mt-[26px] border-gray-stroke/70" /> */}
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

      <div className="flex flex-col mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-y-[1%] sm:gap-y-[2%] md:gap-y-[4%] gap-x-[3%] md:gap-x-[2%]">
          {/* display at minimum 12 events per page */}
          {Array.from({ length: 12 }).map((_, index) => (
            <OrgCard
              key={index}
              name={"org.name"}
              imgUrl={
                "https://drive.google.com/uc?export=view&id=1mzjpHi5GHFrUEEmI_EVLfQE9ht2--ILd"
              }
            />
          ))}
        </div>
      </div>
      {/* <div className="flex justify-center mt-3">
        <Pagination count={10} variant="outlined" shape="rounded" />
      </div> */}
    </div>
  );
}
