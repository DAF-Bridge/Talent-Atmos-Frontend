"use client";

import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Badge from "@/components/cards/Badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export function EventFilter() {
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(
    searchParams.get("type") ?? ""
  );
  const [selectedDateRange, setSelectedDateRange] = useState(
    searchParams.get("dateRange") ?? ""
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get("location") ?? ""
  );
  const [selectedAudience, setSelectedAudience] = useState(
    searchParams.get("audience") ?? ""
  );
  const [selectedPrice, setSelectedPrice] = useState(
    searchParams.get("price") ?? ""
  );

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    if (selectedType) {
      params.set("type", selectedType);
    } else {
      params.delete("type");
    }

    if (selectedDateRange) {
      params.set("dateRange", selectedDateRange);
    } else {
      params.delete("dateRange");
    }

    if (selectedLocation) {
      params.set("location", selectedLocation);
    } else {
      params.delete("location");
    }

    if (selectedAudience) {
      params.set("audience", selectedAudience);
    } else {
      params.delete("audience");
    }

    if (selectedPrice) {
      params.set("price", selectedPrice);
    } else {
      params.delete("price");
    }

    window.location.href = `/events/page/1?${params.toString()}`;
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setSelectedType("");
    setSelectedDateRange("");
    setSelectedLocation("");
    setSelectedAudience("");
    setSelectedPrice("");

    const params = new URLSearchParams(searchParams);
    params.delete("type");
    params.delete("dateRange");
    params.delete("location");
    params.delete("audience");
    params.delete("price");

    window.location.href = `/events/page/1?${params.toString()}`;
  };

  const getActiveFiltersCount = () => {
    return [
      selectedType,
      selectedDateRange,
      selectedLocation,
      selectedAudience,
      selectedPrice,
    ].filter(Boolean).length;
  };

  return (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetTrigger asChild>
        <button
          className="flex justify-center items-center gap-1 border bg-white 
        hover:drop-shadow-md border-gray-stroke rounded-[10px] h-[40px] sm:h-[48px] px-3 sm:px-4 
        text-gray-btngray relative"
        >
          <SlidersHorizontal className="h-[18px] w-[18px]" />
          <span className="hidden sm:block text-sm font-medium">ตัวกรอง</span>
          {getActiveFiltersCount() > 0 && (
            <Badge
              className="bg-orange-normal"
              label={getActiveFiltersCount().toString()}
            />
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="font-prompt">
        <SheetHeader>
          <SheetTitle className="font-prompt">ตัวกรอง</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-5">
          {/* Date Range Filter */}
          <div className="space-y-3">
            <Label>ช่วงเวลา</Label>
            <Select
              value={selectedDateRange}
              onValueChange={setSelectedDateRange}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกช่วงเวลา" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="hover:bg-slate-100" value="today">
                  วันนี้
                </SelectItem>
                <SelectItem className="hover:bg-slate-100" value="tomorrow">
                  พรุ่งนี้
                </SelectItem>
                <SelectItem className="hover:bg-slate-100" value="thisWeek">
                  สัปดาห์นี้
                </SelectItem>
                <SelectItem className="hover:bg-slate-100" value="thisMonth">
                  เดือนนี้
                </SelectItem>
                <SelectItem className="hover:bg-slate-100" value="nextMonth">
                  เดือนหน้า
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          <div className="space-y-3">
            <Label>สถานที่</Label>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานที่" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="hover:bg-slate-100" value="online">
                  ออนไลน์
                </SelectItem>
                <SelectItem className="hover:bg-slate-100" value="onsite">
                  ออนไซต์
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Audience Filter */}
          <div className="space-y-3">
            <Label>ประเภทผู้ชม</Label>
            <RadioGroup
              value={selectedAudience}
              onValueChange={setSelectedAudience}
              className="grid grid-cols-2 gap-y-[15px]"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="general" id="r1" />
                <Label
                  htmlFor="r1"
                  className="font-normal hover:cursor-pointer"
                >
                  ทั่วไป
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="students" id="r2" />
                <Label
                  htmlFor="r2"
                  className="font-normal hover:cursor-pointer"
                >
                  นักเรียน/นักศึกษา
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="professionals" id="r3" />
                <Label
                  htmlFor="r3"
                  className="font-normal hover:cursor-pointer"
                >
                  มืออาชีพ
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Price Filter */}
          <div className="space-y-3">
            <Label>ราคา</Label>
            <Select value={selectedPrice} onValueChange={setSelectedPrice}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกราคา" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="hover:bg-slate-100" value="free">
                  ฟรี
                </SelectItem>
                <SelectItem className="hover:bg-slate-100" value="paid">
                  มีค่าใช้จ่าย
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={clearFilters} className="flex-1">
              ล้างตัวกรอง
            </Button>
            <Button
              onClick={applyFilters}
              className="flex-1 bg-orange-dark hover:bg-orange-normal"
            >
              ใช้ตัวกรอง
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
