import { formatDateRange, formatTimeRange } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  IoCalendarSharp,
  IoLocationSharp,
  IoTimeOutline,
} from "react-icons/io5";

interface EventCardProps {
  title: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  location: string;
  imgUrl: string;
  orgName: string;
  orgPicUrl: string;
  cardId: string;
  showOrg?: boolean;
}
export default function EventCard({
  title,
  startDate,
  endDate,
  startTime,
  endTime,
  location,
  imgUrl,
  orgName,
  orgPicUrl,
  cardId,
  showOrg = true,
}: Readonly<EventCardProps>) {
  return (
    <div className="flex flex-col gap-1">
      {showOrg && (
        <div className="flex flex-row gap-2 justify-start items-center h-auto w-full pr-3">
          <div
            className="h-auto w-[20%] max-w-[45px] overflow-hidden rounded-full bg-[#F5F5F5]"
            style={{ aspectRatio: "1 / 1" }}
          >
            <Image
              className="block h-full w-full object-cover"
              src={orgPicUrl}
              width={300}
              height={300}
              alt="org-profile"
            />
          </div>
          <div className="font-regular text-xs md:text-sm flex-grow min-w-0 line-clamp-1 break-words">
            {orgName}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <Link href={`/events/${cardId}`} className="flex flex-col">
          <div
            className="h-full w-full rounded-[8px] overflow-hidden duration-100 bg-[#F5F5F5]"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Image
              className="block h-full w-full object-cover duration-100"
              src={imgUrl}
              width={191}
              height={242}
              alt="อีเว้นท์"
            />
          </div>
          <div className="font-medium text-base md:text-lg line-clamp-1 duration-100 mt-1">
            {title ?? "ไม่ระบุ"}
          </div>
        </Link>

        <div className="flex flex-col gap-2 mt-1">
          <div className="flex min-w-0 break-words justify-start items-center flex-row gap-2">
            <IoCalendarSharp className="w-3 h-3 md:w-4 md:h-4 text-orange-dark" />
            <div className="line-clamp-1 font-light text-xs md:text-sm">
              {startDate ? formatDateRange(startDate, endDate) : "ไม่ระบุ"}
            </div>
          </div>
          <div className="flex min-w-0 break-words justify-start items-center flex-row gap-2">
            <IoTimeOutline className="w-3 h-3 md:w-4 md:h-4 text-orange-dark" />
            <div className="line-clamp-1 font-light text-xs md:text-sm">
              {startTime ? formatTimeRange(startTime, endTime) : "ไม่ระบุ"}
            </div>
          </div>
          <div className="flex min-w-0 break-words justify-start items-center flex-row gap-2">
            <IoLocationSharp className="w-3 h-3 md:w-4 md:h-4 text-orange-dark" />
            <div className="line-clamp-1 font-light text-xs md:text-sm">
              {location ?? "ไม่ระบุ"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
