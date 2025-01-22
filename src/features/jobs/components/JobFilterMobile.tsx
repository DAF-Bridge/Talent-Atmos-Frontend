"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FilterBtn from "@/components/common/FilterBtn";
import {  useState } from "react";
import JobFilters from "./JobFilters";
import { useJobFilters } from "../hook/useJobFilter";

export default function JobFilterMobile() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { getActiveFiltersCount } = useJobFilters();

  return (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetTrigger asChild>
        <div className="flex justify-end">
          <FilterBtn
            getActiveFiltersCount={getActiveFiltersCount}
            canShorten={false}
          />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto pt-5 pb-20">
        <div className="mt-7">
          <JobFilters />
        </div>
      </SheetContent>
    </Sheet>
  );
}
