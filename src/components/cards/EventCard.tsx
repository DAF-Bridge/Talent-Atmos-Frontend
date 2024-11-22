import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  imgUrl: string;
  orgName: string;
  orgPicUrl: string;
  cardId: string;
}

export default function EventCard({
  title,
  date,
  time,
  location,
  imgUrl,
  orgName,
  orgPicUrl,
  cardId,
}: EventCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-2 justify-start items-center h-auto w-full pr-3">
        <div
          className="h-auto max-w-[40px] overflow-hidden rounded-full bg-white"
          style={{ aspectRatio: "1 / 1" }}
        >
          <Image
            className="block h-full w-full object-cover group-hover:scale-105 duration-100"
            src={orgPicUrl}
            width={300}
            height={300}
            alt="org-profile"
          />
        </div>
        <div className="font-regular text-base flex-grow min-w-0 line-clamp-1 break-words">
          {orgName}
        </div>
      </div>
      <Link
        href={`event/${cardId}`}
        className="flex flex-col gap-1 group hover:cursor-pointer"
      >
        <div
          className="h-full w-full rounded-[18px] overflow-hidden group-hover:shadow-md duration-100 bg-red-400"
          style={{ aspectRatio: "3 / 4" }}
        >
          <Image
            className="block h-full w-full object-cover group-hover:scale-105 duration-100"
            src={imgUrl}
            width={191}
            height={242}
            alt="อีเว้นท์"
          />
        </div>

        <div className="font-medium text-lg line-clamp-1 group-hover:text-orange-normal duration-100">
          {title}
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex min-w-0 break-words justify-start items-center flex-row gap-2">
            <Image
              src="icon/calendar.svg"
              width={16}
              height={16}
              alt="Calendar icon for event date"
            />
            <div className="line-clamp-1 font-light text-sm">{date}</div>
          </div>
          <div className="flex min-w-0 break-words justify-start items-center flex-row gap-2">
            <Image
              src="icon/time.svg"
              width={16}
              height={16}
              alt="Calendar icon for event time"
            />
            <div className="line-clamp-1 font-light text-sm">{time}</div>
          </div>
          <div className="flex min-w-0 break-words justify-start items-center flex-row gap-2">
            <Image
              src="icon/location.svg"
              width={16}
              height={16}
              alt="Calendar icon for event location"
            />
            <div className="line-clamp-1 font-light text-sm">{location}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
