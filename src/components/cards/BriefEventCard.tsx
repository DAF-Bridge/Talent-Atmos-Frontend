import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCalendarSharp } from "react-icons/io5";

interface BriefEventCardProps {
  readonly title: string;
  readonly date: string;
  readonly imgUrl: string;
}

export default function BriefEventCard({
  title,
  date,
  imgUrl,
}: BriefEventCardProps) {
  return (
    <Link
      href={"/event"}
      className="flex flex-col gap-1 group hover:cursor-pointer"
    >
      <div
        className="h-full w-full rounded-[8px] overflow-hidden group-hover:shadow-md duration-100"
        style={{ aspectRatio: "3 / 4" }}
      >
        <Image
          className="h-full w-full object-cover rounded-[8px] group-hover:scale-105 duration-100"
          src={imgUrl}
          width={191}
          height={242}
          alt="อีเว้นท์"
        />
      </div>

      <div className="font-medium text-base line-clamp-1 group-hover:text-orange-normal duration-100">
        {title}
      </div>
      <div className="flex min-w-0 break-words justify-start items-center flex-row gap-2">
        <IoCalendarSharp className="w-3 h-3 md:w-4 md:h-4 text-orange-dark" />
        <div className="line-clamp-1 font-light text-xs md:text-sm">{date}</div>
      </div>
    </Link>
  );
}
