"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Coordinate, Organization, Event } from "@/lib/types";
import MapComponent from "@/features/map/components/Map";
import MapSidebarContent from "@/features/map/components/MapSidebarContent";
import MapMobileDrawer from "@/features/map/components/MapMobileDrawer";
import { cn } from "@/lib/utils";
import { ChevronLeft, Locate } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const organizations: Organization[] = [
  {
    id: 1,
    name: "WHO AM I",
    headline:
      "โครงการศึกษาดูงานสาขาวิชาชีพที่เป็นที่นิยมภายใต้แนวคิด ค้นพบตัวตนผ่านการจำลองสายอาชีพ",
    latitude: 13.763780542604183,
    longitude: 100.52863581347013,
    industries: ["Social", "เทคโนโลยี", "สตาร์ทอัพ"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=19SrmpaRgGQOI5PZXY7SG0AFC8S6GGldi",
  },
  {
    id: 2,
    name: "Innovator's Academy",
    headline:
      "สถาบันเตรียมเข้ามหาวิทยาลัยเฉพาะทางด้านธุรกิจ Innovator’s Preparation Academy for Business Degrees and Careers",
    latitude: 13.746009792682637,
    longitude: 100.5324055231956,
    industries: ["Social"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1AOtDOpQuJt4OUxsLXO7GlsUlHxyMABuy",
  },
];

const events: Event[] = [
  {
    id: 5,
    name: "เปิดรับสมัคร Rabbit Start Core Team 2025 🐰💬",
    startDate: "2025-01-28T00:00:00.000Z",
    endDate: "2025-02-23T00:00:00.000Z",
    startTime: "",
    endTime: "",
    location: "Discord Online Meeting",
    latitude: null,
    longitude: null,
    picUrl:
      "https://drive.google.com/uc?export=view&id=17F1Dym0aujDkLKdz4E1hJ0CiBAnZYuSH",
    category: "All",
    price: "Free",
    organization: {
      id: 1,
      name: "Who Am I",
      picUrl:
        "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
    },
  },
  {
    id: 2,
    name: "GYBN Thailand เปิดรับสมัครทีมงานหน้าใหม่ 2025",
    startDate: "2025-02-14T00:00:00.000Z",
    endDate: "2025-02-20T00:00:00.000Z",
    startTime: "",
    endTime: "",
    location: "Love Wildlife Foundation",
    picUrl:
      "https://drive.google.com/uc?export=view&id=1WqALjgS9DOVbs_ya13QgoXAeTNrxZLGh",
    category: "All",
    latitude: 13.757568725943385,
    longitude: 100.50936290762168,
    price: "Free",
    organization: {
      id: 1,
      name: "Who Am I",
      picUrl:
        "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
    },
  },
  {
    id: 4,
    name: "Rabbit Start Saturday Club 🐰💬",
    startDate: "2025-02-15T00:00:00.000Z",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "Discord Online Meeting",
    latitude: null,
    longitude: null,
    picUrl:
      "https://drive.google.com/uc?export=view&id=1M6B_t2A0VT79y96kuD-L5j1DRyFyk7-y",
    category: "All",
    price: "Free",
    organization: {
      id: 1,
      name: "Who Am I",
      picUrl:
        "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
    },
  },
  {
    id: 3,
    name: "Policy Café ครั้งที่ 4 กับหัวข้อ “Climate Communication: หยิบแก้วชา มาคุยเรื่องการขับเคลื่อนสิ่งแวดล้อม”",
    startDate: "2025-02-23T00:00:00.000Z",
    endDate: "",
    startTime: "0001-01-01T09:00:00.000Z",
    endTime: "0001-01-01T16:30:00.000Z",
    location: "เจดีย์คาเฟ่แอนด์บาร์",
    latitude: 13.755113111741556,
    longitude: 100.50667321540301,
    picUrl:
      "https://drive.google.com/uc?export=view&id=1uOu3VemcS8qgiuy-zvynUIjq1HfQp_1v",
    category: "All",
    price: "Free",
    organization: {
      id: 1,
      name: "Who Am I",
      picUrl:
        "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
    },
  },
  {
    id: 6,
    name: "Who Am I - ค้นหาตัวเองผ่านการทดลองทำงานจำลอง",
    startDate: "2025-03-01T00:00:00.000Z",
    endDate: "2025-03-02T00:00:00.000Z",
    startTime: "0001-01-01T09:00:00.000Z",
    endTime: "0001-01-01T16:30:00.000Z",
    location: "อาคาร JW tower ชั้น 3 ศรีนครินทร์ เขตสวนหลวง กรุงเทพฯ",
    latitude: 13.745365885505796,
    longitude: 100.64404603656816,
    picUrl:
      "https://drive.google.com/uc?export=view&id=17vBfOqClPDSD_nD9rLhXA8_LjNXTxQQ1",
    category: "All",
    price: "Free",
    organization: {
      id: 1,
      name: "Who Am I",
      picUrl:
        "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
    },
  },
  {
    id: 1,
    name: "WHO AM I สายไหนที่ใช่สำหรับเรา? มาค้นหากันเถอะ",
    startDate: "2024-11-16T00:00:00.000Z",
    endDate: "",
    startTime: "0001-01-01T09:00:00.000Z",
    endTime: "0001-01-01T16:30:00.000Z",
    location: "สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ",
    latitude: 13.765648,
    longitude: 100.524063,
    picUrl:
      "https://drive.google.com/uc?export=view&id=1UNJTDVhdym8-NWID244-TCgJIxxPcB0H",
    category: "All",
    price: "Free",
    organization: {
      id: 1,
      name: "Who Am I",
      picUrl:
        "https://drive.google.com/uc?export=view&id=1KDX58e7WJ-JqXFV8_a2_2Z1Jalil4M-H",
    },
  },
];

// const organizations: Organization[] = [];
// const events: Event[] = [];

export default function MapPage({
  // params,
  searchParams,
}: Readonly<{
  params: { page: string; locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  const currentTab = searchParams.tab?.toString() ?? "org";
  const search = searchParams.search?.toString() ?? "";
  const [selectedItem, setSelectedItem] = useState<Organization | Event | null>(
    null
  );
  const [flyToTrigger, setFlyToTrigger] = useState(0); // Add a trigger value to force map to fly even when selecting the same org
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userLocation, setUserLocation] = useState<Coordinate>();
  const [flyToUserTrigger, setFlyToUserTrigger] = useState(0);

  const data: Organization[] | Event[] =
    currentTab === "org" ? organizations : events;

  const handleCardClick = useCallback((item: Organization | Event) => {
    setSelectedItem(item);
    setIsDrawerOpen(false); // Close the drawer
    setFlyToTrigger((prev) => prev + 1);
  }, []);

  const handleFocusUser = () => {
    if (userLocation) {
      setFlyToUserTrigger((prev) => prev + 1);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Handle successful location retrieval
          // console.log(latitude, longitude);
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          // Handle location error
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <TooltipProvider>
      <div className="relative mx-auto overflow-hidden">
        <div
          className={cn(
            "absolute z-10 pt-[90px] top-0 h-full w-[43%] lg:w-[50%] max-w-[420px] bg-white shadow-lg pb-[65px] pl-[15px] lg:pl-[30px] pr-[15px] hidden md:block transition-transform duration-300 ease-in-out",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <MapSidebarContent
            data={data}
            selectedItem={selectedItem}
            handleCardClick={handleCardClick}
            defaultValue={search}
            currentTab={currentTab}
          />
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="absolute top-[50%] -right-6 bg-white rounded-r-md py-3 drop-shadow-md z-10"
              >
                <ChevronLeft
                  className={cn(
                    "w-6 h-6",
                    isSidebarOpen ? "rotate-0" : "rotate-180"
                  )}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white" side="right">
              <p>{isSidebarOpen ? "ปิดเมนู" : "เปิดเมนู"}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* list of organizations (for mobile) */}
        <div
          className="fixed z-10 bottom-5 left-1/2 md:hidden transform -translate-x-1/2 flex 
           justify-center items-center gap-4"
        >
          <MapMobileDrawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            data={data}
            selectedItem={selectedItem}
            handleCardClick={handleCardClick}
            currentTab={currentTab}
          />
          {/* <MapMobileFilterSheet /> */}
        </div>

        <MapComponent
          data={data}
          flyToTrigger={flyToTrigger}
          selectedItem={selectedItem}
          handleCardClick={handleCardClick}
          userLocation={userLocation}
          flyToUserTrigger={flyToUserTrigger}
          currentTab={currentTab}
        />
        <div className="fixed z-10 bottom-3 right-1 flex justify-center items-center gap-4">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={handleFocusUser}
                className="absolute flex justify-center items-center bottom-12 md:bottom-8 right-2 md:right-4 rounded-full drop-shadow-lg shadow-md
              w-[40px] h-[40px] bg-orange-normal hover:bg-orange-dark transition-all duration-150"
              >
                <Locate className="w-[20px] h-[20px] text-white" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white" side="left">
              <p>ไปที่ตําแหน่งปัจจุบัน</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
