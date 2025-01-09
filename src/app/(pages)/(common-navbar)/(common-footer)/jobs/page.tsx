import Image from "next/image";
import React from "react";

export default function JobListingPage() {
  return (
    <div className="font-prompt max-w-[1170px] mx-auto px-6 mt-[100px]">
      <div className="flex justify-center items-center h-[70vh]">
        <Image
          src={"/page/under-dev.svg"}
          className="h-[85%] w-auto object-contain"
          width={630}
          height={480}
          alt="under development icon"
        />
      </div>
    </div>
  );
}
