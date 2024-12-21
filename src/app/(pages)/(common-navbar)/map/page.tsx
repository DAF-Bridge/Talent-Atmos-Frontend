"use client";

import React, { useCallback, useState } from "react";
import MapComponent from "./Map";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { provinces } from "./SelectInputObj";
import OrgMapCard from "./OrgMapCard";
import { Organization } from "@/lib/types";

const organizations = [
  {
    id: 1,
    name: "1 builds มหาวิทยาลัยเชียงใหม่",
    description:
      "Startup & Entrepreneurial Program โปรแกรมการสร้างสตาร์ทอัพและผู้ประกอบการโปรแกรมการสร้างสตาร์ทอัพและผู้ประกอบการ",
    latitude: 18.80207753602652,
    longitude: 98.96766808636778,
  },
  {
    id: 2,
    name: "2 builds มหาวิทยาลัยเชียงใหม่",
    description:
      "Startup & Entrepreneurial Program โปรแกรมการสร้างสตาร์ทอัพและผู้ประกอ",
    latitude: 18.79566353965672,
    longitude: 98.95290358284387,
  },
  {
    id: 3,
    name: "3 builds มหาวิทยาลัยเชียงราย",
    description: "Incubation Program for aspiring entrepreneurs in Chiang Rai.",
    latitude: 19.90618,
    longitude: 99.82867,
  },
  {
    id: 4,
    name: "4 builds มหาวิทยาลัยขอนแก่น",
    description: "Technology Innovation Hub at Khon Kaen University.",
    latitude: 16.441934,
    longitude: 102.819957,
  },
  {
    id: 5,
    name: "5 builds มหาวิทยาลัยมหิดล",
    description: "HealthTech Accelerator at Mahidol University.",
    latitude: 13.794495,
    longitude: 100.323039,
  },
  {
    id: 6,
    name: "6 builds มหาวิทยาลัยสงขลานครินทร์",
    description: "Smart Agriculture Program in Southern Thailand.",
    latitude: 7.008778,
    longitude: 100.497505,
  },
  {
    id: 7,
    name: "7 builds มหาวิทยาลัยธรรมศาสตร์",
    description: "Leadership and Entrepreneurship Training Program.",
    latitude: 14.073558,
    longitude: 100.604582,
  },
  {
    id: 8,
    name: "8 builds มหาวิทยาลัยศรีนครินทรวิโรฒ",
    description: "Creative Design and Innovation Center in Bangkok.",
    latitude: 13.759442,
    longitude: 100.566031,
  },
  {
    id: 9,
    name: "9 builds มหาวิทยาลัยบูรพา",
    description: "Marine and Coastal Innovation Lab at Burapha University.",
    latitude: 13.287964,
    longitude: 100.925533,
  },
  {
    id: 10,
    name: "10 builds มหาวิทยาลัยเกษตรศาสตร์",
    description: "AgriTech and Sustainability Program in Kasetsart University.",
    latitude: 13.84786,
    longitude: 100.569374,
  },
  {
    id: 11,
    name: "11 builds มหาวิทยาลัยรังสิต",
    description: "Entrepreneurship Workshop and Incubation Program.",
    latitude: 13.96029,
    longitude: 100.601601,
  },
  {
    id: 12,
    name: "12 builds มหาวิทยาลัยเชียงใหม่",
    description: "Data Science and AI Training Programs.",
    latitude: 18.799696,
    longitude: 98.951042,
  },
  {
    id: 13,
    name: "13 builds มหาวิทยาลัยสุโขทัยธรรมาธิราช",
    description: "Online Education for Innovators and Entrepreneurs.",
    latitude: 13.88711,
    longitude: 100.59854,
  },
  {
    id: 14,
    name: "14 builds มหาวิทยาลัยแม่ฟ้าหลวง",
    description: "BioTech and Herbal Product Innovation in Chiang Rai.",
    latitude: 20.025834,
    longitude: 99.892278,
  },
  {
    id: 15,
    name: "15 builds มหาวิทยาลัยศิลปากร",
    description: "Art and Design Startup Incubation Center.",
    latitude: 13.820649,
    longitude: 100.041408,
  },
  {
    id: 16,
    name: "16 builds มหาวิทยาลัยเทคโนโลยีสุรนารี",
    description: "Smart Cities and IoT Innovation Lab.",
    latitude: 14.881866,
    longitude: 102.020762,
  },
  {
    id: 17,
    name: "17 builds มหาวิทยาลัยวลัยลักษณ์",
    description: "Sustainable Energy and Environment Lab.",
    latitude: 8.646288,
    longitude: 99.89646,
  },
  {
    id: 18,
    name: "18 builds มหาวิทยาลัยพะเยา",
    description: "Community Development and Social Innovation Hub.",
    latitude: 19.019184,
    longitude: 99.891415,
  },
  {
    id: 19,
    name: "19 builds มหาวิทยาลัยนเรศวร",
    description: "Cultural Heritage and Innovation Lab.",
    latitude: 16.725757,
    longitude: 100.194878,
  },
  {
    id: 20,
    name: "20 builds มหาวิทยาลัยปทุมธานี",
    description: "Tech Innovation and Startup Program.",
    latitude: 14.036743,
    longitude: 100.745507,
  },
  {
    id: 21,
    name: "21 builds มหาวิทยาลัยราชภัฏเชียงใหม่",
    description: "Local Entrepreneurship and Community Development Programs.",
    latitude: 18.77825,
    longitude: 98.9873,
  },
  {
    id: 22,
    name: "22 builds มหาวิทยาลัยราชภัฏภูเก็ต",
    description: "Tourism Innovation and Sustainable Development Lab.",
    latitude: 7.88829,
    longitude: 98.39036,
  },
  {
    id: 23,
    name: "23 builds มหาวิทยาลัยราชภัฏสวนสุนันทา",
    description: "Cultural and Creative Arts Program in Bangkok.",
    latitude: 13.774119,
    longitude: 100.507314,
  },
  {
    id: 24,
    name: "24 builds มหาวิทยาลัยราชภัฏนครราชสีมา",
    description: "Urban Agriculture and Smart Farming Initiatives.",
    latitude: 14.9798,
    longitude: 102.1004,
  },
  {
    id: 25,
    name: "25 builds มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา",
    description: "Social Entrepreneurship and Urban Development Program.",
    latitude: 13.7349,
    longitude: 100.4902,
  },
  {
    id: 26,
    name: "26 builds มหาวิทยาลัยราชภัฏเพชรบุรี",
    description: "Food Science and Hospitality Training Programs.",
    latitude: 12.9254,
    longitude: 99.8787,
  },
  {
    id: 27,
    name: "27 builds มหาวิทยาลัยราชภัฏกำแพงเพชร",
    description: "Herbal Innovation and Community Health Program.",
    latitude: 16.47286,
    longitude: 99.5196,
  },
  {
    id: 28,
    name: "28 builds มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
    description: "Engineering and Robotics Innovation Lab in Bangkok.",
    latitude: 13.65157,
    longitude: 100.4946,
  },
  {
    id: 29,
    name: "29 builds มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ",
    description: "Advanced Manufacturing and IoT Research Center.",
    latitude: 13.8197,
    longitude: 100.5123,
  },
  {
    id: 30,
    name: "30 builds มหาวิทยาลัยเทคโนโลยีสุวรรณภูมิ",
    description: "Renewable Energy and Smart Grid Training Programs.",
    latitude: 14.3633,
    longitude: 100.5888,
  },
  {
    id: 31,
    name: "31 builds มหาวิทยาลัยมหาสารคาม",
    description: "Agroecology and Environmental Sustainability Program.",
    latitude: 16.24568,
    longitude: 103.25146,
  },
  {
    id: 32,
    name: "32 builds มหาวิทยาลัยนครพนม",
    description: "Mekong River Development and Cross-Border Trade Innovation.",
    latitude: 17.40233,
    longitude: 104.78564,
  },
  {
    id: 33,
    name: "33 builds มหาวิทยาลัยพะเยา",
    description: "Health and Wellness Product Development Hub.",
    latitude: 19.0305,
    longitude: 99.8926,
  },
  {
    id: 34,
    name: "34 builds มหาวิทยาลัยแม่โจ้",
    description: "Sustainable Agriculture and Food Security Initiatives.",
    latitude: 18.9359,
    longitude: 99.0116,
  },
  {
    id: 35,
    name: "35 builds มหาวิทยาลัยนอร์ทเชียงใหม่",
    description: "Digital Transformation and Business Innovation Hub.",
    latitude: 18.7046,
    longitude: 98.9619,
  },
  {
    id: 36,
    name: "36 builds มหาวิทยาลัยกรุงเทพ",
    description: "Creative Media and Entrepreneurship Center in Bangkok.",
    latitude: 13.7318,
    longitude: 100.5687,
  },
  {
    id: 37,
    name: "37 builds มหาวิทยาลัยเอเชียอาคเนย์",
    description: "International Business and Technology Incubator.",
    latitude: 13.7271,
    longitude: 100.6225,
  },
  {
    id: 38,
    name: "38 builds มหาวิทยาลัยราชภัฏสงขลา",
    description: "Tourism and Marine Sustainability Program.",
    latitude: 7.1894,
    longitude: 100.5967,
  },
  {
    id: 39,
    name: "39 builds มหาวิทยาลัยราชภัฏลำปาง",
    description: "Social Innovation and Regional Development Hub.",
    latitude: 18.2927,
    longitude: 99.4929,
  },
  {
    id: 40,
    name: "40 builds มหาวิทยาลัยราชภัฏอุบลราชธานี",
    description: "Cultural Heritage and Economic Empowerment Program.",
    latitude: 15.2487,
    longitude: 104.8509,
  },
];

