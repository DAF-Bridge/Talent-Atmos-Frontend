import { formatDateRange } from "@/lib/utils";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import React from "react";
import {
  // IoCalendarSharp,
  IoLocationSharp,
  // IoTimeOutline,
} from "react-icons/io5";
// import Badge from "./Badge";

interface EventCardProps {
  title: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
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
  // startTime,
  // endTime,
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
        <Link href={`/events/${cardId}`} className="flex flex-col items-start">
          <div
            className="h-full w-full rounded-[8px] overflow-hidden bg-[#F5F5F5] border drop-shadow-md"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Image
              className="block h-full w-full object-cover"
              src={imgUrl}
              width={191}
              height={242}
              alt="อีเว้นท์"
            />
          </div>
          <div className="line-clamp-1 text-sm min-h-5 text-gray-500 mt-3">
            {startDate ? formatDateRange(startDate, endDate) : "ไม่ระบุ"}
          </div>
          <div className="font-medium text-base line-clamp-2 mt-2 min-h-[3rem]">
            {title ?? "ไม่ระบุ"}
          </div>
        </Link>

        <div className="flex flex-col gap-2 mt-1">
          {/* <div className="flex min-w-0 break-words justify-start items-center flex-row gap-2">
            <IoCalendarSharp className="w-3 h-3 md:w-4 md:h-4 text-orange-dark" />
            <div className="line-clamp-1 font-light text-xs md:text-sm">
              {startDate ? formatDateRange(startDate, endDate) : "ไม่ระบุ"}
            </div>
          </div> */}
          {/* <div className="flex min-w-0 break-words justify-start items-center flex-row gap-2">
            <IoTimeOutline className="w-3 h-3 md:w-4 md:h-4 text-orange-dark" />
            <div className="line-clamp-1 font-light text-xs md:text-sm">
              {startTime ? formatTimeRange(startTime, endTime) : "ไม่ระบุ"}
            </div>
          </div> */}
          <div className="flex min-w-0 break-words justify-start items-center flex-row gap-2">
            <IoLocationSharp className="w-3 h-3 md:w-4 md:h-4 text-orange-dark" />
            <div className="line-clamp-1 font-light text-xs md:text-sm">
              {location !== "" ? location : "ไม่ระบุ"}
            </div>
          </div>
          {/* <div className="inline-flex flex-wrap gap-1">
            <Badge label={"Technology"} className="text-[10px] h-fit" />
            <Badge label={"Startup"} className="text-[10px] h-fit" />
            <Badge label={"Finance"} className="text-[10px] h-fit" />
          </div> */}
        </div>
      </div>
    </div>
  );
}
