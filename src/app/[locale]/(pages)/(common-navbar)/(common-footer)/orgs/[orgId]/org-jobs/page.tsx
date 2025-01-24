import JobCard from "@/components/common/JobCard";
import Spinner from "@/components/ui/spinner";
import { JobCardProps } from "@/lib/types";
import React, { Suspense } from "react";

export default function OrgJobsPage() {
  const jobMock: JobCardProps[] = [
    {
      title: "พนักงานทดสอบ 1",
      description:
        "สร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณ",
      work_type: "Fulltime",
      workplace: "Hybrid",
      career_stage: "Entry-Level",
      province: "กรุงเทพมหานคร",
      country: "ประเทศไทย",
      salary: "30,000",
      updatedDate: "2024-12-29:10:00",
      industry: ["IT", "เทคโนโลยี", "องค์กร", "งานทดสอบ"],
    },
    {
      title: "พนักงานทดสอบ 2",
      description:
        "วิเคราะห์ข้อมูลสำหรับบริษัททดสอบ 2 เพื่อปรับปรุงประสิทธิภาพ",
      work_type: "Parttime",
      workplace: "Remote",
      career_stage: "Mid-Level",
      province: "เชียงใหม่",
      country: "ประเทศไทย",
      salary: "20,000",
      updatedDate: "2025-01-01:10:00",
      industry: ["IT", "ข้อมูล", "วิเคราะห์"],
    },
    {
      title: "พนักงานทดสอบ 3",
      description: "ดูแลระบบไอทีสำหรับองค์กรทดสอบ 3 เพื่อประสิทธิภาพสูงสุด",
      work_type: "Fulltime",
      workplace: "Onsite",
      career_stage: "Senior-Level",
      province: "ภูเก็ต",
      country: "ประเทศไทย",
      salary: "40,000",
      updatedDate: "2025-01-02:09:00",
      industry: ["IT", "ระบบ", "องค์กร"],
    },
    {
      title: "พนักงานทดสอบ 4",
      description: "ออกแบบเว็บไซต์ให้กับองค์กรทดสอบ 4 โดยใช้เครื่องมือทันสมัย",
      work_type: "Fulltime",
      workplace: "Hybrid",
      career_stage: "Entry-Level",
      province: "ชลบุรี",
      country: "ประเทศไทย",
      salary: "32,000",
      updatedDate: "2025-01-03:12:00",
      industry: ["IT", "เทคโนโลยี", "องค์กร"],
    },
    {
      title: "พนักงานทดสอบ 5",
      description: "พัฒนาระบบสำหรับองค์กรทดสอบ 5 ด้วยความปลอดภัยสูงสุด",
      work_type: "Contract",
      workplace: "Remote",
      career_stage: "Mid-Level",
      province: "ระยอง",
      country: "ประเทศไทย",
      salary: "28,000",
      updatedDate: "2025-01-04:15:00",
      industry: ["IT", "ระบบ", "เทคโนโลยี"],
    },
    {
      title: "พนักงานทดสอบ 6",
      description: "ออกแบบ UX/UI ให้กับเว็บไซต์องค์กรทดสอบ 6",
      work_type: "Parttime",
      workplace: "Onsite",
      career_stage: "Entry-Level",
      province: "นครราชสีมา",
      country: "ประเทศไทย",
      salary: "25,000",
      updatedDate: "2025-01-05:11:00",
      industry: ["ออกแบบ", "UX/UI", "เทคโนโลยี"],
    },
    {
      title: "พนักงานทดสอบ 7",
      description: "บริหารโครงการพัฒนาระบบองค์กรทดสอบ 7",
      work_type: "Fulltime",
      workplace: "Hybrid",
      career_stage: "Senior-Level",
      province: "ขอนแก่น",
      country: "ประเทศไทย",
      salary: "45,000",
      updatedDate: "2025-01-06:14:00",
      industry: ["การบริหาร", "โครงการ", "เทคโนโลยี"],
    },
    {
      title: "พนักงานทดสอบ 8",
      description: "สร้างกลยุทธ์การตลาดออนไลน์ให้กับองค์กรทดสอบ 8",
      work_type: "Contract",
      workplace: "Remote",
      career_stage: "Mid-Level",
      province: "เชียงราย",
      country: "ประเทศไทย",
      salary: "35,000",
      updatedDate: "2025-01-07:13:00",
      industry: ["การตลาด", "ดิจิทัล", "เทคโนโลยี"],
    },
    {
      title: "พนักงานทดสอบ 9",
      description: "ติดตั้งระบบเครือข่ายให้กับองค์กรทดสอบ 9",
      work_type: "Fulltime",
      workplace: "Onsite",
      career_stage: "Entry-Level",
      province: "สงขลา",
      country: "ประเทศไทย",
      salary: "29,000",
      updatedDate: "2025-01-08:16:00",
      industry: ["เครือข่าย", "IT", "เทคโนโลยี"],
    },
    {
      title: "พนักงานทดสอบ 10",
      description: "สนับสนุนงานด้านไอทีและเทคนิคองค์กรทดสอบ 10",
      work_type: "Fulltime",
      workplace: "Hybrid",
      career_stage: "Entry-Level",
      province: "กรุงเทพมหานคร",
      country: "ประเทศไทย",
      salary: "31,000",
      updatedDate: "2025-01-09:10:00",
      industry: ["ไอที", "เทคโนโลยี", "องค์กร"],
    },
  ];

  return (
    <Suspense fallback={<Spinner />}>
      {jobMock.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {jobMock.map((job) => (
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
              updatedDate={job.updatedDate}
              industry={job.industry}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-[100px] mb-[150px] text-center">
          <p className="text-2xl font-medium text-gray-600 mb-2">
            ไม่พบตำแหน่งงาน
          </p>
          <p className="text-gray-500">
            องค์กรนี้ยังไม่มีการเปิดรับสมัครงานในขณะนี้
            กรุณาตรวจสอบอีกครั้งในภายหลัง
          </p>
        </div>
      )}
    </Suspense>
  );
}
