import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OrgCardProps {
  name: string;
  imgUrl: string;
}

export default function OrgCard({ name, imgUrl }: OrgCardProps) {
  return (
    <Link href={"/org"} className="flex flex-col border  hover:shadow-md rounded-[8px] group hover:cursor-pointer duration-100 overflow-hidden ">
      <div className="flex justify-center items-center h-[133px] 2xl:h-[200px] w-auto border overflow-hidden">
        <Image
          className="block h-full w-full object-cover group-hover:scale-110 duration-100"
          src={imgUrl}
          width={500}
          height={500}
          alt="องค์กร"
        />
      </div>
      <div className="flex justify-center items-center py-1 px-3">
        <div className="font-medium text-sm md:text-base line-clamp-1 group-hover:text-orange-normal duration-100">
          {name}
        </div>
      </div>
    </Link>
  );
}
