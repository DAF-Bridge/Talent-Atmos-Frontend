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
    name: "1 builds มหาวิทยาลัยเชียงใหม่",
    description:
      "Startup & Entrepreneurial Program โปรแกรมการสร้างสตาร์ทอัพและผู้ประกอบการโปรแกรมการสร้างสตาร์ทอัพและผู้ประกอบการ",
    latitude: 18.80207753602652,
    longitude: 98.96766808636778,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 2,
    name: "2 builds มหาวิทยาลัยเชียงใหม่",
    description:
      "Startup & Entrepreneurial Program โปรแกรมการสร้างสตาร์ทอัพและผู้ประกอ",
    latitude: 18.79566353965672,
    longitude: 98.95290358284387,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 3,
    name: "3 builds มหาวิทยาลัยเชียงราย",
    description: "Incubation Program for aspiring entrepreneurs in Chiang Rai.",
    latitude: 19.90618,
    longitude: 99.82867,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 4,
    name: "4 builds มหาวิทยาลัยขอนแก่น",
    description: "Technology Innovation Hub at Khon Kaen University.",
    latitude: 16.441934,
    longitude: 102.819957,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 5,
    name: "5 builds มหาวิทยาลัยมหิดล",
    description: "HealthTech Accelerator at Mahidol University.",
    latitude: 13.794495,
    longitude: 100.323039,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 6,
    name: "6 builds มหาวิทยาลัยสงขลานครินทร์",
    description: "Smart Agriculture Program in Southern Thailand.",
    latitude: 7.008778,
    longitude: 100.497505,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
];

const events: Event[] = [
  {
    id: 1,
    name: "Who Am I - ค้นหาตัวเองผ่านการทดลองทำงานจำลอง",
    startDate: "2024-11-16T00:00:00.000Z",
    endDate: "2024-11-20T00:00:00.000Z",
    startTime: "0001-01-01T09:00:00.000Z",
    endTime: "0001-01-01T16:30:00.000Z",
    location: "ลานชั้น 1 อาคารสวทช. โยธี",
    latitude: 19.0305,
    longitude: 99.8926,
    picUrl:
      "https://drive.google.com/uc?export=view&id=1ptEpKRbhtQJxJLdAfmMHOzMJgWfFOl9y",
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
    name: "WHO AM I - เปิดโอกาสให้น้องๆได้เข้าศึกษาการทำงานและทดลองทำงาน",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    latitude: 13.7318,
    longitude: 100.5687,
    picUrl:
      "https://drive.google.com/uc?export=view&id=14JD4WbrFIIbAfNt6lbxefsmUrmEFE8Di",
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
    name: "Who Am I - ค้นหาตัวเองผ่านการทดลองทำงานจำลอง",
    startDate: "2024-11-16T00:00:00.000Z",
    endDate: "2024-11-20T00:00:00.000Z",
    startTime: "0001-01-01T09:00:00.000Z",
    endTime: "0001-01-01T16:30:00.000Z",
    location: "ลานชั้น 1 อาคารสวทช. โยธี",
    latitude: 18.7046,
    longitude: 98.9619,
    picUrl:
      "https://drive.google.com/uc?export=view&id=1ptEpKRbhtQJxJLdAfmMHOzMJgWfFOl9y",
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
    id: 4,
    name: "WHO AM I - เปิดโอกาสให้น้องๆได้เข้าศึกษาการทำงานและทดลองทำงาน",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    latitude: 18.9359,
    longitude: 99.0116,
    picUrl:
      "https://drive.google.com/uc?export=view&id=14JD4WbrFIIbAfNt6lbxefsmUrmEFE8Di",
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
    id: 5,
    name: "Who Am I - ค้นหาตัวเองผ่านการทดลองทำงานจำลอง",
    startDate: "2024-11-16T00:00:00.000Z",
    endDate: "2024-11-20T00:00:00.000Z",
    startTime: "0001-01-01T09:00:00.000Z",
    endTime: "0001-01-01T16:30:00.000Z",
    location: "ลานชั้น 1 อาคารสวทช. โยธี",
    latitude: 18.7046,
    longitude: 98.9619,
    picUrl:
      "https://drive.google.com/uc?export=view&id=1ptEpKRbhtQJxJLdAfmMHOzMJgWfFOl9y",
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
    startDate: "2024-11-16T00:00:00.000Z",
    endDate: "2024-11-20T00:00:00.000Z",
    startTime: "0001-01-01T09:00:00.000Z",
    endTime: "0001-01-01T16:30:00.000Z",
    location: "ลานชั้น 1 อาคารสวทช. โยธี",
    latitude: 18.7046,
    longitude: 98.9619,
    picUrl:
      "https://drive.google.com/uc?export=view&id=1ptEpKRbhtQJxJLdAfmMHOzMJgWfFOl9y",
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
    id: 7,
    name: "Who Am I - ค้นหาตัวเองผ่านการทดลองทำงานจำลอง",
    startDate: "2024-11-16T00:00:00.000Z",
    endDate: "2024-11-20T00:00:00.000Z",
    startTime: "0001-01-01T09:00:00.000Z",
    endTime: "0001-01-01T16:30:00.000Z",
    location: "ลานชั้น 1 อาคารสวทช. โยธี",
    latitude: 18.7046,
    longitude: 98.9619,
    picUrl:
      "https://drive.google.com/uc?export=view&id=1ptEpKRbhtQJxJLdAfmMHOzMJgWfFOl9y",
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
    </TooltipProvider>
  );
}
