import React from "react";
import JobCard from "./JobCard";
import { JobCardProps } from "@/lib/types";
// import ListPagination from "./ListPagination";

interface JobListProps {
  jobs: JobCardProps[];
  totalPages: number;
}

export default function JobListing({
  // jobs,
  // totalPages,
}: Readonly<JobListProps>) {
  return (
    <div>
      {/* {jobs.length > 0 ? (
        <>
          <div className="flex flex-col gap-5 w-full">
            {jobs.map((job) => (
              <JobCard
                key={job.title}
                title={job.title}
                description={job.description}
                work_type={job.work_type}
                workplace={job.workplace}
                career_stage={job.career_stage}
                province={job.province}
                country={job.country}
                salary={job.salary}
                imgUrl={job.imgUrl}
                orgName={job.orgName}
                industry={job.industry}
                updatedDate={job.updatedDate}
                isBooked={job.isBooked}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-[50px]">
            {totalPages > 1 && (
              <ListPagination totalPages={totalPages} type="jobs" />
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-[100px] mb-[150px]">
          <p className="text-2xl font-medium text-gray-600 mb-2">
            ไม่พบตำแหน่งงาน
          </p>
          <p className="text-gray-500">
            กรุณาลองค้นหาด้วยคำค้นอื่น หรือลองเปลี่ยนตัวกรอง
          </p>
        </div>
      )} */}
      <div className="flex flex-col gap-5 w-full">
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
      </div>
    </div>
    // </>
  );
}
