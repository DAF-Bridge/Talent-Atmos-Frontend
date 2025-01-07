"use client";

import { SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
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

    router.push(`/events/page/1?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setSelectedType("");
    setSelectedDateRange("");
    setSelectedLocation("");

    const params = new URLSearchParams(searchParams);
    params.delete("type");
    params.delete("dateRange");
    params.delete("location");

    router.push(`/events/page/1?${params.toString()}`);
  };

  const getActiveFiltersCount = () => {
    return [selectedType, selectedDateRange, selectedLocation].filter(Boolean)
      .length;
  };

  return (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetTrigger asChild>
        <button className="flex justify-center items-center gap-1 border bg-white hover:drop-shadow-md border-gray-stroke rounded-[10px] h-[48px] px-3 text-gray-btngray relative">
          <SlidersHorizontal className="h-[18px] w-[18px]" />
          <span className="hidden sm:block text-sm font-medium">ตัวกรอง</span>
          {getActiveFiltersCount() > 0 && (
            <Badge color="#ff7d29" label={getActiveFiltersCount().toString()} />
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="font-prompt">
        <SheetHeader>
          <SheetTitle className="font-prompt">ตัวกรอง</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-8">
          {/* Event Type Filter */}
          <div className="space-y-4">
            <Label>ประเภทกิจกรรม</Label>
            <RadioGroup
              value={selectedType}
              onValueChange={setSelectedType}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business">บ่มเพาะธุรกิจ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="networking" id="networking" />
                <Label htmlFor="networking">สร้างเครือข่าย</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="seminar" id="seminar" />
                <Label htmlFor="seminar">สัมมนา</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="workshop" id="workshop" />
                <Label htmlFor="workshop">เวิร์คชอป</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-4">
            <Label>ช่วงเวลา</Label>
            <Select
              value={selectedDateRange}
              onValueChange={setSelectedDateRange}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกช่วงเวลา" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">วันนี้</SelectItem>
                <SelectItem value="tomorrow">พรุ่งนี้</SelectItem>
                <SelectItem value="thisWeek">สัปดาห์นี้</SelectItem>
                <SelectItem value="thisMonth">เดือนนี้</SelectItem>
                <SelectItem value="nextMonth">เดือนหน้า</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          <div className="space-y-4">
            <Label>สถานที่</Label>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานที่" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">ออนไลน์</SelectItem>
                <SelectItem value="bangkok">กรุงเทพมหานคร</SelectItem>
                <SelectItem value="chiangmai">เชียงใหม่</SelectItem>
                <SelectItem value="phuket">ภูเก็ต</SelectItem>
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
