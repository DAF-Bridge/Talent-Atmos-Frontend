import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <CalendarDays className="text-orange-dark w-4 h-4" />
          <div className="line-clamp-1 text-sm">{date}</div>
        </div>
      </div>
    </Link>
  );
}
