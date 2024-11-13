import Image from "next/image";
import Link from "next/link";
import React from "react";

interface JobCardProps {
    orgName: string;
    imgUrl: string;
    jobTitle: string;
    location: string;
}

export default function JobCard({ orgName, imgUrl, jobTitle, location }: JobCardProps) {
    return (
        // <div className="flex flex-row justify-center items-center border rounded-lg">
        <Link href={"/"} className="flex flex-row border  hover:shadow-md rounded-[8px] group hover:cursor-pointer duration-100 overflow-hidden">
            <div className="overflow-hidden">
                <Image
                    className="rounded-full"
                    src={imgUrl} 
                    width={100} 
                    height={100} 
                    alt="องค์กร"
                />
            </div>
            <div className="ml-2 mt-2">
                <p className="text-orange-normal">{orgName}</p>
                <p className="text-black">{jobTitle}</p>
                <p className="text-gray-400 text-sm">{location}</p>
            </div>
        </Link>
        // </div>
    );
}