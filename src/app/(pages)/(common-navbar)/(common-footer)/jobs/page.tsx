import Image from "next/image";
import React from "react";
import JobSideBar from "./JobSideBar";
import JobCard from "@/components/cards/JobCard";
import ListPagination from "@/components/Pagination/ListPagination";

export default function JobListingPage() {
  return (
    <div className="font-prompt mt-[65px] min-h-[80vh]">
      <div className="w-full bg-[#F7F8FC]">
        <div
          className="flex justify-between lg:justify-start items-center max-w-[1170px] mx-auto 
        px-6 gap-5 lg:gap-20 h-[140px] overflow-hidden"
        >
          <div className="flex flex-col items-start">
            <p className="text-2xl lg:text-3xl font-semibold">
              ค้นหางานที่ตอบโจทย์
            </p>
            <p className="text-gray-inactive text-sm lg:text-base">
              อยากสร้างการเปลี่ยนแปลงใช่ไหม?
              พบงานที่สร้างผลกระทบเชิงบวกได้ที่นี่!
            </p>
          </div>
          <div className="hidden sm:block md:mt-16 min-w-[200px]">
            <Image
              src={"/hiring-banner.svg"}
              height={262}
              width={440}
              alt="banner"
            />
          </div>
        </div>
      </div>
      <div className="flex max-w-[1170px] mx-auto px-6 min-h-[60vh] mt-6">
        {/* sidebar */}
        <div className="hidden md:block min-w-[240px] w-[25%]">
          <JobSideBar />
        </div>

        <div className="flex flex-col gap-5 md:pl-4 w-full md:w-[75%]">
          {Array.from({ length: 5 }).map((_, index) => (
            <JobCard
              key={index}
              orgName="องค์กรทดสอบ 1"
              title="พนักงานทดสอบ 1"
              description="สร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณ"
              work_type="Fulltime"
              workplace="Hybrid"
              career_stage="Entry-Level"
              province="กรุงเทพมหานคร"
              country="ประเทศไทย"
              salary="30,000"
              imgUrl="https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc"
              updatedDate="2024-12-29:10:00"
              industry={["IT", "เทคโนโลยี", "องค์กร", "งานทดสอบ"]}
            />
          ))}
          <div className="mt-6">
            <ListPagination type="jobs" totalPages={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
