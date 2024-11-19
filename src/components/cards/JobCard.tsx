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
        
        <Link 
        href={"/"} 
        className="flex gap-3 items-center justify-center flex-row border hover:shadow-md rounded-[8px] group hover:cursor-pointer 
        duration-100 overflow-hidden py-1 px-2"
        style={{aspectRatio: "208 / 100"}}
        >
            <div className="flex items-start w-[33%] py-2 h-full">
                <Image
                    className="rounded-full"
                    src={imgUrl} 
                    width={120} 
                    height={120} 
                    alt="องค์กร"
                />
            </div>
            <div className="flex flex-col justify-center h-full w-full">
                <p className="text-orange-normal">{orgName}</p>
                <p className="text-black mt-[2px]">{jobTitle}</p>
                <p className="text-gray-400 text-sm mt-[7px]">{location}</p>
            </div>
        </Link>
        
    );
}   