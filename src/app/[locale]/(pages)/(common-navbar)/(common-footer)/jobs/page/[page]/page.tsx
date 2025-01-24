import Image from "next/image";
import React from "react";
import JobSideBar from "@/features/jobs/components/JobSideBar";
import JobListing from "@/components/common/JobListing";
import JobFilterMobile from "@/features/jobs/components/JobFilterMobile";
import { DynamicSearchBar } from "@/components/common/DynamicSearch";

export default function JobListingPage({
  // params,
  searchParams,
}: Readonly<{
  params: { page: string; locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  const search = searchParams.search?.toString() ?? "";
  return (
    <div className="font-prompt mt-[65px] min-h-[80vh]">
      <div className="w-full bg-[#F7F8FC]">
        <div
          className="flex justify-between lg:justify-start items-center max-w-[1170px] mx-auto 
        px-6 gap-5 lg:gap-28 h-[120px] overflow-hidden"
        >
          <div className="flex flex-col items-start">
            <p className="text-2xl font-semibold">
              ค้นหางานที่ตอบโจทย์
            </p>
            <p className="text-gray-inactive text-sm">
              อยากสร้างการเปลี่ยนแปลงใช่ไหม?
              พบงานที่สร้างผลกระทบเชิงบวกได้ที่นี่!
            </p>
          </div>
          <div className="hidden sm:block sm:mt-12 min-w-[200px]">
            <Image
              src={"/hiring-banner.svg"}
              height={200}
              width={370}
              alt="banner"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row max-w-[1170px] mx-auto px-6 min-h-[60vh] mt-5">
        {/* sidebar */}
        <div className="hidden md:block min-w-[240px] w-[30%]">
          <JobSideBar />
        </div>

        <div className="md:pl-4 w-full md:w-[70%]">
          <div className="flex justify-between md:justify-end items-center gap-4 mb-4">
            <div className="w-full max-w-[350px]">
              <DynamicSearchBar defaultValue={search} type="jobs" />
            </div>
            <div className="md:hidden">
              <JobFilterMobile />
            </div>
          </div>
          <JobListing jobs={[]} totalPages={5} />
        </div>
      </div>
    </div>
  );
}
