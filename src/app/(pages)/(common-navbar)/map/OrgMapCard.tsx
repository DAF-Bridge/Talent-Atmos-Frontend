import React from "react";
import Image from "next/image";
import { Organization } from "@/lib/types";

interface OrgMapCardProp {
  organization: Organization;
  isSelected: boolean;
  onCardClick: (organization: Organization) => void;
}

export default function OrgMapCard({
  organization,
  isSelected,
  onCardClick,
}: Readonly<OrgMapCardProp>) {
  return (
    <button
      onClick={() => onCardClick(organization)}
      className={`flex justify-between items-center gap-10 md:gap-2 rounded-[20px] h-[106px] py-2 pr-2 pl-4 
        hover:bg-slate-100 transition-colors duration-150 
        ${isSelected ? "bg-slate-100" : ""}`}
    >
      <div className="inline-flex flex-col gap-[3px] text-left">
        <span className="text-sm font-medium line-clamp-1">
          {organization.name}
        </span>
        <span className="text-sm font-light line-clamp-2 ">
          {organization.description}
        </span>
      </div>
      <div className="h-full">
        <Image
          src={
            "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw"
          }
          className="h-full max-w-[88px] object-cover rounded-[17px] border"
          style={{ aspectRatio: "1 / 1" }}
          height={100}
          width={100}
          alt="org-image"
        />
      </div>
    </button>
  );
}
