"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RiResetRightFill } from "react-icons/ri";

export default function JobSideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full border-r border-gray-stroke pr-4 h-full">
      <div className="flex flex-row justify-between items-center">
        <p className="text-xl font-semibold">ตัวกรอง</p>
        <button className="border rounded-md p-2 group hover:bg-slate-100">
          <RiResetRightFill className="text-xl group-hover:rotate-90 duration-150 transition-all" />
        </button>
      </div>

      <div
        className="rounded-full bg-orange-normal/50 p-1 border-2 
      border-orange-dark shadow-lg hover:shadow-orange-300/50 transition-shadow"
      >
        <Select>
          <SelectTrigger
            className="w-full bg-white text-orange-950 
                 rounded-full px-4 transition-colors shadow-sm"
            id="job-esg"
          >
            <SelectValue placeholder="เลือกหมวดหมู่ ESG" />
          </SelectTrigger>
          <SelectContent className="bg-white border-orange-500 rounded-lg shadow-lg">
            {ESGJobCategory.map((x) => (
              <SelectItem
                key={x.value}
                value={x.value}
                className="text-orange-950 focus:bg-orange-500/10 hover:bg-orange-500/10 focus:text-orange-700 
                   cursor-pointer transition-colors"
              >
                {x.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-normal" htmlFor="keyword-search">
          ค้นหาจากคีย์เวิร์ด
        </Label>
        <div className="relative">
          <Input
            id="keyword-search"
            placeholder="ระบุคีย์เวิร์ด หรือชื่อบริษัท"
            className="pl-9 placeholder:font-light placeholder:text-sm"
          />
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-inactive" />
        </div>
      </div>

      <div>
        <Label className="text-base font-normal" htmlFor="location-search">
          สถานที่
        </Label>
        <Input
          id="location-search"
          placeholder="ระบุสถานที่"
          className="placeholder:font-light placeholder:text-sm"
        />
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox id="remote-toggle" />
          <Label
            htmlFor="remote-toggle"
            className="text-sm font-light text-gray-inactive"
          >
            {"ทำงานระยะไกล (Remote)"}
          </Label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-end items-center gap-1 text-sm font-light text-gray-inactive 
        hover:text-gray-700 transition-colors mt-1 w-fit py-1"
        >
          ตัวเลือกเพิ่มเติม
          <FaChevronDown
            className={`mt-[2px] transform transition-transform duration-150 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Extra menu */}
      <div
        className={`overflow-hidden transition-all duration-150 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="flex justify-start items-center">
              {"เงินเดือน (บาท)"}
            </p>
            <div className="flex gap-2">
              <div>
                <Label
                  className="text-sm font-light text-gray-inactive"
                  htmlFor="price-min"
                >
                  เริ่มต้น
                </Label>
                <Input id="price-min" type="number" />
              </div>
              <div>
                <Label
                  className="text-sm font-light text-gray-inactive"
                  htmlFor="price-max"
                >
                  ถึง
                </Label>
                <Input id="price-max" type="number" />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-base font-normal" htmlFor="job-type">
              ประเภทการจ้างงาน
            </Label>
            <Select>
              <SelectTrigger className="w-full" id="job-type">
                <SelectValue placeholder="เลือกประเภทการจ้างงาน" />
              </SelectTrigger>
              <SelectContent>
                {WorkTypeEnum.map((x) => (
                  <SelectItem key={x.value} value={x.value}>
                    {x.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-base font-normal" htmlFor="career-stage">
              ระดับขั้น
            </Label>
            <Select>
              <SelectTrigger className="w-full" id="career-stage">
                <SelectValue placeholder="เลือกระดับขั้น" />
              </SelectTrigger>
              <SelectContent>
                {CareerStageEnum.map((x) => (
                  <SelectItem key={x.value} value={x.value}>
                    {x.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="w-[50%] bg-orange-dark hover:bg-orange-normal text-base">ค้นหา</Button>
      </div>
    </div>
  );
}

const WorkTypeEnum = [
  {
    value: "fulltime",
    label: "Full-time",
  },
  {
    value: "parttime",
    label: "Part-time",
  },
  {
    value: "volunteer",
    label: "Volunteer",
  },
  {
    value: "internship",
    label: "Internship",
  },
];
const CareerStageEnum = [
  {
    value: "entrylevel",
    label: "Entry-level",
  },
  {
    value: "midlevel",
    label: "Mid-level",
  },
  {
    value: "senior",
    label: "Senior",
  },
];

const ESGJobCategory = [
  {
    value: "environment",
    label: "E : สิ่งแวดล้อม",
  },
  {
    value: "social",
    label: "S : สังคม",
  },
  {
    value: "governance",
    label: "G : ธรรมาภิบาล",
  },
  {
    value: "normal",
    label: "งานทั่วไป",
  },
];
