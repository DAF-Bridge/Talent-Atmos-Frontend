import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Organization } from "@/lib/types";
import OrgCardList from "./OrgCardList";
import MapSearchBar from "./MapSearchBar";

interface MapMobileDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  organizations: Organization[];
  selectedOrg: Organization | null;
  handleCardClick: (org: Organization) => void;
}

export default function MapMobileDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  organizations,
  selectedOrg,
  handleCardClick,
}: Readonly<MapMobileDrawerProps>) {
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger
          className="hover:drop-shadow-md hover:-translate-y-1
      bg-white text-black rounded-full py-2 px-4 shadow-md transition-all duration-150
      flex items-center justify-center"
        >
          <span className="text-sm font-medium">{`รายการทั้งหมด (${organizations.length})`}</span>
        </DrawerTrigger>
        <DrawerContent className="p-4 bg-white md:hidden">
          <DrawerHeader>
            <DrawerTitle>{`รายการทั้งหมด (${organizations.length})`}</DrawerTitle>
          </DrawerHeader>
          <div className="mb-4">
            <MapSearchBar defaultValue="" />
          </div>
          <div
            className="h-[50vh] overflow-y-auto"
            onTouchStart={handleTouchStart}
          >
            <OrgCardList
              organizations={organizations}
              selectedOrg={selectedOrg}
              handleCardClick={handleCardClick}
            />
          </div>
          <DrawerFooter className="mt-4">
            <DrawerClose>
              <Button variant="outline" className="w-full">
                ปิด
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
