import OrgCarousel from "@/components/carousels/OrgCarousel";
import React from "react";

const testOrgJobs = [
  {
    OrgName: "องค์กรทดสอบ 1",
    JobTitle: "งานทดสอบ 1",
    Location: "เชียงใหม่",
  },
  {
    OrgName: "องค์กรทดสอบ 2",
    JobTitle: "งานทดสอบ 2",
    Location: "ออนไลน์",
  }
]

export default function OrgPage() {
  return  (
  <div className="font-prompt max-w-[1170px] mx-auto px-6 pb-5">
    <div className="text-center font-semibold text-2xl border-b-2 pt-[25px] pb-[11px]">
      <span className="text-black">ค้นหา</span>
      <span className="text-orange-normal"> &quot;องค์กร&quot; </span>
      <span className="text-black">ที่ตอบโจทย์เป้าหมายของคุณ</span>
      {/* <span className="text-gray-400 text-sm ml-2">({`จำนวนองค์กรทั้งหมด`})</span> */}
    </div>

    <div className="mt-8">
      <p className="font-medium text-2xl">งานที่เปิดรับสมัคร</p>
    </div>

    <div className="flex justify-between mt-4 ">
        <OrgCarousel />
    </div>
</div>);
}