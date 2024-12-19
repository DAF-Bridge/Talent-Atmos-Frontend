import React from "react";
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

const organizations = [
  {
    id: "1",
    name: "Org A",
    latitude: 18.80207753602652,
    longitude: 98.96766808636778,
  },
  {
    id: "2",
    name: "Org B",
    latitude: 18.79566353965672,
    longitude: 98.95290358284387,
  },
];

export default function MapPage() {
  return (
    <div className="relative mx-auto overflow-hidden">
      <div className="absolute z-50 backdrop-blur-[2px] flex justify-center gap-3 items-center w-full mt-[65px] h-[76px]">
        <Input
          className="rounded-full w-[20%] h-[48px] pl-5 placeholder:font-light hover:shadow-md"
          type="text"
          id="name-search"
          placeholder="ค้นหาจากชื่อ"
        />

        <Select>
          <SelectTrigger className="w-[280px] h-[48px] rounded-full pl-5 text-base font-light text-muted-foreground hover:shadow-md">
            <SelectValue
              className="text-base font-light"
              placeholder="สถานที่"
            />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(provinces).map(([region, provinceList]) => (
              <SelectGroup key={region}>
                <SelectLabel className="bg-gray-50 text-center text-base">
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
      <div className="absolute z-50 mt-[160px] ml-[70px] h-[70vh] w-[412px] rounded-[20px] bg-white shadow-lg p-[21px]">
        <p className="text-xl font-medium">{"รายการทั้งหมด (72)"}</p>
      </div>
      <MapComponent organizations={organizations} />
    </div>
  );
}