export default function MapPage() {
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [flyToTrigger, setFlyToTrigger] = useState(0); // Add a trigger value to force map to fly even when selecting the same org

  const handleCardClick = useCallback((org: Organization) => {
    setSelectedOrg(org);
    setFlyToTrigger((prev) => prev + 1);
  },[]);

  return (
    <div className="relative mx-auto overflow-hidden">
      <div
        className="absolute z-50 backdrop-blur-[2px] flex justify-center gap-3 
      items-center w-full mt-[65px] h-[76px]"
      >
        <Input
          className="rounded-full w-[20%] h-[48px] pl-5 hover:shadow-md"
          type="text"
          id="name-search"
          placeholder="ค้นหาจากชื่อ"
        />

        <Select>
          <SelectTrigger className="w-[250px] h-[48px] rounded-full pl-5 text-base font-normal hover:shadow-md">
            <SelectValue
              className="font-light placeholder:font-light [&:not(:placeholder-shown)]:font-normal"
              placeholder="สถานที่"
            />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(provinces).map(([region, provinceList]) => (
              <SelectGroup key={region}>
                <SelectLabel className="bg-gray-50 text-center text-sm">
                  {region}
                </SelectLabel>

                {provinceList.map((province) => (
                  <SelectItem
                    className="text-sm"
                    key={province}
                    value={province}
                  >
                    {province}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div
        className="absolute z-50 mt-[150px] ml-[40px] h-[70vh] w-[412px] border rounded-[20px] 
      bg-white shadow-lg py-[20px] px-[15px]"
      >
        <p className="text-xl font-medium">{`รายการทั้งหมด (${organizations.length})`}</p>
        <div className="flex flex-col gap-1 h-[95%] overflow-y-auto min-h-0">
          {organizations.map((org) => (
            <OrgMapCard
              key={org.id}
              organization={org}
              isSelected={selectedOrg?.id === org.id}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      <MapComponent
        organizations={organizations}
        flyToTrigger={flyToTrigger}
        selectedOrg={selectedOrg}
        setSelectedOrg={handleCardClick}
      />
    </div>
  );
}
