import Badge from "@/components/cards/Badge";
import { formatRelativeTime } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

interface JobCardProps {
  title: string;
  description: string;
  work_type: string;
  workplace: string;
  career_stage: string;
  province: string;
  country: string;
  salary: string;
  imgUrl?: string;
  updatedDate: string;
  orgName?: string;
  industry: string[];
}

export default function JobCard({
  title,
  description,
  work_type,
  workplace,
  career_stage,
  province,
  country,
  salary,
  imgUrl,
  updatedDate,
  orgName,
  industry,
}: Readonly<JobCardProps>) {
  return (
    <div className="border rounded-[8px] bg-white p-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-row gap-4 justify-start items-center flex-wrap">
            {imgUrl && (
              <div className="shrink-0 w-[45px] h-[45px] rounded-[5px] overflow-hidden">
                <Image
                  src={imgUrl}
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                  alt="org-image"
                />
              </div>
            )}
            <div className="flex flex-col">
              {imgUrl ? (
                <p className="text-base font-normal">{title}</p>
              ) : (
                <p className="text-lg font-medium mb-1">{title}</p>
              )}
              <div className="inline-flex flex-col md:flex-row">
                {orgName && (
                  <>
                    <span className="text-base font-normal text-gray-inactive">
                      {orgName}
                    </span>
                    <span className="hidden md:block mx-2 text-lg font-extrabold leading-none">
                      .
                    </span>
                  </>
                )}
                <div className="flex flex-none justify-start items-center gap-2">
                  {work_type && (
                    <div className="inline-flex justify-center items-center bg-gray-100 rounded-[5px] px-2 py-0.5">
                      <p className="text-xs line-clamp-1">{work_type}</p>
                    </div>
                  )}
                  {workplace && (
                    <div className="inline-flex justify-center items-center bg-gray-100 rounded-[5px] px-2 py-0.5">
                      <p className="text-xs line-clamp-1">{workplace}</p>
                    </div>
                  )}
                  {career_stage && (
                    <div className="inline-flex justify-center items-center bg-gray-100 rounded-[5px] px-2 py-0.5">
                      <p className="text-xs line-clamp-1">{career_stage}</p>
                    </div>
                  )}
                </div>
                <span className="hidden md:block mx-2 text-lg font-extrabold leading-none">
                  .
                </span>
                <span className="text-base font-normal text-orange-normal">
                  {`฿${salary}/เดือน`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-end">
            <div className="inline-flex justify-center items-center">
              <MapPin className="hidden md:block shrink-0 h-[15px]" />
              <span className="text-sm md:text-base text-right">{`${province}, ${country}`}</span>
            </div>
            <p className="text-xs md:text-sm text-gray-inactive">
              {formatRelativeTime(updatedDate)}
            </p>
          </div>
        </div>
        <p className="text-sm font-light text-gray-inactive w-[80%] line-clamp-2">
          {description}
        </p>
        <div className="inline-flex gap-2 h-6 flex-wrap">
          {industry.map((label, i) => (
            <Badge key={i} label={label} />
          ))}
        </div>
      </div>
    </div>
  );
}