import Image from "next/image";
// import Link from "next/link";
import React from "react";

interface OrgCardProps {
    orgName: string;
    imgUrl: string;
    jobTitle: string;
    location: string;
}

export default function OrgCard({ orgName, imgUrl, jobTitle, location }: OrgCardProps) {
    return (
        <div className="flex justify-center items-center">
            <Image
                className="block h-full w-full object-cover group-hover:scale-110 duration-100"
                src={imgUrl}
                width={500}
                height={500}
                alt="องค์กร"
            />
            <div className="flex justify-center items-center py-1 px-3">
                {/* <div className="font-medium text-sm md:text-base line-clamp-1 group-hover:text-orange-normal duration-100">
                    {orgName}
                </div> */}
                <span>{orgName}</span>
                <span>{jobTitle}</span>
                <span>{location}</span>
            </div>
        </div>
    );
}