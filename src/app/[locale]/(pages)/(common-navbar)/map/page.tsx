"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Coordinate, Organization } from "@/lib/types";
import MapComponent from "@/features/map/components/Map";
import MapSidebarContent from "@/features/map/components/MapSidebarContent";
import MapMobileDrawer from "@/features/map/components/MapMobileDrawer";
// import MapMobileFilterSheet from "@/features/map/components/MapMobileFilterSheet";
import { cn } from "@/lib/utils";
import { ChevronLeft, Locate } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const organizations = [
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
  {
    id: 7,
    name: "7 builds มหาวิทยาลัยธรรมศาสตร์",
    description: "Leadership and Entrepreneurship Training Program.",
    latitude: 14.073558,
    longitude: 100.604582,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 8,
    name: "8 builds มหาวิทยาลัยศรีนครินทรวิโรฒ",
    description: "Creative Design and Innovation Center in Bangkok.",
    latitude: 13.759442,
    longitude: 100.566031,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 9,
    name: "9 builds มหาวิทยาลัยบูรพา",
    description: "Marine and Coastal Innovation Lab at Burapha University.",
    latitude: 13.287964,
    longitude: 100.925533,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 10,
    name: "10 builds มหาวิทยาลัยเกษตรศาสตร์",
    description: "AgriTech and Sustainability Program in Kasetsart University.",
    latitude: 13.84786,
    longitude: 100.569374,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 11,
    name: "11 builds มหาวิทยาลัยรังสิต",
    description: "Entrepreneurship Workshop and Incubation Program.",
    latitude: 13.96029,
    longitude: 100.601601,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 12,
    name: "12 builds มหาวิทยาลัยเชียงใหม่",
    description: "Data Science and AI Training Programs.",
    latitude: 18.799696,
    longitude: 98.951042,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 13,
    name: "13 builds มหาวิทยาลัยสุโขทัยธรรมาธิราช",
    description: "Online Education for Innovators and Entrepreneurs.",
    latitude: 13.88711,
    longitude: 100.59854,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 14,
    name: "14 builds มหาวิทยาลัยแม่ฟ้าหลวง",
    description: "BioTech and Herbal Product Innovation in Chiang Rai.",
    latitude: 20.025834,
    longitude: 99.892278,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 15,
    name: "15 builds มหาวิทยาลัยศิลปากร",
    description: "Art and Design Startup Incubation Center.",
    latitude: 13.820649,
    longitude: 100.041408,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 16,
    name: "16 builds มหาวิทยาลัยเทคโนโลยีสุรนารี",
    description: "Smart Cities and IoT Innovation Lab.",
    latitude: 14.881866,
    longitude: 102.020762,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 17,
    name: "17 builds มหาวิทยาลัยวลัยลักษณ์",
    description: "Sustainable Energy and Environment Lab.",
    latitude: 8.646288,
    longitude: 99.89646,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 18,
    name: "18 builds มหาวิทยาลัยพะเยา",
    description: "Community Development and Social Innovation Hub.",
    latitude: 19.019184,
    longitude: 99.891415,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 19,
    name: "19 builds มหาวิทยาลัยนเรศวร",
    description: "Cultural Heritage and Innovation Lab.",
    latitude: 16.725757,
    longitude: 100.194878,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 20,
    name: "20 builds มหาวิทยาลัยปทุมธานี",
    description: "Tech Innovation and Startup Program.",
    latitude: 14.036743,
    longitude: 100.745507,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 21,
    name: "21 builds มหาวิทยาลัยราชภัฏเชียงใหม่",
    description: "Local Entrepreneurship and Community Development Programs.",
    latitude: 18.77825,
    longitude: 98.9873,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 22,
    name: "22 builds มหาวิทยาลัยราชภัฏภูเก็ต",
    description: "Tourism Innovation and Sustainable Development Lab.",
    latitude: 7.88829,
    longitude: 98.39036,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 23,
    name: "23 builds มหาวิทยาลัยราชภัฏสวนสุนันทา",
    description: "Cultural and Creative Arts Program in Bangkok.",
    latitude: 13.774119,
    longitude: 100.507314,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 24,
    name: "24 builds มหาวิทยาลัยราชภัฏนครราชสีมา",
    description: "Urban Agriculture and Smart Farming Initiatives.",
    latitude: 14.9798,
    longitude: 102.1004,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 25,
    name: "25 builds มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา",
    description: "Social Entrepreneurship and Urban Development Program.",
    latitude: 13.7349,
    longitude: 100.4902,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 26,
    name: "26 builds มหาวิทยาลัยราชภัฏเพชรบุรี",
    description: "Food Science and Hospitality Training Programs.",
    latitude: 12.9254,
    longitude: 99.8787,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 27,
    name: "27 builds มหาวิทยาลัยราชภัฏกำแพงเพชร",
    description: "Herbal Innovation and Community Health Program.",
    latitude: 16.47286,
    longitude: 99.5196,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 28,
    name: "28 builds มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
    description: "Engineering and Robotics Innovation Lab in Bangkok.",
    latitude: 13.65157,
    longitude: 100.4946,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 29,
    name: "29 builds มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ",
    description: "Advanced Manufacturing and IoT Research Center.",
    latitude: 13.8197,
    longitude: 100.5123,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 30,
    name: "30 builds มหาวิทยาลัยเทคโนโลยีสุวรรณภูมิ",
    description: "Renewable Energy and Smart Grid Training Programs.",
    latitude: 14.3633,
    longitude: 100.5888,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 31,
    name: "31 builds มหาวิทยาลัยมหาสารคาม",
    description: "Agroecology and Environmental Sustainability Program.",
    latitude: 16.24568,
    longitude: 103.25146,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 32,
    name: "32 builds มหาวิทยาลัยนครพนม",
    description: "Mekong River Development and Cross-Border Trade Innovation.",
    latitude: 17.40233,
    longitude: 104.78564,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 33,
    name: "33 builds มหาวิทยาลัยพะเยา",
    description: "Health and Wellness Product Development Hub.",
    latitude: 19.0305,
    longitude: 99.8926,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 34,
    name: "34 builds มหาวิทยาลัยแม่โจ้",
    description: "Sustainable Agriculture and Food Security Initiatives.",
    latitude: 18.9359,
    longitude: 99.0116,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 35,
    name: "35 builds มหาวิทยาลัยนอร์ทเชียงใหม่",
    description: "Digital Transformation and Business Innovation Hub.",
    latitude: 18.7046,
    longitude: 98.9619,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 36,
    name: "36 builds มหาวิทยาลัยกรุงเทพ",
    description: "Creative Media and Entrepreneurship Center in Bangkok.",
    latitude: 13.7318,
    longitude: 100.5687,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 37,
    name: "37 builds มหาวิทยาลัยเอเชียอาคเนย์",
    description: "International Business and Technology Incubator.",
    latitude: 13.7271,
    longitude: 100.6225,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 38,
    name: "38 builds มหาวิทยาลัยราชภัฏสงขลา",
    description: "Tourism and Marine Sustainability Program.",
    latitude: 7.1894,
    longitude: 100.5967,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 39,
    name: "39 builds มหาวิทยาลัยราชภัฏลำปาง",
    description: "Social Innovation and Regional Development Hub.",
    latitude: 18.2927,
    longitude: 99.4929,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
  {
    id: 40,
    name: "40 builds มหาวิทยาลัยราชภัฏอุบลราชธานี",
    description: "Cultural Heritage and Economic Empowerment Program.",
    latitude: 15.2487,
    longitude: 104.8509,
    industry: ["IT", "AgriTech", "Health", "Energy"],
    pic_url:
      "https://drive.google.com/uc?export=view&id=1HtTWidBNH7dPhGhRCnWAkkmZ3WQQtKIw",
  },
];

// const organizations: Organization[] = [];

export default function MapPage({
  // params,
  searchParams,
}: Readonly<{
  params: { page: string; locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  const search = searchParams.search?.toString() ?? "";
  // const currentTab = searchParams.tab?.toString() ?? "";
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [flyToTrigger, setFlyToTrigger] = useState(0); // Add a trigger value to force map to fly even when selecting the same org
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userLocation, setUserLocation] = useState<Coordinate>();
  const [flyToUserTrigger, setFlyToUserTrigger] = useState(0);

  const handleCardClick = useCallback((org: Organization) => {
    setSelectedOrg(org);
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
            organizations={organizations}
            selectedOrg={selectedOrg}
            handleCardClick={handleCardClick}
            defaultValue={search}
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
            organizations={organizations}
            selectedOrg={selectedOrg}
            handleCardClick={handleCardClick}
          />
          {/* <MapMobileFilterSheet /> */}
        </div>

        <MapComponent
          organizations={organizations}
          flyToTrigger={flyToTrigger}
          selectedOrg={selectedOrg}
          handleCardClick={handleCardClick}
          userLocation={userLocation}
          flyToUserTrigger={flyToUserTrigger}
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
