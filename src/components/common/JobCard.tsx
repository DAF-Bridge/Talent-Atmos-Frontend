"use client";

import Badge from "@/components/common/Badge";
import { Link } from "@/i18n/routing";
import { JobCardProps } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

export default function JobCard({
  id,
  title,
  description,
  workType,
  workplace,
  careerStage,
  province,
  country,
  salary,
  orgPicUrl,
  updatedAt,
  organization,
  categories,
}: Readonly<JobCardProps>) {
  const locale = useLocale();
  return (
    <Link
      href={`/jobs/${id}`}
      className="border rounded-[8px] bg-white p-5 hover:drop-shadow-md transition-all duration-100"
    >
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 justify-start items-center flex-wrap">
          {orgPicUrl && (
            <div className="shrink-0 w-[50px] h-[50px] rounded-full overflow-hidden shadow shadow-slate-300">
              <Image
                src={orgPicUrl}
                className="w-full h-full object-cover"
                width={500}
                height={500}
                alt="org-image"
              />
            </div>
          )}
          <div className="flex flex-col gap-1">
            {orgPicUrl ? (
              <p className="text-sm sm:text-base font-normal">{title}</p>
            ) : (
              <p className="text-base sm:text-lg font-medium mb-1">{title}</p>
            )}
            <div className="inline-flex flex-col lg:flex-row items-start lg:items-center gap-1">
              {organization && (
                <>
                  <span className="text-xs sm:text-sm font-normal text-gray-inactive translate-y-[1px]">
                    {organization}
                  </span>
                  <span className="hidden lg:block mx-2 text-lg font-extrabold leading-none">
                    •
                  </span>
                </>
              )}
              <div className="flex flex-wrap justify-start items-center gap-2">
                {workType && (
                  <div className="inline-flex justify-center items-center bg-gray-100 rounded-[5px] px-2 py-0.5">
                    <p className="text-[10px] sm:text-xs line-clamp-1">
                      {workType}
                    </p>
                  </div>
                )}
                {workplace && (
                  <div className="inline-flex justify-center items-center bg-gray-100 rounded-[5px] px-2 py-0.5">
                    <p className="text-[10px] sm:text-xs line-clamp-1">
                      {workplace}
                    </p>
                  </div>
                )}
                {careerStage && (
                  <div className="inline-flex justify-center items-center bg-gray-100 rounded-[5px] px-2 py-0.5">
                    <p className="text-[10px] sm:text-xs line-clamp-1">
                      {careerStage}
                    </p>
                  </div>
                )}
              </div>
              <span className="hidden lg:block mx-2 text-lg font-extrabold">
                •
              </span>
              <span className="text-sm font-normal text-orange-normal translate-y-[1px]">
                {`฿${salary}/เดือน`}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm font-normal text-gray-btngray line-clamp-2 mt-4">
          {description}
        </p>
        <div className="inline-flex gap-2 flex-wrap h-fit mt-4">
          {categories.map((sector, i) => (
            <Badge key={i} label={sector.label} className="bg-[#F2F2F1]" />
          ))}
        </div>
        <div className="inline-flex flex-wrap justify-start items-center text-gray-inactive mt-2">
          <MapPin className="shrink-0 h-[12px] sm:h-[15px]" />
          <span className="text-xs sm:text-sm text-left">{`${province}, ${country}`}</span>
          {updatedAt && (
            <>
              <span className="mx-2 text-lg font-extrabold">•</span>
              <p className="text-xs sm:text-sm">
                {formatRelativeTime(updatedAt, locale)}
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
