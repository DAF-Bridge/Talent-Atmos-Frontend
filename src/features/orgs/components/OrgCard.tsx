import { Link } from "@/i18n/routing";
import Image from "next/image";

import React from "react";

interface OrgCardProps {
  readonly name: string;
  readonly imgUrl: string;
}

export default function OrgCard({ name, imgUrl }: OrgCardProps) {
  return (
    <Link
      href={"/org"}
      className="flex flex-col border  hover:shadow-md rounded-[10px] 
    group hover:cursor-pointer duration-100 overflow-hidden bg-white drop-shadow-md"
    >
      <div className="relative flex justify-center items-center w-auto overflow-hidden group">
        <div
          className="bg-gray-900/70 flex justify-center items-center absolute h-full w-full 
        z-10 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 
        duration-300 px-5"
        >
          <p className="text-white text-2xl font-medium text-center line-clamp-3">
            {name}
          </p>
        </div>
        <Image
          className="block h-full w-full object-cover"
          style={{ aspectRatio: "5 / 3" }}
          src={imgUrl}
          width={500}
          height={500}
          alt="องค์กร"
        />
      </div>
    </Link>
  );
}
