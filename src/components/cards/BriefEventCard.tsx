import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BriefEventCardProps {
  title: string;
  date: string;
  imgUrl: string;
}

export default function BriefEventCard({
  title,
  date,
  imgUrl,
}: BriefEventCardProps) {
  return (
    <Link href={"/event"} className="flex flex-col gap-1 group hover:cursor-pointer">
      <div className="h-full w-full rounded-[8px] overflow-hidden group-hover:shadow-md duration-100">
        <Image
          className="block h-full w-full object-contain rounded-[8px] group-hover:scale-105 duration-100"
          src={imgUrl}
          width={191}
          height={242}
          alt="อีเว้นท์"
        />
      </div>

      <div className="font-medium text-base line-clamp-1 group-hover:text-orange-normal duration-100">{title}</div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Image src="icon/calendar.svg" width={16} height={16} alt="" />
          <div className="line-clamp-1 text-sm">{date}</div>
        </div>
      </div>
    </Link>
  );
}
