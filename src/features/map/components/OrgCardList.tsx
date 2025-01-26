import React from "react";
import OrgMapCard from "./OrgMapCard";
import { Organization } from "@/lib/types";

interface OrgCardListProps {
  organizations: Organization[];
  selectedOrg: Organization | null;
  handleCardClick: (org: Organization) => void;
}

export default function OrgCardList({
  organizations,
  selectedOrg,
  handleCardClick,
}: Readonly<OrgCardListProps>) {
  return (
    <div className="flex flex-col gap-1 h-full">
      {organizations.length > 0 ? (
        organizations.map((org) => (
          <OrgMapCard
            key={org.id}
            organization={org}
            isSelected={selectedOrg?.id === org.id}
            onCardClick={handleCardClick}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center mt-[100px] mb-[150px]">
          <p className="text-2xl font-medium text-gray-600 mb-2">ไม่พบข้อมูล</p>
          <p className="text-gray-500">
            กรุณาลองค้นหาด้วยคำค้นอื่น หรือลองเปลี่ยนตัวกรอง
          </p>
        </div>
      )}
    </div>
  );
}
