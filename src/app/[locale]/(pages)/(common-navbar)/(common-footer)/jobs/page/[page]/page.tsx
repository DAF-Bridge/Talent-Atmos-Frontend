import Image from "next/image";
import React from "react";
import ListPagination from "@/components/common/ListPagination";
import JobSideBar from "@/features/jobs/components/JobSideBar";
import JobListing from "@/components/common/JobListing";
import JobFilterMobile from "@/features/jobs/components/JobFilterMobile";

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
      <div className="flex flex-col md:flex-row max-w-[1170px] mx-auto px-6 min-h-[60vh] mt-6">
        {/* sidebar */}
        <div className="hidden md:block min-w-[240px] w-[25%]">
          <JobSideBar />
        </div>
        <div className="md:hidden mb-4">
          <div>
            <JobFilterMobile />
          </div>
        </div>

        <div className="flex flex-col gap-5 md:pl-4 w-full md:w-[75%]">
          <JobListing />
          <div className="mt-6">
            <ListPagination type="jobs" totalPages={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
