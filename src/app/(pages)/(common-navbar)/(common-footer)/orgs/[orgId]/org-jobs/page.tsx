import JobCard from "@/components/cards/JobCard";
import React from "react";

export default function OrgJobsPage() {
  return (
    <div className="flex flex-col gap-5">
      <JobCard
        // orgName="องค์กรทดสอบ 1"
        title="พนักงานทดสอบ 1"
        description="สร้างเว็บไซต์ให้บริษัททดสอบ 1 ของคุณ"
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
    </div>
  );
}
