"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Users,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { JobDescriptionPage } from "@/lib/types";
import { useLocale } from "next-intl";

const JobDisplay = ({ id }: { id: string }) => {
  const locale = useLocale();
  const [job, setJob] = useState<JobDescriptionPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch the job data here
    // For this example, we'll use mock data
    setJob({
      id: Number.parseInt(id),
      updatedDate: "2025-02-02 15:49:45.486693+00",
      title: "Senior Software Engineer",
      scope:
        "Lead the development and maintenance of complex web applications, mentor junior developers, and contribute to architectural decisions.",
      prerequisite: [
        { name: "Advanced JavaScript", url: "/courses/advanced-javascript" },
        {
          name: "React Mastery MasteryMasteryMastery",
          url: "/courses/react-mastery",
        },
        { name: "Node.js Performance", url: "/courses/nodejs-performance" },
        { name: "TypeScript in Depth", url: "/courses/typescript-in-depth" },
        { name: "AWS for Developers", url: "/courses/aws-for-developers" },
      ],
      workplace: "hybrid",
      workplaceDesc: "(2 days in office, 3 days remote)",
      work_type: "fulltime",
      career_stage: "senior",
      period: "Permanent",
      description:
        "We are seeking a talented and experienced Senior Software Engineer to join our innovative team. In this role, you will be responsible for designing, developing, and maintaining scalable web applications using cutting-edge technologies. You will work closely with cross-functional teams to deliver high-quality software solutions that meet business requirements and user needs.",
      hours_per_day: "8",
      qualifications:
        "- Bachelor's degree in Computer Science or related field\n- 5+ years of experience in software development\n- Strong proficiency in JavaScript, React, and Node.js\n- Experience with TypeScript and AWS\n- Excellent problem-solving and communication skills",
      benefits:
        "- Competitive salary\n- Health, dental, and vision insurance\n- 401(k) with company match\n- Flexible work arrangements\n- Professional development budget\n- Generous paid time off\n- Regular team events and activities",
      quantity: 2,
      salary: 32000,
      province: "", // Add this property
      country: "", // Add this property
      industry: ["IT", "ข้อมูล", "วิเคราะห์"], // Add this property
    });
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!job) {
    return <div className="text-center py-8">Job not found</div>;
  }

  return (
    <div className="bg-white rounded-lg sm:shadow-md max-w-4xl mx-auto sm:drop-shadow-md">
      <div className="p-6">
        <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
        <div className="mb-6 text-sm text-gray-500">
          Last updated: {formatRelativeTime(job.updatedDate, locale)}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Briefcase className="text-primary shrink-0" />
            <span className="text-sm text-gray-700">
              {job.work_type} - {job.career_stage}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-primary shrink-0" />
            <span className="text-sm text-gray-700">{`${job.workplace} - ${job.workplaceDesc}`}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-primary shrink-0" />
            <span className="text-sm text-gray-700">
              {job.hours_per_day} hours/day
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-primary shrink-0" />
            <span className="text-sm text-gray-700">{job.period}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="text-primary shrink-0" />
            <span className="text-sm text-gray-700">
              ฿{job.salary.toLocaleString()}/month
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="text-primary shrink-0" />
            <span className="text-sm text-gray-700">
              {job.quantity} position{job.quantity > 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {job.industry.map((sector, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {sector}
            </span>
          ))}
        </div>

        <Button className="w-full mb-6 bg-orange-normal hover:bg-orange-normal/80">
          Apply for this position
        </Button>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Job Description</h2>
            <p className="text-gray-700">{job.description}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Job Scope</h2>
            <p className="text-gray-700">{job.scope}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {job.qualifications}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Benefits</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.benefits}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              <span>Prerequisite Courses</span>
              <span className="text-sm font-light text-gray-500">
                {" (Recommended)"}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {job.prerequisite.map((course, index) => (
                <Link href={course.url} key={index} className="bg-white">
                  <div className="h-full flex flex-col justify-between border rounded-lg p-4 hover:shadow-md">
                    <div className="flex items-start gap-2 mb-2">
                      <BookOpen className="text-primary shrink-0" />
                      <h3 className="font-medium line-clamp-1">
                        {course.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 text-right">
                      Click to learn more
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobDisplay;
