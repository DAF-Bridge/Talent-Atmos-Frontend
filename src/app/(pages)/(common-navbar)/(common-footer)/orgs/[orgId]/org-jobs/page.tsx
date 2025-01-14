import JobCard from "@/components/cards/JobCard";
import Spinner from "@/components/ui/spinner";
import React, { Suspense } from "react";

export default function OrgJobsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <JobCard
            key={index}
            // orgName="องค์กรทดสอบ 1"
            title="พนักงานทดสอบ 1"
            description="สร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณสร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณ"
            work_type="Fulltime"
            workplace="Hybrid"
            career_stage="Entry-Level"
            province="กรุงเทพมหานคร"
            country="ประเทศไทย"
            salary="30,000"
            // imgUrl="https://drive.google.com/uc?export=view&id=1bsT5WNkFnhhGT7SD3AynO9gqDjzz17lc"
            updatedDate="2024-12-29:10:00"
            industry={["IT", "เทคโนโลยี", "องค์กร", "งานทดสอบ"]}
          />
        ))}
      </div>
    </Suspense>
  );
}
