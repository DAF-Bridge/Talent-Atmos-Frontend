import Image from "next/image";
import React from "react";

interface OrgCardProps {
  name: string;
  imgUrl: string;
}

export default function OrgCard({ name, imgUrl }: OrgCardProps) {
  return (
    <div className="flex flex-col border  hover:shadow-md rounded-[8px] group hover:cursor-pointer duration-100 overflow-hidden ">
      <div className="flex justify-center items-center h-[133px] w-auto border overflow-hidden">
        <Image
          className="block h-full w-full object-cover group-hover:scale-110 duration-100"
          src={imgUrl}
          width={500}
          height={500}
          alt="องค์กร"
        />
      </div>

      <div className="flex h-[38px] justify-center items-center font-medium text-base line-clamp-1 group-hover:text-orange-dark">
        {name}
      </div>
    </div>
  );
}
