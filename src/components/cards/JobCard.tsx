import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OrgCardProps {
    orgName: string;
    imgUrl: string;
    jobTitle: string;
    location: string;
}

export default function OrgCard({ orgName, imgUrl, jobTitle, location }: OrgCardProps) {
    return (
        <div>
            <Image
                className="block h-full w-full object-cover group-hover:scale-110 duration-100"
                src={imgUrl}
                width={500}
                height={500}
                alt="องค์กร"
            />
        </div>
    );
}