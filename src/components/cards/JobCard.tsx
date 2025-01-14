"use client";

import Badge from "@/components/cards/Badge";
import { formatRelativeTime } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

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
  isBooked?: boolean;
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
  isBooked = false,
}: Readonly<JobCardProps>) {
  const [isBookmarked, setIsBookmarked] = React.useState(isBooked);
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  return (
    <div className="border rounded-[8px] bg-white p-5">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-row gap-4 justify-start items-start flex-wrap">
            {imgUrl && (
              <div className="shrink-0 w-[50px] h-[50px] rounded-[5px] overflow-hidden shadow shadow-slate-300">
                <Image
                  src={imgUrl}
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                  alt="org-image"
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              {imgUrl ? (
                <p className="text-base font-normal">{title}</p>
              ) : (
                <p className="text-lg font-medium mb-1">{title}</p>
              )}
              <div className="inline-flex flex-col md:flex-row gap-1">
                {orgName && (
                  <>
                    <span className="text-base font-normal text-gray-inactive">
                      {orgName}
                    </span>
                    <span className="hidden md:block mx-2 text-lg font-extrabold leading-none">
                      •
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
                <span className="hidden md:block mx-2 text-lg font-extrabold">•</span>
                <span className="text-base font-normal text-orange-normal translate-y-[2px]">
                  {`฿${salary}/เดือน`}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleBookmark}
            className="p-3 border rounded-[8px] text-gray-inactive text-xl hover:bg-slate-50"
          >
            {isBookmarked ? (
              <FaBookmark className="text-orange-normal" />
            ) : (
              <FaRegBookmark />
            )}
          </button>
        </div>
        <p className="text-sm font-normal w-[80%] line-clamp-2 mt-4">
          {description}
        </p>
        <div className="inline-flex gap-2 h-6 flex-wrap mt-4">
          {industry.map((label, i) => (
            <Badge key={i} label={label} className="bg-[#F2F2F1]" />
          ))}
        </div>
        <div className="inline-flex justify-start items-center text-gray-inactive mt-2">
          <MapPin className="shrink-0 h-[15px]" />
          <span className="text-sm text-right">{`${province}, ${country}`}</span>
          <span className="mx-2 text-lg font-extrabold">•</span>
          <p className="text-sm">{formatRelativeTime(updatedDate)}</p>
        </div>
      </div>
    </div>
  );
}
