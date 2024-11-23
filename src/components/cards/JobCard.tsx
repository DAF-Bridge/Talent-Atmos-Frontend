import Image from "next/image";
import Link from "next/link";
import React from "react";

interface JobCardProps {
  readonly orgName: string;
  readonly imgUrl: string;
  readonly jobTitle: string;
  readonly location: string;
}

export default function JobCard({
  orgName,
  imgUrl,
  jobTitle,
  location,
}: JobCardProps) {
  return (
    <Link
      href={"/"}
      className="flex flex-row gap-[5%] items-start justify-center border hover:shadow-md rounded-[8px] 
      group hover:cursor-pointer duration-100 overflow-hidden px-2 bg-white"
    >
      <div className="flex my-auto w-[33%] h-full">
        <Image
          className="shrink-0 rounded-full"
          src={imgUrl}
          width={120}   
          height={120}
          alt="องค์กร"
        />
      </div>
      <div className="flex flex-col justify-start py-[5%] h-full w-full">
        <p className="text-orange-normal line-clamp-1">{orgName}</p>
        <p className="text-black line-clamp-1">{jobTitle}</p>
        <p className="text-gray-400 text-sm line-clamp-1">{location}</p>
      </div>
    </Link>
  );
}
