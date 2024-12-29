import React from "react";
import { Organization } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/cards/Badge";

interface CustomPopupProps {
  organization: Organization;
}

export const CustomPopup: React.FC<CustomPopupProps> = ({ organization }) => {
  const handleMapLinkClick = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${organization.latitude},${organization.longitude}`,
      "_blank"
    );
  };
  return (
    <div className="font-prompt flex flex-col w-[300px] md:w-[400px] p-4 bg-white rounded-lg shadow-lg">
      <div className="flex gap-2 items-center">
        <Image
          src={
            "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw"
          }
          className="h-full max-w-[60px] object-cover rounded-xl border"
          style={{ aspectRatio: "1 / 1" }}
          height={100}
          width={100}
          alt="org-image"
        />
        <h3 className="text-sm md:text-base font-normal text-gray-900">
          {organization.name}
        </h3>
      </div>
      <p className="text-xs md:text-sm font-light text-gray-600 mt-1">
        {organization.description}
      </p>
      <div className="inline-flex flex-wrap mt-2 gap-1">
        {organization.industry.map((label, i) => (
          <Badge key={i} label={label} />
        ))}
      </div>
      <div className="flex gap-3 justify-end w-full mt-4">
        <Link
          href={`/orgs/${organization.id}/org-detail`}
          className="inline-flex justify-center items-center py-[6px] px-2 rounded-full w-full border-[1px]
          font-light text-sm md:text-base hover:bg-slate-50 text-black transition-colors duration-150 focus:outline-none"
        >
          <span className="ml-2">ดูรายละเอียด</span>
        </Link>
        <button
          onClick={handleMapLinkClick}
          style={{ aspectRatio: "1 / 1" }}
          className="flex w-10 h-10 justify-center items-center z-10 top-2 right-2 
                bg-white rounded-full border hover:drop-shadow-md"
        >
          <Image
            src="/icon/google-map.png"
            className="h-7 w-auto"
            width={100}
            height={100}
            alt="map-link"
          />
        </button>
      </div>
    </div>
  );
};
